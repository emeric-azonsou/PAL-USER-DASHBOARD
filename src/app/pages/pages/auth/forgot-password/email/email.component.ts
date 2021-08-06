import { Component, OnDestroy, OnInit } from "@angular/core";
import { Validators, FormBuilder } from "@angular/forms";
import icMail from "@iconify/icons-ic/twotone-mail";
import { Router } from "@angular/router";
import { AuthserviceService } from "src/app/services/authservice.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "vex-email",
  templateUrl: "./email.component.html",
  styleUrls: ["./email.component.scss"],
})
export class EmailComponent implements OnInit, OnDestroy {
  form = this.fb.group({
    email: ['',[ Validators.required, Validators.email]],
  });

  icMail = icMail;

  unsubscribe$ = new Subject();
  hasError: boolean;
  errorMessage: string;
  isSendingCode: boolean;
  constructor(private router: Router, private fb: FormBuilder, private authService: AuthserviceService, private snackBar: MatSnackBar) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  openSnackbar(message) {
    this.snackBar.open(message, 'CLOSE', {
      duration: 3000,
      horizontalPosition: 'right'
    });
  }
  send() {
    this.isSendingCode = true;
    const email = this.form.value['email'];
    this.authService.sendOTPToEmail({email}).pipe(takeUntil(this.unsubscribe$)).subscribe(
      response => {
        this.isSendingCode = false;
        if (response && response['status'] === true) {
          this.router.navigate(["forgot-password/otp"]);
          this.openSnackbar(response['message']);
        } else {
          this.hasError = true;
          this.errorMessage = response['message'] || 'Something went wrong, please try again';
        }
      }
    ),
    (error) => {
      this.hasError = true;
      this.errorMessage = error.message;
      console.error(error.message);
    }
  }
}
