import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { USER_SESSION_KEY, SUMMARY_DATA_KEY, BUSINESS_DATA_KEY } from 'src/app/Models/constants';
import { User, MerchantData, SummaryData } from 'src/app/Models/models.interface';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { TransactionsService } from 'src/app/services/transactions.service';
import { ConfirmTransfersComponent } from '../../../confirm-transfers/confirm-transfers.component';
import { DisburseCashComponent } from '../../disburse-cash.component';

import icClose from "@iconify/icons-ic/twotone-close";

@Component({
  selector: 'vex-add-update-disbursement-modal',
  templateUrl: './add-update-disbursement-modal.component.html',
  styleUrls: ['./add-update-disbursement-modal.component.scss']
})
export class AddUpdateDisbursementModalComponent implements OnInit {
  mode: 'create' | 'update' = 'create';
  operators = [
    { name: "MTN", value: "mtn" },
    { name: "VODAFONE", value: "vodafone" },
    { name: "AIRTEL-TIGO", value: "airtel-tigo" },
  ];

  countryData = {
    BJ: {
      currency: "XOF",
      code: "+229",
      operators: [{ name: "MTN", value: "mtn" }],
    },
    CI: {
      currency: "XOF",
      code: "+225",
      operators: [
        { name: "MTN", value: "mtn" },
        { name: "ORANGE", value: "orange" },
      ],
    },
    GH: {
      currency: "GHS",
      code: "+233",
      operators: [
        { name: "MTN", value: "mtn" },
        { name: "VODAFONE", value: "vodafone" },
        { name: "AIRTEL-TIGO", value: "airtel-tigo" },
      ],
    },
    TG: {
      currency: "XOF",
      code: "+227",
      operators: [{ name: "MOOV", value: "moov" }],
    },
    SN: {
      currency: "XOF",
      code: "+221",
      operators: [
        { name: "MTN", value: "MTN" },
        { name: "ORANGE", value: "orange" },
      ],
    },
    NG: {
      currency: "NGN",
      code: "+234",
      operators: [{ name: "MTN", value: "MTN" }],
    },
  };

  icClose = icClose;
  transferForm: FormGroup;
  currency: string = "XOF";
  dailingCode: string = "+229";
  maxLength: number = 8;
  transferData: any;
  userData: User;
  module_id: any = "102";
  moduleData: Object[];
  userBusinessData: MerchantData;
  isDisbursing: boolean;
  unsubscribe$ = new Subject();
  credentials: string;
  hasError: boolean;
  errorMessage: string;
  phoneNumberValidationPattern = /^[0-9]{0,15}$/;
  hasPhoneInputError: boolean;
  checkPhoneErrorMessage: string;

