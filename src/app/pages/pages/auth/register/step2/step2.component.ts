import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GeoLocationService } from 'src/app/services/geo-location.service';
import { AuthserviceService } from 'src/app/services/authservice.service';
import { take, takeUntil } from 'rxjs/operators';


@Component({
  selector: 'vex-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss']
})
export class Step2Component implements OnInit {

  form: FormGroup;
  phoneNumberPattern = /^\d+$/;
  inputType = 'password';
  visible = false;
  step1data: any;
  processedPhoneNo: any;
  prefixCountryCode: any;
  isCorrectPhoneEntry: boolean;
  locationData: any;
  countryData: { preferredCountries: string[]; localizedCountries: { ng: string; gh: string; }; onlyCountries: string[]; };
  waitingDisplayInput: boolean;
  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;
  isValidCountry: boolean;
  isButtonActive: boolean;
  isLoadingButton: boolean;
  errorMessage: string;
  validationMessages = {
    companyName: {
      required: "First name  is required.",
    },
    description: {
      required: "Description is required",
    },
    country: {
      required: "Country is required",
      pattern: "Please enter a valid Country name",
    },
    phoneNumber: {
      required: "Email  is required.",
      email: "Please enter a valid email",
    }
  };
  constructor(private router: Router,
              private fb: FormBuilder,
              private cd: ChangeDetectorRef,
              private geoLocationService: GeoLocationService,
              private authService: AuthserviceService
  ) {
    const step1Data = sessionStorage.getItem('step1RegData');
    if (!!step1Data) {
      this.step1data = JSON.parse(step1Data);
    } else {
      router.navigate(['auth/register/step1']);
    }
  }

  ngOnInit() {
    this.form = this.fb.group({
      phoneNumber: ['', Validators.required],
      companyName: ['', Validators.required],
      country: ['', Validators.required],
      description: ['', Validators.required],
      terms: ['', Validators.required],
    });

    this.getLocationData();
  }

  
  getLocationData() {
    new Promise((resolve) => {
      this.geoLocationService.getLocation().subscribe((data) => {
        resolve((this.locationData = data));
      });
    })
      .then(() => {
        if (!this.locationData) {
          this.waitingDisplayInput = false;
        } else {
          this.waitingDisplayInput = true;
          this.countryData = {
            preferredCountries: [`${this.locationData}`],
            localizedCountries: { ng: "Nigeria", gh: "Ghana" },
            onlyCountries: ["GH", "NG"],
          };
        }
      })
      .then(() => {
        if (
          this.locationData.country_code === "GH" ||
          this.locationData.country_code === "NG"
        ) {
          this.prefixCountryCode = this.locationData.country_calling_code;
          this.isValidCountry = false;
        } else {
          this.isValidCountry = true;
          this.prefixCountryCode = "+233";
        }
      });
  }

  processPhoneNumber() {
    let rawPhoneNumber = this.form.value["phoneNumber"];

    let phoneNumberWithoutSpace = rawPhoneNumber.split(/\s/).join("");
    if (phoneNumberWithoutSpace.match(this.phoneNumberPattern)) {
      if (phoneNumberWithoutSpace.charAt(0) === "0") {
        this.isCorrectPhoneEntry = true;
        this.processedPhoneNo =
          this.prefixCountryCode + phoneNumberWithoutSpace.substr(1);
      } else {
        this.isCorrectPhoneEntry = true;
        this.processedPhoneNo = this.prefixCountryCode + phoneNumberWithoutSpace;
      }
    } else {
      this.isCorrectPhoneEntry = false;
    }
  }
  
  
  register() {
    this.processPhoneNumber();

    let userData = {
      ...this.step1data,
      country: this.form.value['country'],
      company_name: this.form.value['companyName'],
      description: this.form.value['description'],
      phone_no: this.processedPhoneNo,
    };
    this.authService
      .registerPalUser(userData)
      .pipe(take(1))
      .subscribe((response) => {
        if(response?.status === true) {
          this.isLoadingButton = false;
          this.isButtonActive = true;
          setTimeout(() => {
            this.router.navigate(["/auth/login"]);
          }, 3000);
        } else {
          this.errorMessage = 'Something went wrong please try again';
          this.isLoadingButton = false;
          this.isButtonActive = true;
        }
      });
  }
}
