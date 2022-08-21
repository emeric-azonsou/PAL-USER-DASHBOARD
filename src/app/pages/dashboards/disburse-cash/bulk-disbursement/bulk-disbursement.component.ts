import { SelectionModel } from "@angular/cdk/collections";
import { DatePipe } from "@angular/common";
import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSelectChange } from "@angular/material/select";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { MatTableExporterDirective } from "mat-table-exporter";
import moment from "moment";
import { ReplaySubject, Observable, Subject, of } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { TableColumn } from "src/@vex/interfaces/table-column.interface";
import {
  TRANSACTION_TABLE_LABELS,
  COUNTRIES,
  USER_SESSION_KEY,
  SUMMARY_DATA_KEY,
  BUSINESS_DATA_KEY,
} from "src/app/Models/constants";
import { SummaryData } from "src/app/Models/models.interface";
import { Customer } from "src/app/pages/apps/aio-table/interfaces/customer.model";
import { AuthserviceService } from "src/app/services/authservice.service";
import { TransactionsService } from "src/app/services/transactions.service";
import { aioTableLabels, aioTableData } from "src/static-data/aio-table-data";
import { TableUtil } from "../../reports/transactions-report/tableUtil";

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
import * as XLSX from "xlsx";
import { AddUpdateDisbursementModalComponent } from "./add-update-disbursement-modal/add-update-disbursement-modal.component";
import { MatDialog } from "@angular/material/dialog";
@Component({
  selector: "vex-bulk-disbursement",
  templateUrl: "./bulk-disbursement.component.html",
  styleUrls: ["./bulk-disbursement.component.scss"],
})
export class BulkDisbursementComponent implements OnInit {
  subject$: ReplaySubject<Customer[]> = new ReplaySubject<Customer[]>(1);
  data$: Observable<Customer[]> = this.subject$.asObservable();
  unsubscribe$ = new Subject();
  @Input()
  columns: TableColumn<Customer>[] = [
    // { label: 'Checkbox', property: 'checkbox', type: 'checkbox', visible: true },
    { label: "No", property: "index", type: "text", visible: true },
     { label: "Number", property: "phone_no", type: "text", visible: true },
      { label: "Network", property: "network", type: "text", visible: true },
      {
        label: "Amount",
        property: "amount",
        type: "text",
        visible: true,
        cssClasses: ["text-secondary", "font-medium"],
      },
      { label: "Reason of transaction", property: "purpose", type: "text", visible: true },
   
    {
      label: "Name",
      property: "name",
      type: "text",
      visible: true,
      cssClasses: ["font-medium"],
    },
   
    ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  layoutCtrl = new FormControl("boxed");
  searchCtrl = new FormControl();
  dataSource: MatTableDataSource<any> | null;
  selection = new SelectionModel<any>(true, []);
  exportOptions = {
    fileName: "test",
    sheet: { reportsProps: { Author: "PAL" } },
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

  displayedColumns: string[] = ["No", "Number", "Network", "Amount","Reason of transaction","Name"];

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
  file: any;
  arrayBuffer: string | ArrayBuffer | any;
  filelist: any[];
  hasData: boolean;
  isDisbursing: boolean;
  disbursementData: unknown[];
  totalAmount = 0;

  constructor(
    private authService: AuthserviceService,
    private router: Router,
    private fb: FormBuilder,
    private transactionService: TransactionsService,
    private snackBar: MatSnackBar,
    private datePipe: DatePipe,
    private dialog: MatDialog
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

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit() {
    // this.getData().subscribe(customers => {
    //   this.subject$.next(customers);
    // });
    this.form = this.fb.group({
      country: ["", Validators.required],
      currency: ["", Validators.required],
      purpose: [""],
    });
    // this.data$.pipe(
    //   filter<OrderSession[]>(Boolean)
    // ).subscribe(customers => {
    //   this.orders = customers;
    //   this.dataSource.data = customers;
    // });

    this.searchCtrl.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((value) => this.onFilterChange(value));
  }

  resetForm() {
    this.form = this.fb.group({
      country: [""],
      currency: [""],
      purpose: [""],
    });
  }

  addfile(event) {
    this.file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(this.file);
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      const data = new Uint8Array(this.arrayBuffer);
      const arr = new Array();
      for (let i = 0; i != data.length; ++i)
        arr[i] = String.fromCharCode(data[i]);
      const bstr = arr.join("");
      const workbook = XLSX.read(bstr, { type: "binary" });
      const first_sheet_name = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[first_sheet_name];
      const disbursementData = XLSX.utils.sheet_to_json(worksheet, {
        raw: true,
      });
      this.disbursementData = disbursementData;
      const amounts = disbursementData.map((data: any) => data.amount);
      this.totalAmount = amounts.reduce((sum, carr) => sum + carr);
      this.dataSource = new MatTableDataSource(disbursementData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.hasData = true;

    };
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
  openSnackbar(message) {
    this.snackBar.open(message, "CLOSE", {
      duration: 3000,
      horizontalPosition: "right",
    });
  }
 
  disburse() {
    this.isDisbursing = true;
    this.transactionService
      .createBulkTransfer(
        this.credentials,
        this.userBusinessData?.user_id,
        this.disbursementData,
        this.form.value,
        "mobile_transfers"
      )
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (response) => {
          this.isDisbursing = false;
          if (response && response["status"] === true) {
            this.openSnackbar(response["message"]);
            window.location.reload();
          } else {
            this.hasError = true;
            this.errorMessage = response["message"];
          }
        },
        (erro) => {
          this.isDisbursing = false;
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

  deleteDisbursements(customers: Customer[]) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    customers.forEach((c) => this.deleteOrder(c));
  }

  addDisbursement() {
    this.dialog.open(AddUpdateDisbursementModalComponent).afterClosed().subscribe((disbursement: any) => {
      /**
       * Customer is the updated customer (if the user pressed Save - otherwise it's null)
       */
      if (disbursement) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        this.customers.unshift(new Customer(disbursement));
        this.subject$.next(this.customers);
      }
    });
  }

  updateDisbursement(customer: Customer) {
    this.dialog.open(AddUpdateDisbursementModalComponent, {
      data: customer
    }).afterClosed().subscribe(updatedCustomer => {
      /**
       * Customer is the updated customer (if the user pressed Save - otherwise it's null)
       */
      if (updatedCustomer) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        const index = this.customers.findIndex((existingCustomer) => existingCustomer.id === updatedCustomer.id);
        this.customers[index] = new Customer(updatedCustomer);
        this.subject$.next(this.customers);
      }
    });
  }

  deleteDisbursement(customer: Customer) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    this.customers.splice(this.customers.findIndex((existingCustomer) => existingCustomer.id === customer.id), 1);
    this.selection.deselect(customer);
    this.subject$.next(this.customers);
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