  validationMessages = {
    repeat_phone_no: {
      pattern: "Only digits allowed starting with ",
      required: "Receiver's Phone Field  is required.",
      min: "Please provide a correct phone number",
    },
    phone_no: {
      pattern: "Only digits allowed starting with ",
      required: "Receiver's Phone Field  is required.",
      min: "Please provide a correct phone number",
    },
    amount: {
      pattern: "Only decimal number allowed",
      required: "Amount This Field  is required.",
    },
  };
  merchantSummaryData: SummaryData;
  placeHolder: string = "96040522";
  networkProviders: any[];
  country: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<DisburseCashComponent>,
    private fb: FormBuilder,
    private transactionsService: TransactionsService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private sharedData: SharedDataService
  ) {
    const sessionData = localStorage.getItem(USER_SESSION_KEY);
    this.userData = JSON.parse(sessionData);

 
    const summaryData = JSON.parse(localStorage.getItem(SUMMARY_DATA_KEY));
    this.merchantSummaryData = summaryData;

    this.initForm();

  }

  ngOnInit() {
    this.initForm();
    const businessData = localStorage.getItem(BUSINESS_DATA_KEY);
    this.userBusinessData = JSON.parse(businessData);
    console.log('[defaults]', this.defaults);
    this.mode = this.defaults ? 'update' : 'create';
   this.initForm();

    this.credentials = `${this.userBusinessData.api_secret_key_live}:${this.userBusinessData.api_public_key_live}`;
    this.getModulesData(this.credentials);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  initForm() {
    this.transferForm = this.fb.group({
      phone_no: [
        this.defaults.phone || "",
        [
          Validators.required,
          Validators.pattern(this.phoneNumberValidationPattern),
          Validators.min(8),
        ],
      ],
      repeat_phone_no: [
        this.defaults.phone || "",
        [
          Validators.required,
          Validators.pattern(this.phoneNumberValidationPattern),
          Validators.min(8),
        ],
      ],
      amount: [this.defaults.amount || "", [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]],
      operator: [this.defaults.network || "mtn", Validators.required],
    });
  }

  getNetworkProviders(value) {
    return this.countryData[value].operators;
  }

  confirmTransfers() {
    this.dialog.open(ConfirmTransfersComponent);
    const fee = this.getPalFee(
      this.transferForm.value["amount"],
      this.transferForm.value["country"]
    );
    const amount = parseFloat(this.transferForm.value["amount"]);
    this.transferForm.get("amount").setValue(amount);

    if (!this.transferForm.value["object"]) {
      this.transferForm
        .get("object")
        .setValue(this.userBusinessData?.business_legal_name);
    }
    // this.isDisbursing = true;
    this.transferData = {
      ...this.transferForm.value,
      currency: this.currency,
      module_id: this.module_id,
      user_id: this.userData.user_id,
      charges: fee,
      hasExceededFeeTransfers: this.hasExceededFeeTransfers,
    };
    this.sharedData.saveTransferData(this.transferData, this.credentials);
  }

  openSnackbar(message) {
    this.snackBar.open(message, "CLOSE", {
      duration: 3000,
      horizontalPosition: "right",
    });
  }

  get maxTransactionAmount() {
    return this.currency === "XOF" ? 560000 : 6190;
  }

  get hasExceededFeeTransfers(): boolean {
    return (
      this.merchantSummaryData?.totalTransactionsAmount >
      this.maxTransactionAmount
    );
  }

  getPalFee(amount, country: string): number {
    const charges = this.userBusinessData.charges;
    if (this.hasExceededFeeTransfers && charges === 0) {
      switch (country) {
        case "GH":
          return (amount * 0.5) / 100;
        case "BJ":
          return (amount * 1) / 100;
        default:
          return 0;
      }
    } else if (this.hasExceededFeeTransfers && charges !== 0) {
      return (amount * charges) / 100;
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
        this.networkProviders = this.moduleData.map(
          (data: any) => data.operator
        );
      });
  }

  getMaxLength(country) {
    if (country === "BJ") {
      return 8;
    } else {
      return 10;
    }
  }

  setCurrency(option) {
    this.country = option.value;
    this.currency = this.countryData[option.value].currency;
    this.dailingCode = this.countryData[option.value].code;
    this.maxLength = this.getMaxLength(option.value);
    this.placeHolder = option.value === "BJ" ? "96040522" : "0544990518";
    // this.transferForm.get("phone_no")?.setValue(this.dailingCode);

    if (option.value === "BJ") {
      this.networkProviders = this.networkProviders.filter(
        (provider) => provider !== "vodafone" && provider !== "airtel-tigo"
      );
    }
    if (option.value === "GH") {
      this.module_id = 103;
      this.transferForm.get("operator").setValue("mtn");
    }
  }

  setSelectedModule(option) {
    const selectedModule = this.moduleData.find((data) => {
      return (
        data["country"] === this.country &&
        data["currency"] === this.currency &&
        data["operator"] === option.value
      );
    });
    this.module_id = selectedModule["id"];
  }


  close() {
    this.dialogRef.close();
  }

  onCheckConfirmNumber = () => {
    if (
      this.transferForm.value["phone_no"] ===
      this.transferForm.value["repeat_phone_no"]
    ) {
      this.hasPhoneInputError = false;
    } else {
      this.hasPhoneInputError = true;
      this.checkPhoneErrorMessage = "phone numbers must be identical";
    }
  };

  get phoneNumber(): AbstractControl {
    return this.transferForm.controls["phone_no"];
  }

  get confirmPhoneNumber(): AbstractControl {
    return this.transferForm.controls["repeat_phone_no"];
  }

  save() {
    if (this.mode === 'create') {
      this.addDisbursement();
    } else if (this.mode === 'update') {
      this.updateDisbursement();
    }
  }


  addDisbursement() {
    const disbursement = this.transferForm.value;
    const filteredDisbursement = {
      phone: disbursement.phone,
      amount: disbursement.amount,
      name: this.defaults.client_name,
      network: disbursement.operator,
      index: this.defaults.index
    }

    this.dialogRef.close(filteredDisbursement);
  }

  updateDisbursement() {
    const disbursement = this.transferForm.value;
    const filteredDisbursement = {
      phone: disbursement.phone,
      amount: disbursement.amount,
      name: this.defaults.client_name,
      network: disbursement.operator,
      index: this.defaults.index
    }

    this.dialogRef.close(filteredDisbursement);
  }

  get isCreateMode() {
    return this.mode === 'create';
  }

  get isUpdateMode() {
    return this.mode === 'update';
  }


}
