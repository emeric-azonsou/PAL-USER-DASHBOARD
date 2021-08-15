import icEdit  from '@iconify/icons-ic/twotone-edit';
import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import icVisibility from "@iconify/icons-ic/twotone-visibility";
import icVisibilityOff from "@iconify/icons-ic/twotone-visibility-off";
import icSmartphone from "@iconify/icons-ic/twotone-smartphone";
import icPerson from "@iconify/icons-ic/twotone-person";
import icArrowDropDown from "@iconify/icons-ic/twotone-arrow-drop-down";
import icMenu from "@iconify/icons-ic/twotone-menu";
import icCamera from "@iconify/icons-ic/twotone-camera";
import icPhone from "@iconify/icons-ic/twotone-phone";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { map, startWith, takeUntil } from "rxjs/operators";
import icMoreVert from "@iconify/icons-ic/twotone-more-vert";
import { fadeInUp400ms } from "../../../../@vex/animations/fade-in-up.animation";
import { stagger60ms } from "../../../../@vex/animations/stagger.animation";
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { COUNTRIES, NATIONALITIES, CATEGORIES, INDUSTRIES, BUSINESS_DATA_KEY, USER_SESSION_KEY } from 'src/app/Models/constants';
import { BusinessService } from 'src/app/services/business.service';
import { GeoLocationService } from 'src/app/services/geo-location.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface CountryState {
  name: string;
  population: string;
  flag: string;
}
@Component({
  selector: "vex-profil",
  templateUrl: "./profil.component.html",
  styleUrls: ["./profil.component.scss"],
})
export class ProfilComponent implements OnInit {
  panelOpenState = false;
  businessLogoName: string;
  idTypes = ["passport", "Identity Card", "Driving License"];
  isLegallyRegistered: boolean;

  businessForm: FormGroup;
  bsnessInfoForm: FormGroup;
  bsnessInfoInputStatus = {
    trading_name: "",
    business_name: "",
    description: "",
    industry: "",
    business_email: "",
    business_phone: "",
    delivery_no: "",
  };
  businessInformation: Object;
  business_email: string;
  emailAdssRegex = /\S+@\S+\.\S+/;

  alertBusinessLogo: boolean;
  businessLogo: File;
  locationData: any;
  countryData: any;
  waitingDisplayInput: boolean;
  prefixCountryCode: any;
  isValidCountry: Boolean;
  businessPhoneNumber: string;
  deliveryPhoneNumber: string;
  bsnessAdressForm: FormGroup;
  bsnessAdressInputStatus = {
    country: "",
    region: "",
    city: "",
    streetAddress: "",
  };
  bsnessOwnerForm: FormGroup;
  businessOwnerInformation: Object;
  bsnessOwnerInputStatus = {
    owner_lname: "",
    owner_fname: "",
    dob: "",
    nationality: "",
    owner_adresse: "",
    identification_document: "",
    is_legally_registered: "",
    business_legal_name: "",
    company_documents: "",
  };
  companyDocuments;
  idDocumentFile: File;
  companyDocumentFile: File;
  companyLogoFile: File;
  unsubscribe$ = new Subject();
  errorMessage: string;

