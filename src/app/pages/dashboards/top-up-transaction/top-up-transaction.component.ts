import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
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
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { Subject } from "rxjs";
import { FormControl } from "@angular/forms";
import { BUSINESS_DATA_KEY, TRANSACTION_TABLE_LABELS, USER_SESSION_KEY } from "src/app/Models/constants";
import { Router } from "@angular/router";
import { TransactionsService } from "src/app/services/transactions.service";
import { takeUntil } from "rxjs/operators";
import { BusinessService } from "src/app/services/business.service";
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
  selector: "vex-top-up-transaction",
  templateUrl: "./top-up-transaction.component.html",
  styleUrls: ["./top-up-transaction.component.scss"],
})
export class TopUpTransactionComponent implements OnInit {
  displayedColumns: string[] = [
    "id",
    "created_at",
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
  userBusinessData: any;
  credentials: string;
  constructor(
    private router: Router,
    private transactionsService: TransactionsService,
    private businessService: BusinessService
  ) {
    const sessionData = JSON.parse(localStorage.getItem(USER_SESSION_KEY));
    this.userData = sessionData;

    
    const businessData = localStorage.getItem(BUSINESS_DATA_KEY);
    this.userBusinessData = JSON.parse(businessData);
    
    if(!sessionData){
      router.navigate(['/auth/login']);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.credentials = `${this.userBusinessData.api_secret_key_live}:${this.userBusinessData.api_public_key_live}`;
    this.loadTransactions(this.userData.user_id);
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
    return this.statusLabels.find((label) => label.text === status);
  }

  loadTransactions(userId: string) {
    // userId = 'a9twRK1JpPPQDrB6hNvfAr2ju682' this is a test User_uid
    this.businessService
      .getUserTopUps(userId, this.credentials)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (transactions) => {
          this.transactionsData = transactions.map((details) => {
            details.state = this.getStatusLabel(details.status);
            return details;
          });

          this.hasNoTransactions = transactions.length === 0 ? true : false;
          this.dataSource = new MatTableDataSource(this.transactionsData);
        },
        (error) => console.log(error.message)
      );
  }
  
}
