import { SelectionModel } from "@angular/cdk/collections";
import { DatePipe } from "@angular/common";
import { Component, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldDefaultOptions,
} from "@angular/material/form-field";
import { MatPaginator } from "@angular/material/paginator";
import { MatSelectChange } from "@angular/material/select";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { ReplaySubject, Observable, Subject, of } from "rxjs";
import { takeUntil, take } from "rxjs/operators";
import { fadeInUp400ms } from "src/@vex/animations/fade-in-up.animation";
import { stagger40ms } from "src/@vex/animations/stagger.animation";
import { TableColumn } from "src/@vex/interfaces/table-column.interface";
import {
  BUSINESS_DATA_KEY,
  COUNTRIES,
  SUMMARY_DATA_KEY,
  TRANSACTION_TABLE_LABELS,
  USER_SESSION_KEY,
} from "src/app/Models/constants";
import { Customer } from "src/app/pages/apps/aio-table/interfaces/customer.model";
import { AuthserviceService } from "src/app/services/authservice.service";
import { TransactionsService } from "src/app/services/transactions.service";
import { aioTableLabels, aioTableData } from "src/static-data/aio-table-data";
import { TableUtil } from "./tableUtil";

import icEdit from "@iconify/icons-ic/twotone-edit";
import icDelete from "@iconify/icons-ic/twotone-delete";
import icSearch from "@iconify/icons-ic/twotone-search";
import icAdd from "@iconify/icons-ic/twotone-add";
import icFilterList from "@iconify/icons-ic/twotone-filter-list";
import icPhone from "@iconify/icons-ic/twotone-phone";
import icMail from "@iconify/icons-ic/twotone-mail";
import icMap from "@iconify/icons-ic/twotone-map";
import icMoreHoriz from "@iconify/icons-ic/twotone-more-horiz";
import icFolder from "@iconify/icons-ic/twotone-folder";
import icDateRange from "@iconify/icons-ic/twotone-date-range";
import icPerson from "@iconify/icons-ic/twotone-person";
import icRefresh from "@iconify/icons-ic/twotone-refresh";
import icBook from "@iconify/icons-ic/twotone-book";
import icCloudDownload from "@iconify/icons-ic/twotone-cloud-download";
import icAttachMoney from "@iconify/icons-ic/twotone-attach-money";

import { SummaryData } from "src/app/Models/models.interface";
import moment from "moment";
import { MatTableExporterDirective } from "mat-table-exporter";

