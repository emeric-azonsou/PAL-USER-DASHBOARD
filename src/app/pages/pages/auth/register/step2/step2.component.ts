import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import icVisibility from "@iconify/icons-ic/twotone-visibility";
import icVisibilityOff from "@iconify/icons-ic/twotone-visibility-off";
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { GeoLocationService } from "src/app/services/geo-location.service";
import { AuthserviceService } from "src/app/services/authservice.service";
import { take, takeUntil } from "rxjs/operators";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MailComposeComponent } from "../../../../apps/mail/components/mail-compose/mail-compose.component";

@Component({
  selector: "vex-step2",
  templateUrl: "./step2.component.html",
  styleUrls: ["./step2.component.scss"],
})
export class Step2Component implements OnInit {

  form: FormGroup;

  inputType = 'password';
  visible = false;

  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;
  validationMessages = {
    lastName: {
      required: "Full Name  is required.",
      pattern: "Only characters allowed",
    },
    firstName: {
      required: "Full Name  is required.",
      pattern: "Only characters allowed",
    },
    password: {
      required: "password  is required.",
      pattern: "Minimum 6 characters required"
    },
    passwordConfirm: {
      required: "password  is required.",
    },
    email: {
      required: "Email  is required.",
      email: "Please enter a valid email",
      notBusinessEmail: "Please only use your business email"
    },
    passwordsDoNotMatch: 'The 2 passwords do no match'
  };
  processedPhoneNo: any;
  prefixCountryCode: any;
  isCorrectPhoneEntry: boolean;
  locationData: any;
  countryData: { preferredCountries: string[]; localizedCountries: { ng: string; gh: string; }; onlyCountries: string[]; };
  waitingDisplayInput: boolean;
  step1data: any;
  isLoadingButton: boolean;
  isButtonActive: boolean;
  errorMessage: string;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private authService: AuthserviceService,
  ) {
    const step1Data = sessionStorage.getItem("step1RegData");
    if (!!step1Data) {
      this.step1data = JSON.parse(step1Data);
    } else {
      router.navigate(["auth/register/step1"]);
    }
  }

  ngOnInit() {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, this.validateBusinessEmail]],
      password: ['', [Validators.required, Validators.pattern(/^.{6,}$/)]],
      passwordConfirm: ['', Validators.required],
    },
    {
      validator: this.validatePasswords
    });
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

  validateBusinessEmail(email: FormControl) {
    if(email.value.includes('gmail') || email.value.includes('hotmail') || email.value.includes('yahoo')) {
      return {
        notBusinessEmail: true,
      }
    } else {
      return null
    }
  }

  register() {
    let userData = {
      ...this.step1data,
      first_name: this.form.value["firstName"],
      last_name: this.form.value["lastName"],
      email: this.form.value["email"],
      password: this.form.value['password'],
    };
    this.authService
      .registerPalUser(userData)
      .pipe(take(1))
      .subscribe((response:any) => {
        if(response?.user_id) {
          this.isLoadingButton = false;
          this.isButtonActive = true;
          this.router.navigate(["/auth/login"]);
          // setTimeout(() => {
          //   this.router.navigate(["/auth/login"]);
          //   this.openCompose();
          // }, 3000);
        } else {
          this.errorMessage = 'Something went wrong please try again';
          this.isLoadingButton = false;
          this.isButtonActive = true;
        }
      });
  }


  toggleVisibility() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }

}
