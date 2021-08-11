import { Component, OnDestroy, OnInit } from "@angular/core";
import { Validators, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import icMail from "@iconify/icons-ic/twotone-mail";
import { Subject } from "rxjs";
import { take, takeUntil } from "rxjs/operators";
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
  userID: any;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthserviceService,
    private route: ActivatedRoute
  ) {

    route.params.pipe(take(1)).subscribe((param) => {
      this.userID = param.user_id;
    });

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
      .verifyEmail(this.otp, this.userID)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response) => {
        this.isVerifying = false;
        if (response && response["status"] === true) {
          const data = response['userData'];
          localStorage.setItem(USER_SESSION_KEY, JSON.stringify(data));
          this.router.navigate([`forgot-password/new-password`]);
        } else {
          this.hasError = true;
          this.errorMEssage = response['message'];
        }
      });
  }
}
