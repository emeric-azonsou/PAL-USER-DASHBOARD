import { CustomerCreateUpdateComponent } from "./../../apps/aio-table/customer-create-update/customer-create-update.component";
import { Customer } from "./../../apps/aio-table/interfaces/customer.model";
import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import icMoreVert from "@iconify/icons-ic/twotone-more-vert";
import icClose from "@iconify/icons-ic/twotone-close";
import icPrint from "@iconify/icons-ic/twotone-print";
import icDownload from "@iconify/icons-ic/twotone-cloud-download";
import icDelete from "@iconify/icons-ic/twotone-delete";
import icPhone from "@iconify/icons-ic/twotone-phone";
import icPerson from "@iconify/icons-ic/twotone-person";
import icMyLocation from "@iconify/icons-ic/twotone-my-location";
import icLocationCity from "@iconify/icons-ic/twotone-location-city";
import icEditLocation from "@iconify/icons-ic/twotone-edit-location";
import { BUSINESS_DATA_KEY, SUMMARY_DATA_KEY, USER_SESSION_KEY } from "src/app/Models/constants";
import { TransactionsService } from "src/app/services/transactions.service";
import { take, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { SummaryData } from "src/app/Models/models.interface";

@Component({
  selector: "vex-disburse-cash",
  templateUrl: "./disburse-cash.component.html",
  styleUrls: ["./disburse-cash.component.scss"],
})
export class DisburseCashComponent implements OnInit, OnDestroy {
  countryData = {
    BJ: { currency: "XOF", code: "+229" },
    CI: { currency: "XOF", code: "+225" },
    GH: { currency: "GHS", code: "+233" },
    TG: { currency: "XOF", code: "+227" },
    SN: { currency: "XOF", code: "+221" },
    NG: { currency: "NGN", code: "+234" },
  };

  icClose = icClose;
  transferForm: FormGroup;
  currency: string = "XOF";
  dailingCode: string = "+229";
  transferData: any;
  userData: any;
  module_id: any = '102';
  moduleData: Object[];
  userBusinessData: any;
  isDisbursing: boolean;
  unsubscribe$= new Subject();
  credentials: string;
  hasError: boolean;
  errorMessage: string;
  phoneNumberValidationPattern = /^[0-9]{0,15}$/;
  validationMessages = {
    phone_no:{
      pattern: 'Only digits allowed starting with ',
      required: "Receiver's Phone Field  is required.",
      min:'Please provide a correct phone number'
    },
    amount: {
      pattern: 'Only digits allowed',
      required: "Amount This Field  is required.",
    }
  };
  merchantSummaryData: SummaryData;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<DisburseCashComponent>,
    private fb: FormBuilder,
    private transactionsService: TransactionsService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {
    const sessionData = localStorage.getItem(USER_SESSION_KEY);
    this.userData = JSON.parse(sessionData);

    const businessData = localStorage.getItem(BUSINESS_DATA_KEY);
    this.userBusinessData = JSON.parse(businessData);

    const summaryData = JSON.parse(localStorage.getItem(SUMMARY_DATA_KEY));
    this.merchantSummaryData = summaryData;

  }

  ngOnInit() {
    this.transferForm = this.fb.group({
      country: ["BJ", Validators.required],
      phone_no: ['', [Validators.required, Validators.pattern(this.phoneNumberValidationPattern), Validators.min(8)]],
      amount: ["", [Validators.required, Validators.pattern(/[0-9]+$/)]],
      provider: ["mtn", Validators.required],
    });

    this.credentials = `${this.userBusinessData.api_secret_key_live}:${this.userBusinessData.api_public_key_live}`;
    this.getModulesData(this.credentials);
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  createTransfer() {
    const fee = this.getPalFee(this.transferForm.value['amount'], this.transferForm.value['country']);
    const amount = parseInt(this.transferForm.value['amount'], 10);
    this.transferForm.get('amount').setValue(amount);
    this.isDisbursing = true
    this.transferData = {
      ...this.transferForm.value,
      currency: this.currency,
      module_id: this.module_id,
      user_id: this.userData.user_id,
      charges: fee,
      hasExceededFeeTransfers: this.hasExceededFeeTransfers
    };

    this.transactionsService.createTransaction(this.transferData, this.credentials)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(response => {
        this.isDisbursing = false;
        if(response && response['status'] === true) {
          this.openSnackbar(response['message']);
          window.location.reload();
          
        } else {
          this.hasError = true;
          this.errorMessage = response['message'];
        }
      }),
      error => {
          this.hasError = true;
          this.errorMessage = error.message;
          console.error(error);
      }
  }

  openSnackbar(message) {
    this.snackBar.open(message, 'CLOSE', {
      duration: 3000,
      horizontalPosition: 'right'
    });
  }

  get maxTransactionAmount() {
    return this.currency === 'XOF' ? 560000 : 6020
  }

  get hasExceededFeeTransfers(): boolean {
    return this.merchantSummaryData?.totalTransactionsAmount > this.maxTransactionAmount;
  }

  getPalFee(amount, country: string): number {
    if(this.hasExceededFeeTransfers) {
      switch(country){
        case 'GH':
          return (amount * 0.5 / 100);
        case 'BJ':
          return (amount * 1 /100);
        default :
          return 0;
      }
    } else {
      return 0;
    }
   
  }

  getModulesData(credentials) {
    this.transactionsService
      .getModulesData(credentials)
      .pipe(take(1))
      .subscribe((data) => {
        this.moduleData = data;
      });
  }

  setCurrency(option) {
    this.currency = this.countryData[option.value].currency;
    this.dailingCode = this.countryData[option.value].code;
    // this.transferForm.get("phone_no")?.setValue(this.dailingCode);
    const selectedModule = this.moduleData.find((data) => {
      return (
        data["country"] === option.value && data["currency"] === this.currency
      );
    });
    this.module_id = selectedModule["id"];
  }

  createCustomer() {
    const customer = this.transferForm.value;

    if (!customer.imageSrc) {
      customer.imageSrc = "assets/img/avatars/1.jpg";
    }

    this.dialogRef.close(customer);
  }

  close(){
    this.dialogRef.close();
  }
}
