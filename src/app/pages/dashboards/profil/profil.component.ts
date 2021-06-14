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
import { FormControl } from "@angular/forms";
import { map, startWith } from "rxjs/operators";
import icMoreVert from "@iconify/icons-ic/twotone-more-vert";
import { fadeInUp400ms } from "../../../../@vex/animations/fade-in-up.animation";
import { stagger60ms } from "../../../../@vex/animations/stagger.animation";

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
      selectFileBtn: 'select profil photo',
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

 

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {}

  togglePassword() {
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

  onEdit(){
    console.log()
  }

 
}
