import { Component, OnDestroy, OnInit } from "@angular/core";
import { Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import icMail from "@iconify/icons-ic/twotone-mail";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { USER_SESSION_KEY } from "src/app/Models/constants";
import { AuthserviceService } from "src/app/services/authservice.service";
@Component({
  selector: "vex-otp-verification",
  templateUrl: "./otp-verification.component.html",
  styleUrls: ["./otp-verification.component.scss"],
})
export class OtpVerificationComponent implements OnInit, OnDestroy {
  form = this.fb.group({
    email: [null, Validators.required],
  });

  icMail = icMail;

  unsubscribe$ = new Subject();
  otp: string;
  userData: any;
  isVerifying: boolean;
  hasError: boolean;
  errorMEssage: string;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthserviceService
  ) {
    const sessionData = JSON.parse(localStorage.getItem(USER_SESSION_KEY));
    this.userData = sessionData;
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onOtpChange(value) {
    this.otp = value;
  }
  verify() {
    this.isVerifying = true;
    this.authService
      .verifyEmail(this.otp, this.userData.id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response) => {
        this.isVerifying = false;
        if (response && response["status"] === true) {
          this.router.navigate([`forgot-password/new-password`, response['data'].user_id]);
        } else {
          this.hasError = true;
          this.errorMEssage = response['message'];
        }
      });
  }
}
