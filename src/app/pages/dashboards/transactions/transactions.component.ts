import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import {
  TRANSACTION_TABLE_LABELS,
  USER_SESSION_KEY,
} from "src/app/Models/constants";
import { TransactionsService } from "src/app/services/transactions.service";
import icPhone from "@iconify/icons-ic/twotone-phone";
import icMail from "@iconify/icons-ic/twotone-mail";
import icMap from "@iconify/icons-ic/twotone-map";
import icEdit from "@iconify/icons-ic/twotone-edit";
import icDelete from "@iconify/icons-ic/twotone-delete";
import icSearch from "@iconify/icons-ic/twotone-search";
import icAdd from "@iconify/icons-ic/twotone-add";
import icFilterList from "@iconify/icons-ic/twotone-filter-list";
import icMoreHoriz from "@iconify/icons-ic/twotone-more-horiz";
import icFolder from "@iconify/icons-ic/twotone-folder";
import { PercentPipe } from "@angular/common";

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: "BG452515",
    name: "10 min ago",
    weight: "Togo",
    symbol: "MTN",
    walletNumber: 96060855,
    walFee: 5.0,
    amountReceived: 400,
    status: "Sent",
  },
  {
    position: "BG452515",
    name: "1 hours ago",
    weight: "Togo",
    symbol: "MTN",
    walletNumber: 96060855,
    walFee: 5.0,
    amountReceived: 400,
    status: "Sent",
  },
  {
    position: "BG452515",
    name: "1 days ago",
    weight: "Togo",
    symbol: "MTN",
    walletNumber: 96060855,
    walFee: 5.0,
    amountReceived: 400,
    status: "Sent",
  },
];
export interface PeriodicElement {
  name: string;
  position: string;
  weight: string;
  symbol: string;
  walletNumber: number;
  walFee: number;
  amountReceived: number;
  status: string;
}
@Component({
  selector: "vex-transactions",
  templateUrl: "./transactions.component.html",
  styleUrls: ["./transactions.component.scss"],
})
export class TransactionsComponent implements OnInit {
  displayedColumns: string[] = [
    // "id",
    "created_at",
    "country",
    "provider",
    "wallet",
    "fee",
    "currency",
    "amount",
    "status",
  ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  layoutCtrl = new FormControl("boxed");
  searchCtrl = new FormControl();

  icPhone = icPhone;
  icMail = icMail;
  icMap = icMap;
  icEdit = icEdit;
  icSearch = icSearch;
  icDelete = icDelete;
  icAdd = icAdd;
  icFilterList = icFilterList;
  icMoreHoriz = icMoreHoriz;
  icFolder = icFolder;

  statusLabels = TRANSACTION_TABLE_LABELS;
  userData: any;
  unsubscribe$ = new Subject();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  transactionsData: any;
  transactionType: any;
  hasNoTransactions: boolean;
  palFee = 0;
  constructor(
    private router: Router,
    private transactionsService: TransactionsService
  ) {
    const sessionData = JSON.parse(localStorage.getItem(USER_SESSION_KEY));
    this.userData = sessionData;
    if (!sessionData) {
      router.navigate(["/auth/login"]);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.loadTransactions(this.userData.user_id);
  }

  getPalFee(amount, country: string): number {
    switch(country){
      case 'GH':
        return (amount * 0.5 / 100);
      case 'BJ':
        return (amount * 1 /100);
      default :
        return 0;
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getStatusLabel(status: string) {
    console.log("status", status);
    return this.statusLabels.find((label) => label.text === status);
  }

  loadTransactions(userId: string) {
    // userId = 'a9twRK1JpPPQDrB6hNvfAr2ju682' this is a test User_uid
    this.transactionsService
      .getUserTransactions(userId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (transactions) => {
          this.transactionsData = transactions.data.map((details) => {
            details.state = this.getStatusLabel(details.state);
            details.palFee = this.getPalFee(details.amount, details.country);
            return details;
          });

          this.hasNoTransactions =
            transactions.data.length === 0 ? true : false;
          this.dataSource = new MatTableDataSource(this.transactionsData);
          console.log("[dataSource]", this.dataSource.data);
        },
        (error) => console.log(error.message)
      );
  }
}
