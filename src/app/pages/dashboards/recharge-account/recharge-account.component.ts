import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { USER_SESSION_KEY, BUSINESS_DATA_KEY } from 'src/app/Models/constants';
import { TransactionsService } from 'src/app/services/transactions.service';
import { CustomerCreateUpdateComponent } from '../../apps/aio-table/customer-create-update/customer-create-update.component';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import icClose from '@iconify/icons-ic/twotone-close';
import icPrint from '@iconify/icons-ic/twotone-print';
import icDownload from '@iconify/icons-ic/twotone-cloud-download';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icPerson from '@iconify/icons-ic/twotone-person';
import icMyLocation from '@iconify/icons-ic/twotone-my-location';
import icLocationCity from '@iconify/icons-ic/twotone-location-city';
import icEditLocation from '@iconify/icons-ic/twotone-edit-location';
import { BusinessService } from 'src/app/services/business.service';

@Component({
  selector: 'vex-recharge-account',
  templateUrl: './recharge-account.component.html',
  styleUrls: ['./recharge-account.component.scss']
})
export class RechargeAccountComponent implements OnInit, OnDestroy {
  countryData = {
    BJ: { currency: 'XOF', code: '+229' },
    CI: { currency: 'XOF', code: '+225' },
    GH: { currency: 'GHS', code: '+233' },
    TG: { currency: 'XOF', code: '+227' },
    SN: { currency: 'XOF', code: '+221' },
    NG: { currency: 'NGN', code: '+234' },
  };

  icClose = icClose;
  topUpForm: FormGroup;
  currency = 'XOF';
  dailingCode = '+229';
  module_id = 102;
  data: any;
  userData: any;
  moduleData: Object[];
  userBusinessData: any;
  isProcessing: boolean;
  unsubscribe$ = new Subject();
  credentials: string;
  hasError: boolean;
  errorMessage: string;
  validationMessages = {
    amount: {
      pattern: 'Only digits allowed',
      required: 'Amount This Field  is required.',
    }
  };
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<RechargeAccountComponent>,
    private fb: FormBuilder,
    private transactionService: TransactionsService,
    private businessService: BusinessService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    const sessionData = localStorage.getItem(USER_SESSION_KEY);
    this.userData = JSON.parse(sessionData);

    const businessData = localStorage.getItem(BUSINESS_DATA_KEY);
    this.userBusinessData = JSON.parse(businessData);
  }

  ngOnInit() {
    this.topUpForm = this.fb.group({
      country: ['BJ', Validators.required],
      amount: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      operator: ['mtn', Validators.required],
    });

    this.credentials = `${this.userBusinessData.api_secret_key_live}:${this.userBusinessData.api_public_key_live}`;
    this.getModulesData(this.credentials);
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  rechargeAccount() {
    this.isProcessing = true;
    this.data = {
      ...this.topUpForm.value,
      currency: this.currency,
      module_id: this.module_id,
      user_id: this.userData.user_id,
      status: 'Pending'
    };

    this.businessService.requestTopUp(this.data, this.credentials)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(response => {
        this.isProcessing = false;
        if(response && response['status'] === true) {
          this.openSnackbar(response['message']);
          this.dialogRef.close();
          window.location.reload();
        } else {
          this.hasError = true;
          this.errorMessage = response['message'];
          this.router.navigate(['/dashboards/cash-in-transactions'])
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

  getModulesData(credentials) {
    this.transactionService
      .getModulesData(credentials)
      .pipe(take(1))
      .subscribe((data) => {
        this.moduleData = data;
      });
  }

  setCurrency(option) {
    this.currency = this.countryData[option.value].currency;
    const selectedModule = this.moduleData.find((data) => {
      return (
        data['country'] === option.value && data['currency'] === this.currency
      );
    });
    this.module_id = selectedModule['id'];
  }

  createCustomer() {
    const customer = this.topUpForm.value;

    if (!customer.imageSrc) {
      customer.imageSrc = 'assets/img/avatars/1.jpg';
    }

    this.dialogRef.close(customer);
  }

  close(){
    this.dialogRef.close();
  }
}
