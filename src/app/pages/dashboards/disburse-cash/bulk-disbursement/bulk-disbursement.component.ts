import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatTableExporterDirective } from 'mat-table-exporter';
import moment from 'moment';
import { ReplaySubject, Observable, Subject, of } from 'rxjs';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import {
  TRANSACTION_TABLE_LABELS,
  COUNTRIES,
  USER_SESSION_KEY,
  SUMMARY_DATA_KEY,
  BUSINESS_DATA_KEY,
} from 'src/app/Models/constants';
import { SummaryData } from 'src/app/Models/models.interface';
import { AuthserviceService } from 'src/app/services/authservice.service';
import { TransactionsService } from 'src/app/services/transactions.service';
import { aioTableLabels, aioTableData } from 'src/static-data/aio-table-data';
import { TableUtil } from '../../reports/transactions-report/tableUtil';

import icEdit from '@iconify/icons-ic/twotone-edit';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icSearch from '@iconify/icons-ic/twotone-search';
import icAdd from '@iconify/icons-ic/twotone-add';
import icFilterList from '@iconify/icons-ic/twotone-filter-list';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icMail from '@iconify/icons-ic/twotone-mail';
import icMap from '@iconify/icons-ic/twotone-map';
import icMoreHoriz from '@iconify/icons-ic/twotone-more-horiz';
import icFolder from '@iconify/icons-ic/twotone-folder';
import icDateRange from '@iconify/icons-ic/twotone-date-range';
import icPerson from '@iconify/icons-ic/twotone-person';
import icRefresh from '@iconify/icons-ic/twotone-refresh';
import icBook from '@iconify/icons-ic/twotone-book';
import icCloudDownload from '@iconify/icons-ic/twotone-cloud-download';
import icAttachMoney from '@iconify/icons-ic/twotone-attach-money';
import * as XLSX from 'xlsx';
import { AddUpdateDisbursementModalComponent } from './add-update-disbursement-modal/add-update-disbursement-modal.component';
import { MatDialog } from '@angular/material/dialog';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldDefaultOptions,
} from '@angular/material/form-field';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { BusinessService } from 'src/app/services/business.service';
import { take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'vex-bulk-disbursement',
  templateUrl: './bulk-disbursement.component.html',
  styleUrls: ['./bulk-disbursement.component.scss'],
  animations: [fadeInUp400ms, stagger40ms],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'standard',
      } as MatFormFieldDefaultOptions,
    },
  ],
})
export class BulkDisbursementComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  subject$: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  data$: Observable<any[]> = this.subject$.asObservable();
  unsubscribe$ = new Subject();
  @Input()
  columns: TableColumn<any>[] = [
    { label: 'Select', property: 'checkbox', type: 'checkbox', visible: true },
    { label: 'No', property: 'index', type: 'text', visible: true },
    { label: 'Number', property: 'phone', type: 'text', visible: true },
    { label: 'Network', property: 'network', type: 'text', visible: true },
    {
      label: 'Amount',
      property: 'amount',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium'],
    },
    // { label: "Reason of transaction", property: "purpose", type: "text", visible: true },

    {
      label: 'Name',
      property: 'name',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium'],
    },
    { label: 'Actions', property: 'actions', type: 'button', visible: true },
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  layoutCtrl = new FormControl('boxed');
  searchCtrl = new FormControl();
  dataSource: MatTableDataSource<any> | null;
  selection = new SelectionModel<any>(true, []);
  exportOptions = {
    fileName: 'test',
    sheet: { reportsProps: { Author: 'PAL' } },
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
  uploadFileForm: FormGroup;

  statusLabels = TRANSACTION_TABLE_LABELS;

  displayedColumns: string[] = [
    'Select',
    'No',
    'Number',
    'Network',
    'Amount',
    'Reason of transaction',
    'Name',
    'Actions',
  ];

  statuses = [
    { name: 'Pending', value: 1 },
    { name: 'Completed', value: 3 },
    { name: 'Error', value: 4 },
    { name: 'Networ Error', value: 6 },
    { name: 'Processing', value: 2 },
    { name: 'Cancelled', value: 0 },
  ];
  operators = [
    { name: 'MTN', value: 'mtn' },
    { name: 'VODAFONE', value: 'vodafone' },
    { name: 'AIRTEL-TIGO', value: 'airtel-tigo' },
  ];
  countries = COUNTRIES;
  availableCountries = ['GH', 'BJ', 'CI'];
  networkProviders = ['mtn', 'orange'];
  currencies = ['GHS', 'XOF', 'XAF', 'NGN'];
  userData: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('disbursementFile')
  disbursermentListFile: ElementRef;
  @ViewChild(MatTableExporterDirective)
  matTableExporter: MatTableExporterDirective;

  transactionsData: any;
  transactionType: any;
  hasNoTransactions: boolean;
  palFee = 0;
  isLoading: boolean;
  merchantSummaryData: SummaryData;

  userSessionData: any;
  hasError = false;
  errorMessage: string;

  customers: any;
  users: any;
  products: any;
  transactions: any;
  userBusinessData: any;
  credentials: string;
  file: any;
  loadedExelFile: File;
  arrayBuffer: string | ArrayBuffer | any;
  filelist: any[];
  hasData: boolean;
  isDisbursing: boolean;
  disbursementData = [];
  totalAmount = 0;
  totalTransactions: number;
  isFetchingName: boolean;
  noNameErrorMessage: string;
  verifyingCount = 0;
  verificationCountMessage: string;
  tempName: string;
  moduleData: any;
  verifyingIndex = 0;

  constructor(
    private authService: AuthserviceService,
    private businessService: BusinessService,
    private router: Router,
    private fb: FormBuilder,
    private transactionService: TransactionsService,
    private snackBar: MatSnackBar,
    private datePipe: DatePipe,
    private dialog: MatDialog
  ) {
    const user = localStorage.getItem('current_user');
    const sessionData = JSON.parse(localStorage.getItem(USER_SESSION_KEY));
    this.userData = sessionData;
    const summaryData = JSON.parse(localStorage.getItem(SUMMARY_DATA_KEY));
    this.merchantSummaryData = summaryData;

    const businessData = localStorage.getItem(BUSINESS_DATA_KEY);
    if (businessData !== 'undefined') {
      this.userBusinessData = JSON.parse(businessData);
    }

    this.credentials = `${this.userBusinessData?.api_secret_key_live}:${this.userBusinessData?.api_public_key_live}`;

    if (!sessionData) {
      router.navigate(['/auth/login']);
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
    return of(aioTableData.map((customer) => customer));
  }

  get hasExceededFreeTransfers(): boolean {
    return this.merchantSummaryData?.totalTransactionsAmount > 560000;
  }

  exportAsXlsx() {
    this.matTableExporter.exportTable('xlsx', {
      fileName: 'Transactions Report',
      sheet: 'report',
      Props: { Author: 'PAL Africa' },
    });
  }

  getPalFee(amount, country: string): number {
    if (this.hasExceededFreeTransfers) {
      switch (country) {
        case 'GH':
          return (amount * 0.5) / 100;
        case 'BJ':
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
    this.dataSource = new MatTableDataSource();

    this.form = this.fb.group({
      country: ['', Validators.required],
      currency: [''],
      purpose: ['']
    });

    this.uploadFileForm = this.fb.group({
      country: ['', Validators.required],
      currency: [''],
      purpose: ['']
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

    this.uploadFileForm.get('country').valueChanges.subscribe(value => {
        this.form.get('country').setValue(value);
        this.setCurrency(value);
     });
    this.uploadFileForm.get('purpose').valueChanges.subscribe(value => {
      this.form.get('purpose').setValue(value);
   });
  }

  resetForm() {
    this.form = this.fb.group({
      country: [''],
      currency: [''],
      purpose: [''],
    });
  }

  setCurrency(country: string) {
    let currency;
    switch (country) {
      case 'GH':
        currency = 'GHS';
        break;
      case 'BJ':
        currency = 'XOF';
        break;
      case 'CI':
        currency = 'XOF';
        break;
      case 'SG':
        currency = 'XOF';
        break;
    }
    this.form.get('currency').setValue(currency);
    this.uploadFileForm.get('currency').setValue(currency);
  }

  addfile(event) {
    this.file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(this.file);
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      const data = new Uint8Array(this.arrayBuffer);
      const arr = new Array();
      for (let i = 0; i !== data.length; ++i) {
        arr[i] = String.fromCharCode(data[i]);
      }
      const bstr = arr.join('');
      const workbook = XLSX.read(bstr, { type: 'binary' });
      const first_sheet_name = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[first_sheet_name];
      const disbursementData = XLSX.utils.sheet_to_json(worksheet, {
        raw: true,
      });
      this.disbursementData = disbursementData.map((disbursement, index) => {
        disbursement['index'] = index + 1;
        return disbursement;
      });
      // tslint:disable-next-line:no-shadowed-variable
      const amounts = disbursementData.map((data: any) => data.amount);
      (this.totalAmount = amounts.reduce(
        (sum, carr) => parseInt(sum, 10) + carr
      )),
        (this.totalTransactions = disbursementData?.length);
      this.subject$.next(this.disbursementData);
      this.dataSource = new MatTableDataSource(this.disbursementData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.hasData = true;
      // tslint:disable-next-line:no-shadowed-variable
      this.disbursementData.forEach((data) => {
        const transferData = {
          currency: this.form.value.currency,
          user_id: this.userData.user_id,
          charges: 0,
          phone_no: data.phone,
          country: this.form.value.country,
          operator: data.network,
        };
        this.getClientData(transferData, data.index);
      });
      if (this.disbursementData.length) {
        this.disbursermentListFile.nativeElement.value = '';
      }
    };
  }

  get isFormReady(): boolean {
    return true;
    // return !!this.users && !!this.disbursementData;
  }

  getCountryName(countryCode: string): string {
    const countryData = this.countries.find(
      (country) => country.code === countryCode
    );
    return countryData?.name;
  }

  getSalesRepName(userID) {
    const salesRep = this.users?.find((user) => user.user_id === userID);
    if (salesRep) {
      return salesRep.full_name;
    } else {
      return 'N/A';
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  openSnackbar(message) {
    this.snackBar.open(message, 'CLOSE', {
      duration: 5000,
      horizontalPosition: 'right',
    });
  }

  disburse() {
    if (this.uploadFileForm.value.country) {
      this.setCurrency(this.uploadFileForm.value.country);
      this.form.get('country').setValue(this.uploadFileForm.value.country);
    } else if (this.form.value.country) {
      this.setCurrency(this.form.value.country);
    }
    this.isDisbursing = true;
    this.transactionService
      .createBulkTransfer(
        this.credentials,
        this.userBusinessData?.user_id,
        this.disbursementData,
        this.form.value,
        'mobile_transfers'
      )
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (response) => {
          this.isDisbursing = false;
          if (response && response['status'] === true) {
            this.openSnackbar(response['message']);
            window.location.reload();
          } else {
            this.hasError = true;
            this.errorMessage = response['message'];
            this.openSnackbar(response['message']);
          }
        },
        (error) => {
          this.isDisbursing = false;
          this.hasError = true;
          this.errorMessage = error.message || 'Something went wrong please try again or contact support';
          this.openSnackbar(this.errorMessage);
        }
      );
  }

  viewOrderDetails(order: any) {
    this.router.navigate(['/dashboards/orders/order-details/' + order.id]);
  }

  getStatusLabel(status: string) {
    return this.statusLabels.find((label) => label.text === status);
  }

  deleteDisbursements(disbursements: any[]) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    disbursements.forEach((d) => this.deleteDisbursement(d));
  }

  addDisbursement() {
    this.dialog
      .open(AddUpdateDisbursementModalComponent)
      .afterClosed()
      .subscribe((disbursement: any) => {
        /**
         * any is the updated customer (if the user pressed Save - otherwise it's null)
         */
        if (disbursement) {
          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */
          this.updateDataSource();

          const amounts = this.disbursementData.length
            ? this.disbursementData?.map((data: any) => +data?.amount)
            : [0];
          const sum = amounts.reduce((sum, carr) => sum + carr);

          this.totalAmount = sum + +disbursement.amount;
          this.totalTransactions = this.disbursementData?.length + 1;

          this.disbursementData.unshift(disbursement);

          const transferData = {
            currency: this.form.value.currency,
            user_id: this.userData.user_id,
            charges: 0,
            phone_no: disbursement.phone,
            operator: disbursement.network,
            country: this.form.value.country,
          };
          this.updateDataSource();
          this.getClientData(transferData, this.disbursementData?.length);
        }
      });
  }

  updateDataSource(disbursementData = null) {
    if (disbursementData) {
      this.disbursementData = disbursementData;
    }
    this.disbursementData = this.disbursementData?.map(
      (disbursement, index) => {
        disbursement['index'] = index + 1;
        return disbursement;
      }
    );

    this.subject$.next(this.disbursementData);
    this.dataSource = new MatTableDataSource(this.disbursementData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getClientData(transferData, index) {
    this.disbursementData = this.disbursementData.map((data) => {
      if (data['phone'] === transferData['phone_no']) {
        this.tempName = data['name'];
        data['name'] = 'verifying....';
      }
      return data;
    });
    this.updateDataSource();
    this.verifyingIndex = this.verifyingIndex;
    this.verificationCountMessage = `${this.verifyingIndex}/${this.disbursementData.length}`;
    this.isFetchingName = true;
    this.businessService
      .getClientDetails(transferData, this.credentials)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response) => {
        this.isFetchingName = false;
        this.verifyingIndex = +1;
        this.verificationCountMessage = `${index}/${this.disbursementData.length}`;

        if (response && response['status'] === true) {
          const disbursementData = this.disbursementData.map((data) => {
            if (`${data['phone']}` === response['data'].phone_no) {
              data['name'] = response['data'].full_name;
            }
            return data;
          });
          this.updateDataSource(disbursementData);
        } else {
          const currentIndex = this.disbursementData.findIndex(
            (existingany) => existingany['phone'] === transferData.phone_no
          );
          this.disbursementData[currentIndex][
            'name'
          ] = `${this.tempName} (not verified)`;

          this.updateDataSource();
        }
      }),
      (error) => {
        this.verifyingIndex = +1;
        // this.verificationCountMessage = `${this.verifyingIndex}/${this.disbursementData.length}`;
        this.isFetchingName = false;
        this.noNameErrorMessage =
          'Failed to retreive client name assotiated to this phone number';
        // console.warn(error);
        const currentIndex = this.disbursementData.findIndex(
          (existingany) => existingany['phone'] === transferData.phone_no
        );
        this.disbursementData[currentIndex][
          'name'
        ] = `${this.tempName} (not verified)`;

        this.updateDataSource();
      };
  }

  updateDisbursement(customer: any) {
    this.dialog
      .open(AddUpdateDisbursementModalComponent, {
        data: customer,
      })
      .afterClosed()
      .subscribe((updatedDisbursement) => {
        /**
         * any is the updated customer (if the user pressed Save - otherwise it's null)
         */
        if (updatedDisbursement) {
          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */


          const index = this.disbursementData.findIndex(
            (existingany) => existingany['phone'] === updatedDisbursement.phone
          );
          this.disbursementData[index] = updatedDisbursement;
          const amounts = this.disbursementData.length
            ? this.disbursementData?.map((data: any) => +data?.amount)
            : [0];
          const sum = amounts.reduce((sum, carr) => sum + carr);

          this.totalAmount = sum;
          this.updateDataSource(this.disbursementData);
        }
      });
  }

  deleteDisbursement(disbursement: any) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    this.disbursementData.splice(
      this.disbursementData.findIndex(
        (existingany) => existingany['phone'] === disbursement.phone
      ),
      1
    );
    const amounts = this.disbursementData.length
      ? this.disbursementData?.map((data: any) => +data?.amount)
      : [0];
    const sum = amounts.reduce((sum, carr) => sum + carr);

    this.totalAmount = sum;
    this.totalTransactions = this.disbursementData?.length;
    this.selection.deselect(disbursement);
    this.updateDataSource();
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

  onLabelChange(change: MatSelectChange, row: any) {
    // const index = this.orders.findIndex(c => c === row);
    // this.orders[index].labels = change.value;
    // this.subject$.next(this.orders);
  }

  exportTable() {
    TableUtil.exportTableToExcel('ExampleMaterialTable');
  }

  exportNormalTable() {
    TableUtil.exportTableToExcel('ExampleNormalTable');
  }

  getModulesData(credentials) {
    this.transactionService
      .getModulesData(credentials)
      .pipe(take(1))
      .subscribe((data) => {
        this.moduleData = data;
        this.networkProviders = this.moduleData.map(
          (data: any) => data.operator
        );
      });
  }

  exportArray() {
    const onlyNameAndSymbolArr: Partial<any>[] = this.dataSource.data.map(
      (x) => ({
        name: x?.name,
        status: x?.status,
      })
    );
    TableUtil.exportArrayToExcel(onlyNameAndSymbolArr, 'ExampleArray');
  }
}
