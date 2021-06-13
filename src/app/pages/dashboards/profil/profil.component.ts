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

  stateCtrl = new FormControl();
  states: CountryState[] = [
    {
      name: "Arkansas",
      population: "2.978M",
      // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
      flag: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg",
    },
    {
      name: "California",
      population: "39.14M",
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      flag: "https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg",
    },
    {
      name: "Florida",
      population: "20.27M",
      // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
      flag: "https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg",
    },
    {
      name: "Texas",
      population: "27.47M",
      // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
      flag: "https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg",
    },
  ];
  filteredStates$ = this.stateCtrl.valueChanges.pipe(
    startWith(""),
    map((state) => (state ? this.filterStates(state) : this.states.slice()))
  );

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

  filterStates(name: string) {
    return this.states.filter(
      (state) => state.name.toLowerCase().indexOf(name.toLowerCase()) === 0
    );
  }
}
