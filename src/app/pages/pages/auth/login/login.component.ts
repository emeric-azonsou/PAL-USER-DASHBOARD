import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import icVisibility from "@iconify/icons-ic/twotone-visibility";
import icVisibilityOff from "@iconify/icons-ic/twotone-visibility-off";
import { fadeInUp400ms } from "../../../../../@vex/animations/fade-in-up.animation";
import { AuthserviceService } from "src/app/services/authservice.service";
import { catchError, take, takeUntil } from "rxjs/operators";
import { USER_SESSION_KEY } from "src/app/Models/constants";
import { Subject, throwError } from "rxjs";
import { UserSession } from "src/app/Models/models.interface";
export const USER_CREDENTIALS = "credentials";
@Component({
  selector: "vex-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInUp400ms],
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;

  inputType = "password";
  visible = false;

  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;
  hasError: boolean = false;
  isProcessing: boolean = false;
  unsubscribe$ = new Subject();
  isInvalidvUser: boolean;
  sessionResponse: UserSession;
  userCredentials: {
    email: string;
    password: string;
  };
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private snackbar: MatSnackBar,
    private authService: AuthserviceService
  ) {
    const credentialsData = localStorage.getItem(USER_CREDENTIALS);
    if(credentialsData) {
      this.userCredentials = JSON.parse(credentialsData);
    }
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: [ this.userCredentials?.email || "", [Validators.required, Validators.email]],
      password: [ this.userCredentials?.password || "", Validators.required],
      remember: [false]
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  send() {
    this.router.navigate(["/"]);
    this.snackbar.open(
      "Lucky you! Looks like you didn't need a password or email address! For a real application we provide validators to prevent this. ;)",
      "LOL THANKS",
      {
        duration: 10000,
      }
    );
  }

  login() {
 
    this.isProcessing = true;
    const email = this.form.value["email"];
    const password = this.form.value["password"];
    console.log('[remember]', this.form.value['remember']);
    if(this.form.value['remember'] === true) {
      const credentials = { email, password };
      localStorage.setItem(USER_CREDENTIALS, JSON.stringify(credentials));
    }
    this.authService
      .login(email, password)
      .pipe(take(1))
      .subscribe((response) => {
        this.isProcessing = false;
        if (response && response.currentUser) {
          this.sessionResponse = {
            first_name: response.currentUser.first_name,
            last_name: response.currentUser.last_name,
            email: response.currentUser.email,
            mobile_phone: response.currentUser.mobile_phone,
            user_id: response.currentUser.user_id,
            photo: response.currentUser.photo,
            status: response.currentUser.status,
            id: response.currentUser.id,
            currency: response.currentUser.currency,
            country_code: response.currentUser.country_code,
            hasBusiness: response.currentUser.hasBusiness
          };
          localStorage.setItem(
            USER_SESSION_KEY,
            JSON.stringify(this.sessionResponse)
          );
          this.router.navigate(["/dashboards/analytics"]);
        } else {
          this.isProcessing = false;
          this.hasError = true;
          this.isInvalidvUser = true;
        }
      }),
      (error) => {
        this.isProcessing = false;
        this.hasError = true;
        this.isInvalidvUser = true;
      };
  }

  toggleVisibility() {
    if (this.visible) {
      this.inputType = "password";
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = "text";
      this.visible = true;
      this.cd.markForCheck();
    }
  }
}
