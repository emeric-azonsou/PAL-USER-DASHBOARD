import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'vex-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss']
})
export class Step1Component implements OnInit {

  form: FormGroup;

  inputType = 'password';
  visible = false;
  phoneNumberPattern = /^\d+$/;

  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;
  validationMessages = {
    fullName: {
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
    },
    passwordsDoNotMatch: 'The 2 passwords do no match'
  };
  processedPhoneNo: any;
  prefixCountryCode: any;
  isCorrectPhoneEntry: boolean;
  locationData: any;
  countryData: { preferredCountries: string[]; localizedCountries: { ng: string; gh: string; }; onlyCountries: string[]; };
  waitingDisplayInput: boolean;

  constructor(private router: Router,
              private fb: FormBuilder,
              private cd: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
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

  send() {
      let userProfilInformation = {
      full_name: this.form.value["fullName"],
      email: this.form.value["email"],
      password: this.form.value['password'],
    };
    this.saveUserData(userProfilInformation);
  }

  saveUserData(userProfilInformation) {
      sessionStorage.setItem(
        'step1RegData',
        JSON.stringify(userProfilInformation)
      );
      this.router.navigate(["/auth/register/step2"]);
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