@Component({
  selector: "vex-transactions-report",
  templateUrl: "./transactions-report.component.html",
  styleUrls: ["./transactions-report.component.scss"],
  animations: [fadeInUp400ms, stagger40ms],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: "standard",
      } as MatFormFieldDefaultOptions,
    },
  ],
})
export class TransactionsReportComponent implements OnInit, OnDestroy {
  layoutCtrl = new FormControl("boxed");

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<Customer[]> = new ReplaySubject<Customer[]>(1);
  data$: Observable<Customer[]> = this.subject$.asObservable();
  unsubscribe$ = new Subject();
  @Input()
  columns: TableColumn<Customer>[] = [
    // { label: 'Checkbox', property: 'checkbox', type: 'checkbox', visible: true },
    { label: "ID", property: "reference", type: "text", visible: true },
    {
      label: "date",
      property: "created_at",
      type: "text",
      visible: true,
      cssClasses: ["text-secondary", "font-medium"],
    },
    {
      label: "Country",
      property: "country",
      type: "text",
      visible: true,
      cssClasses: ["font-medium"],
    },
    {
      label: "Network Provider",
      property: "operator",
      type: "text",
      visible: true,
      cssClasses: ["font-medium"],
    },
    {
      label: "Wallet Number",
      property: "phone_no",
      type: "text",
      visible: true,
    },
    // { label: "Contact", property: "phone_no", type: "button", visible: true },
    {
      label: "Pal fee",
      property: "charges",
      type: "text",
      visible: true,
      cssClasses: ["text-secondary", "font-medium"],
    },

    {
      label: "Currency",
      property: "currency",
      type: "text",
      visible: true,
      cssClasses: ["text-secondary", "font-medium"],
    },
    {
      label: "Amount Sent",
      property: "amount",
      type: "text",
      visible: true,
      cssClasses: ["text-secondary", "font-medium"],
    },
    {
      label: "Status",
      property: "status",
      type: "badge",
      visible: true,
      cssClasses: ["text-secondary", "font-medium"],
    },
    // { label: 'Labels', property: 'labels', type: 'button', visible: true },
    // { label: "Actions", property: "actions", type: "button", visible: true },
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: MatTableDataSource<any> | null;
  selection = new SelectionModel<any>(true, []);
  searchCtrl = new FormControl();
  exportOptions = {
    fileName: "test",
    sheet: { reportsProps: { Author: "KACHELAN" } },
  };

  labels = aioTableLabels;

  icPhone = icPhone;
  icMail = icMail;
  icMap = icMap;
  icAttachMoney = icAttachMoney;
  icEdit = icEdit;
  icSearch = icSearch;
  icPerson = icPerson;
  icDelete = icDelete;
  icAdd = icAdd;
  icFilterList = icFilterList;
  icMoreHoriz = icMoreHoriz;
  icFolder = icFolder;
  icDateRange = icDateRange;
  icBook = icBook;
  icRefresh = icRefresh;
  icCloudDownload = icCloudDownload;
  form: FormGroup;

  statusLabels = TRANSACTION_TABLE_LABELS;

  displayedColumns: string[] = [
    "id",
    "created_at",
    "country",
    "provider",
    "wallet",
    "fee",
    "currency",
    "amount",
    "status",
  ];

  statuses = [
    { name: "Pending", value: 1 },
    { name: "Completed", value: 3 },
    { name: "Error", value: 4 },
    { name: "Networ Error", value: 6 },
    { name: "Processing", value: 2 },
    { name: "Cancelled", value: 0 },
  ];
  countries = COUNTRIES;
  availableCountries = ["GH", "BJ", "CI"];
  networkProviders = ["mtn", "orange"];
  currencies = ["GHS", "XOF", "XAF", "NGN"];
  userData: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @ViewChild(MatTableExporterDirective)
  matTableExporter: MatTableExporterDirective;

  transactionsData: any;
  transactionType: any;
  hasNoTransactions: boolean;
  palFee = 0;
  isLoading: boolean;
  merchantSummaryData: SummaryData;

  userSessionData: any;
  hasError: boolean = false;
  errorMessage: string;

  customers: any;
  users: any;
  products: any;
  transactions: any;
  userBusinessData: any;
  credentials: string;

  constructor(
    private authService: AuthserviceService,
    private router: Router,
    private fb: FormBuilder,
    private transactionService: TransactionsService,
    private snackBar: MatSnackBar,
    private datePipe: DatePipe
  ) {
    const user = localStorage.getItem("current_user");
    const sessionData = JSON.parse(localStorage.getItem(USER_SESSION_KEY));
    this.userData = sessionData;
    const summaryData = JSON.parse(localStorage.getItem(SUMMARY_DATA_KEY));
    this.merchantSummaryData = summaryData;

    const businessData = localStorage.getItem(BUSINESS_DATA_KEY);
    if (businessData !== "undefined") {
      this.userBusinessData = JSON.parse(businessData);
    }

    this.credentials = `${this.userBusinessData?.api_secret_key_live}:${this.userBusinessData?.api_public_key_live}`;

    if (!sessionData) {
      router.navigate(["/auth/login"]);
    }
  }

  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }

  /**
   * Example on how to get data and pass it to the table - usually you would want a dedicated service with a HTTP request for this
   * We are simulating this request here.
   */
  getData() {
    return of(aioTableData.map((customer) => new Customer(customer)));
  }

  get hasExceededFreeTransfers(): boolean {
    return this.merchantSummaryData?.totalTransactionsAmount > 560000;
  }

  exportAsXlsx() {
    this.matTableExporter.exportTable("xlsx", {
      fileName: "Transactions Report",
      sheet: "report",
      Props: { Author: "PAL Africa" },
    });
  }

  getPalFee(amount, country: string): number {
    if (this.hasExceededFreeTransfers) {
      switch (country) {
        case "GH":
          return (amount * 0.5) / 100;
        case "BJ":
          return (amount * 1) / 100;
        default:
          return 0;
      }
    } else {
      return 0;
    }
  }