  isIdUpload: boolean;
  isCdUpload: boolean;
  idUploadMessge = "Upload or drop";
  isCdUploadMessge = "Upload or drop";
  rawDate = "";
  dateFormated = "";
  isLegalFomDisplay: boolean;
  // isLegallyRegistered = "";
  countries = COUNTRIES;
  nationalities = NATIONALITIES;
  categories = CATEGORIES;
  industries = INDUSTRIES;
  selectedFiles: FileList;
  isBusinessSubmitted = false;
  nameValidationPattern = /^[a-zA-Z0-9-\s]{0,25}$/;
  cityValidationPattern = /^[a-zA-Z-'\s]{0,25}$/;
  phoneNumberValidationPattern = /^[0-9]{0,15}$/;

  allCreatBusinessData: object;
  userData: any;

  validationMessages = {
    country: {
      required: "This Field  is required.",
    },
    business_address: {
      required: "This Field  is required.",
    },
    description:{
      required: "This Field  is required.",
    },
    industry: {
      required: "This Field  is required.",
    },
    business_email:{
      required: "This Field  is required.",
      email: "Please enter a valid email",
    },
    business_phone: {
      required: "This Field  is required.",
      pattern: "Only digits allowed",
    },
    staff_size:{
      required: "This Field  is required.",
      pattern: "Only digits allowed",
    },
    owner_full_name: {
      required: "This Field  is required.",
      pattern: "Only characters allowed",
    },
    dob: {
      required: "This Field  is required.",
    },
    nationality: {
      required: "This Field  is required.",
    },
    owner_address:{
      required: "This Field  is required.",
    },
    id_type: {
      required: "This Field  is required.",
    }
  };
  
  selectCtrl: FormControl = new FormControl();
  inputType = "password";
  visible = false;

  afuConfig = {
    uploadAPI: {
      url:"https://example-file-upload-api"
    },
    hideResetBtn: true,
};

  profilPhotoConfig={
    uploadAPI: {
      url:"https://example-file-upload-api"
    },
    formatsAllowed: ".jpg,.png",
   
    hideResetBtn: true,
    replaceTexts: {
      selectFileBtn: 'select profile photo',
    }
    
  }

  icPhone = icPhone;
  icCamera = icCamera;
  icMenu = icMenu;
  icArrowDropDown = icArrowDropDown;
  icSmartphone = icSmartphone;
  icPerson = icPerson;
  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;
  icMoreVert = icMoreVert;
  icEdit=icEdit;

  stateCtrl = new FormControl();

 

  constructor(
    private cd: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private router: Router,
    private businessService: BusinessService,
    private geoLocationService: GeoLocationService,
    private snackBar: MatSnackBar
    ) {
      const sessionData = localStorage.getItem(USER_SESSION_KEY);
      this.userData = JSON.parse(sessionData);
    }

 
    ngOnInit() {
      this.businessForm = this.formBuilder.group({
        country: ["", Validators.required],
        business_address: ["", Validators.required],
        // trading_name: ["", Validators.required],
        description: ["", Validators.required],
        industry: ["", Validators.required],
        // category: ["", Validators.required],
        // business_email: ["", [Validators.required, Validators.email]],
        business_phone: [
          "",
          [
            Validators.required,
            Validators.pattern(this.phoneNumberValidationPattern),
          ],
        ],
        delivery_no: [
          "",
          [
            Validators.required,
            Validators.pattern(this.phoneNumberValidationPattern),
          ],
        ],
        owner_full_name: ["", Validators.required],
        dob: ["", Validators.required],
        nationality: ["", Validators.required],
        owner_address: ["", Validators.required],
        id_type: ["", Validators.required],
        id_proof_path: [""],
        company_documents: [""],
        business_legal_name: [""],
        company_documentUpload: [""],
        business_logo: [""],
        staff_size: [''],
        website:['']
      });
      // this.businessPhoneInputStyl();
      // this.deliveryManInputStyl();
      this.getLocationData();
    }
  
    uploadCompanyDoc(event) {
      this.companyDocumentFile = event.target.files[0];
    }
  
    getProcessedphoneNumber(phoneNumber) {
      let rawPhoneNumber = phoneNumber;
      let phoneNumberWithoutSpace = rawPhoneNumber.split(/\s/).join("");
      const processedPhoneNumber = this.prefixCountryCode + phoneNumberWithoutSpace.substr(1);
      return processedPhoneNumber;
    }
  
    uploadID(event) {
      this.idDocumentFile = event.target.files[0];
    }
  
    uploadCompanyLogo(event) {
      this.companyLogoFile = event.target.files[0];
    }
  
    addBusiness() {
      console.log('[fomrValue]', this.businessForm.value);
      this.isBusinessSubmitted = true;
      const businessData = this.businessForm.value;
      businessData.id_proof_path = this.idDocumentFile || "";
      businessData.company_documentUpload = this.companyDocumentFile || "";
      businessData.business_logo = this.companyLogoFile
      businessData.user_id = this.userData.user_id;
      businessData.business_email = this.userData.email
      businessData.business_phone = this.getProcessedphoneNumber(this.businessForm.value['business_phone']);
      this.businessService
        .createNewBusiness(businessData)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((response: any) => {
          if ((response.status = true && response.data)) {
            this.openSnackbar(response['message']);
            localStorage.setItem(BUSINESS_DATA_KEY, JSON.stringify(response.data));
            this.router.navigate(['/dashboards/home']);
            window.location.reload();
          } else {
            this.errorMessage = response.message || "something went wrong";
            this.isBusinessSubmitted = false;
          }
        });
      return null;
    }
  
    getBusinessLogo(File) {
      this.businessLogo = File.item(0);
    }

    openSnackbar(message) {
      this.snackBar.open(message, 'CLOSE', {
        duration: 3000,
        horizontalPosition: 'right'
      });
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
  
    // businessPhoneInputStyl() {
    //   document
    //     .getElementsByTagName("input")[4]
    //     .setAttribute(
    //       "style",
    //       "border-radius:6px; opacity: 1;width: 476px;border-color:blue"
    //     );
    // }
    // deliveryManInputStyl() {
    //   document
    //     .getElementsByTagName("input")[5]
    //     .setAttribute(
    //       "style",
    //       "border-radius:6px; opacity: 1;width: 476px;border-color:blue"
    //     );
    // }
  
    onSelectIdocument(file: File) {
      this.idDocumentFile = file;
      this.idUploadMessge = this.idDocumentFile["name"];
    }
  
    onSelectCompanyDocuments(file: File) {
      this.companyDocuments = file;
      this.isCdUploadMessge = this.idDocumentFile["name"];
    }
  
    // processingData(businessOwnerInformation) {
    //   if (this.isLegallyRegistered === "NO") {
    //     businessOwnerInformation.business_legal_name = "null";
    //     this.companyDocuments = "null";
    //   }
  
    //   this.isIdUpload = this.businessOwnerInformation[
    //     "identification_documentUpload"
    //   ]
    //     ? false
    //     : true;
    //   this.isCdUpload = this.businessOwnerInformation["company_documentUpload"]
    //     ? false
    //     : true;
    // }
  
    bsnssRegiStatus(data) {
      if (data.value == "YES") {
        this.isLegallyRegistered = true;
      } else {
        this.isLegallyRegistered = false;
      }
    }

 
}
