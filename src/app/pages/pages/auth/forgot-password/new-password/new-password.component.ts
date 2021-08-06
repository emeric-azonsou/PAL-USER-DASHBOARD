import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Validators, FormBuilder, FormGroup, ValidationErrors } from "@angular/forms";
import icMail from "@iconify/icons-ic/twotone-mail";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthserviceService } from "src/app/services/authservice.service";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import icVisibility from "@iconify/icons-ic/twotone-visibility";
import icVisibilityOff from "@iconify/icons-ic/twotone-visibility-off";

@Component({
  selector: "vex-new-password",
  templateUrl: "./new-password.component.html",
  styleUrls: ["./new-password.component.scss"],
})
export class NewPasswordComponent implements OnInit {
  form: FormGroup;
  validationMessages = {
    password: {
      required: "password  is required.",
      pattern: "Minimum 6 characters required"
    },
    passwordConfirm: {
      required: "password  is required.",
    },
    passwordsDoNotMatch: " Passwords do not match"
  };
  icMail = icMail;
  isResetting: boolean;

  inputType = "password";
  visible = false;

  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;

  unsubscribe$ = new Subject();
  userID: any;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthserviceService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.userID = params["user_id"];
    });

    this.form = this.fb.group({
      password: ["", Validators.required],
      passwordConfirm: ["", Validators.required],
    },
    {
      validator: this.validatePasswords
    });
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

  validatePasswords(form: FormGroup): ValidationErrors {
    const password = form.value["password"];
    const confirmPassword = form.value["passwordConfirm"];
    if (confirmPassword === password) {
      return null;
    } else {
      return {
        passwordsDoNotMatch: true,
      };
    }
  }

  reset() {
    const data = {
      user_id: this.userID,
      password: this.form.value["password"],
    };
    this.isResetting = true;
    this.authService
      .updatePassword(data)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response) => {
        this.isResetting = false;
        if (response && response["status"] === true) {
          this.openSnackbar(response['message']);
          this.router.navigate(["/auth/login"]);
        }
      });
  }

  openSnackbar(message) {
    this.snackBar.open(message, 'CLOSE', {
      duration: 3000,
      horizontalPosition: 'center'
    });
  }
}
