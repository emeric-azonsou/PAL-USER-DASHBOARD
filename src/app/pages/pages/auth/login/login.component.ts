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
import { take, takeUntil } from "rxjs/operators";
import { USER_SESSION_KEY } from "src/app/Models/constants";
import { Subject, throwError } from "rxjs";

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
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private snackbar: MatSnackBar,
    private authService: AuthserviceService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  ngOnDestroy(){
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
    this.isProcessing = true
    const email = this.form.value["email"];
    const password = this.form.value["password"];
    this.authService
      .login(email, password)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response) => {
        if (response && response.currentUser) {
          this.isProcessing = false;
          localStorage.setItem(
            USER_SESSION_KEY,
            JSON.stringify(response.currentUser)
          );
          this.router.navigate(["/dashboards/home"]);
        } else {
          this.isProcessing = false;
          this.hasError = true;
        }
        console.log('isproessing', this.isProcessing);
      }),
      (error) => {
        this.isProcessing = false;
        console.error(error);
        this.hasError = true;
        console.log('isprossessing', this.isProcessing);

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
