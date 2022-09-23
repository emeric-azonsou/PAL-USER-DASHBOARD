import { Component, OnDestroy, OnInit } from '@angular/core';
import icClose from '@iconify/icons-ic/twotone-close';
import { TransactionsService } from '../../../services/transactions.service';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedDataService } from '../../../services/shared-data.service';
import { BusinessService } from 'src/app/services/business.service';
@Component({
  selector: 'vex-confirm-transfers',
  templateUrl: './confirm-transfers.component.html',
  styleUrls: ['./confirm-transfers.component.scss'],
})
export class ConfirmTransfersComponent implements OnInit, OnDestroy {
  icClose = icClose;

  unsubscribe$ = new Subject();
  isDisbursing = false;
  hasError: boolean;
  errorMessage: string;
  allData: Object;
  transferData: Object;
  credentials: string;
  contry: string;
  clientName: any;
  noNameErrorMessage: any;
  isFetchingName: boolean;

  constructor(
    private transactionsService: TransactionsService,
    private businessService: BusinessService,
    private snackBar: MatSnackBar,
    private sharedData: SharedDataService
  ) {}

  ngOnInit(): void {
    this.getAllData();
    this.getClientData();
    this.getContryName();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


  getContryName(){
    this.contry=this.transferData['country']==='BJ' ? 'BENIN' : 'GHANA';
  }

  createTransfer() {
    this.isDisbursing = true;
    this.transactionsService
      .createTransaction(this.transferData, this.credentials)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response) => {
        if (response && response['status'] === true) {
          this.openSnackbar(response['message']);
          window.location.reload();
        } else {
          this.hasError = true;
          this.errorMessage = response['message'];
        }
      }),
      // tslint:disable-next-line:no-unused-expression
      (error: any) => {
        this.isDisbursing = false;
        this.hasError = true;
        this.errorMessage = error.message;
        console.error(error);
      };
  }

  getAllData() {
    this.allData = this.sharedData.getTransferData();
    this.transferData = this.allData['transfersData'];
    this.credentials = this.allData['credential'];
  }

  getClientData() {
    this.isFetchingName = true;
    this.businessService
    .getClientDetails(this.transferData, this.credentials)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((response) => {
      this.isFetchingName = false
      if (response && response['status'] === true) {
        this.clientName = response['data'].full_name;
      } else {
        this.noNameErrorMessage = 'Failed to retreive client name assotiated to this phone number';
      }
    }),
    // tslint:disable-next-line:no-unused-expression
    (error) => {
      this.isFetchingName = false;
      this.noNameErrorMessage = 'Failed to retreive client name assotiated to this phone number';
      console.log(error);
    };
  }

  openSnackbar(message) {
    this.snackBar.open(message, 'CLOSE', {
      duration: 3000,
      horizontalPosition: 'right',
    });
  }
}
