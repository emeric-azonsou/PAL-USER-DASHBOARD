import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MailComposeComponent } from '../../../../apps/mail/components/mail-compose/mail-compose.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthserviceService } from 'src/app/services/authservice.service';
import { COUNTRIES, GeoLocationService } from 'src/app/services/geo-location.service';
import { take } from 'rxjs/operators';



@Component({
  selector: 'vex-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss']
})
export class Step1Component implements OnInit {
  form: FormGroup;
  phoneNumberPattern = /^\d+$/;
  inputType = "password";
  visible = false;
  step1data: any;
  processedPhoneNo: any;
  prefixCountryCode: any;
  isCorrectPhoneEntry: boolean;
  locationData: any;
  countryData: {
    preferredCountries: string[];
    localizedCountries: { ng: string; gh: string };
    onlyCountries: string[];
  };
  waitingDisplayInput: boolean;
  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;
  isValidCountry: boolean;
  isButtonActive: boolean;
  isLoadingButton: boolean;
  errorMessage: string;
  countries = COUNTRIES;
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
      required: "Phone number  is required.",
      pattern: "Please enter a valid phone number",
    },
  };


  constructor(private router: Router,
              private fb: FormBuilder,
              private cd: ChangeDetectorRef,
              private dialog: MatDialog,
              private geoLocationService: GeoLocationService,
              private authService: AuthserviceService,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      phoneNumber: ['', [Validators.required, Validators.pattern(this.phoneNumberPattern)] ],
      // companyName: ['', Validators.required],
      country: ['', Validators.required],
      // description: ['', Validators.required],
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
           this.prefixCountryCode=this.locationData.country_calling_code;
      })

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

 
  openCompose() {
    this.dialog.open(MailComposeComponent, {
      width: "100%",
      maxWidth: 700,
    });
  }

  send() {
    this.processPhoneNumber()
    //  le flow de l'auth en deux en deux etape n'est plus valide Yoan. Le signin est seulement  en 1 step//
  
        const userProfilInformation = {
          mobile_phone: this.processedPhoneNo,
          country_code: this.form.value['country'],
          dailing_code : this.prefixCountryCode
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

}
