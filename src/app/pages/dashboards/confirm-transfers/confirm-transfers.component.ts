import { Component, OnInit } from "@angular/core";
import icClose from "@iconify/icons-ic/twotone-close";
import { TransactionsService } from "../../../services/transactions.service";
import { take, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SharedDataService } from "../../../services/shared-data.service";
@Component({
  selector: "vex-confirm-transfers",
  templateUrl: "./confirm-transfers.component.html",
  styleUrls: ["./confirm-transfers.component.scss"],
})
export class ConfirmTransfersComponent implements OnInit {
  icClose = icClose;

  unsubscribe$ = new Subject();
  isDisbursing: boolean;
  hasError: boolean;
  errorMessage: string;
  allData: Object;
  transferData: Object;
  credentials: string;
  contry:string;

  constructor(
    private transactionsService: TransactionsService,
    private snackBar: MatSnackBar,
    private sharedData: SharedDataService
  ) {}

  ngOnInit(): void {
    this.getAllData();
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
        this.isDisbursing = false;
        if (response && response["status"] === true) {
          this.openSnackbar(response["message"]);
          window.location.reload();
        } else {
          this.hasError = true;
          this.errorMessage = response["message"];
        }
      }),
      (error) => {
        this.hasError = true;
        this.errorMessage = error.message;
        console.error(error);
      };
  }

  getAllData() {
    this.allData = this.sharedData.getTransferData();
    this.transferData = this.allData["transfersData"];
    this.credentials = this.allData["credential"];
  }

  openSnackbar(message) {
    this.snackBar.open(message, "CLOSE", {
      duration: 3000,
      horizontalPosition: "right",
    });
  }
}