  refreshData() {
    this.getTransactionsList();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit() {
    // this.getData().subscribe(customers => {
    //   this.subject$.next(customers);
    // });
    this.form = this.fb.group({
      country: [""],
      dateFrom: [""],
      dateTo: [""],
      currency: [""],
      operator: [""],
      status: [""],
    });
    // this.data$.pipe(
    //   filter<OrderSession[]>(Boolean)
    // ).subscribe(customers => {
    //   this.orders = customers;
    //   this.dataSource.data = customers;
    // });
    this.search();

    this.searchCtrl.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((value) => this.onFilterChange(value));
  }

  resetForm() {
    this.form = this.fb.group({
      country: [""],
      dateFrom: [""],
      dateTo: [""],
      currency: [""],
      operator: [""],
      status: [""],
    });
    this.getTransactionsList();
  }

  getTransactionsList(filteredData = null) {
    this.isLoading = true;
    // userId = 'a9twRK1JpPPQDrB6hNvfAr2ju682' this is a test User_uid
    this.transactionService
      .getUserTransactions(this.userData?.user_id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (transactions) => {
          transactions = filteredData ? filteredData : transactions;
          this.isLoading = false;
          this.transactionsData = transactions.map((details) => {
            details.state = this.getStatusLabel(details.state);
            // details.palFee = this.getPalFee(details.amount, details.country);
            details.formatedDate = moment(details.created_at).fromNow();
            details.country = this.getCountryName(details.country);
            return details;
          });

          this.hasNoTransactions = transactions.length === 0 ? true : false;
          this.dataSource = new MatTableDataSource(this.transactionsData);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        (error) => {
          this.isLoading = false;
          console.error(error.message);
        }
      );
  }

  get isFormReady(): boolean {
    return true;
    // return !!this.users && !!this.customers;
  }

  getCountryName(countryCode: string): string {
    const countryData = this.countries.find(
      (country) => country.code === countryCode
    );
    return countryData.name;
  }

  getSalesRepName(user_id) {
    const salesRep = this.users?.find((user) => user.user_id === user_id);
    if (salesRep) {
      return salesRep.full_name;
    } else {
      return "N/A";
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  search() {
    if (this.form.value["dateFrom"] && this.form.value["dateTo"]) {
      const from = new Date(this.form.value["dateFrom"])
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      const to = new Date(this.form.value["dateTo"])
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      // this.form.get("dateFrom").setValue(from);
      // this.form.get("dateTo").setValue(to);
      this.form.value["dateFrom"] = from;
      this.form.value["dateTo"] = to;
    }

    this.isLoading = true;
    this.transactionService
      .searchTransactions(
        this.credentials,
        this.userBusinessData?.user_id,
        this.form.value,
        "mobile_transfers"
      )
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (response) => {
          this.isLoading = false;
          if (response["status"] === true) {
            this.transactions = response["data"];
            this.getTransactionsList(response["data"]);
            this.dataSource = new MatTableDataSource();
            this.dataSource.data = this.transactions;
            if (!this.dataSource.data.length) {
              this.hasError = true;
              this.errorMessage =
                "No data Found for the specified search criteria. Please try with different data";
            } else {
              this.hasError = false;
              this.errorMessage = "";
            }
          } else {
            this.hasError = true;
            this.errorMessage =
              "No data Found for the specified search criteria. Please try with different data";
          }
        },
        (erro) => {
          this.isLoading = false;
          this.hasError = true;
          this.errorMessage =
            "No data Found for the specified search criteria. Please try with different data";
        }
      );
  }

  viewOrderDetails(order: any) {
    this.router.navigate(["/dashboards/orders/order-details/" + order.id]);
  }

  getStatusLabel(status: string) {
    return this.statusLabels.find((label) => label.text === status);
  }

  deleteOrder(order: any) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    // this.orders.splice(this.orders.findIndex((existingCustomer) => existingCustomer.id === order.id), 1);
    // this.selection.deselect(order);
    // this.subject$.next(this.orders);
    // this.ordersService
    //   .deleteOrder(this.userSessionData?.user_id, order.id)
    //   .pipe(takeUntil(this.unsubscribe$))
    //   .subscribe((response) => {
    //     if (response["data"] === true) {
    //       this.getTransactionsList();
    //     }
    //   });
  }

  deleteCustomers(customers: Customer[]) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    customers.forEach((c) => this.deleteOrder(c));
  }

  onFilterChange(value: string) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  toggleColumnVisibility(column, event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    column.visible = !column.visible;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  trackByProperty<T>(index: number, column: TableColumn<T>) {
    return column.property;
  }

  onLabelChange(change: MatSelectChange, row: Customer) {
    // const index = this.orders.findIndex(c => c === row);
    // this.orders[index].labels = change.value;
    // this.subject$.next(this.orders);
  }

  exportTable() {
    TableUtil.exportTableToExcel("ExampleMaterialTable");
  }

  exportNormalTable() {
    TableUtil.exportTableToExcel("ExampleNormalTable");
  }

  exportArray() {
    const onlyNameAndSymbolArr: Partial<any>[] = this.dataSource.data.map(
      (x) => ({
        name: x.name,
        status: x.status,
      })
    );
    TableUtil.exportArrayToExcel(onlyNameAndSymbolArr, "ExampleArray");
  }
}
