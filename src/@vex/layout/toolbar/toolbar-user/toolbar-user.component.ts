import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { PopoverService } from "../../../components/popover/popover.service";
import { ToolbarUserDropdownComponent } from "./toolbar-user-dropdown/toolbar-user-dropdown.component";
import icPerson from "@iconify/icons-ic/twotone-person";
import { BUSINESS_DATA_KEY, USER_SESSION_KEY } from "../../../../app/Models/constants";
import { User } from "src/app/Models/models.interface";

@Component({
  selector: "vex-toolbar-user",
  templateUrl: "./toolbar-user.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarUserComponent implements OnInit {
  dropdownOpen: boolean;
  icPerson = icPerson;
  userData: User;
  userPhoto: string;
  userBusinessData: any;
  credentials: string;

  constructor(private popover: PopoverService, private cd: ChangeDetectorRef) {
    const sessionData = localStorage.getItem(USER_SESSION_KEY);
    this.userData = JSON.parse(sessionData);

    const businessData = localStorage.getItem(BUSINESS_DATA_KEY);
    if (businessData !== "undefined") {
      this.userBusinessData = JSON.parse(businessData);
      this.credentials = `${this.userBusinessData?.api_secret_key_live}:${this.userBusinessData?.api_public_key_live}`;
    }
  }

  ngOnInit() {
    const origin = window.location.origin;
    console.log(`type of logo is ${typeof this.userBusinessData.business_logo}`)
    if(this.userBusinessData.business_logo !== 'undefined') {
      const baseURL = origin.includes('sandbox') || origin.includes('localhost:4200') ? 'https://api-test.pals.africa' : 'https://api.pals.africa'
      this.userPhoto = `${baseURL}/public/uploads/company/business/${this.userBusinessData.business_logo}`;
    }
  }

  showPopover(originRef: HTMLElement) {
    this.dropdownOpen = true;
    this.cd.markForCheck();

    const popoverRef = this.popover.open({
      content: ToolbarUserDropdownComponent,
      origin: originRef,
      offsetY: 12,
      position: [
        {
          originX: "center",
          originY: "top",
          overlayX: "center",
          overlayY: "bottom",
        },
        {
          originX: "end",
          originY: "bottom",
          overlayX: "end",
          overlayY: "top",
        },
      ],
    });

    popoverRef.afterClosed$.subscribe(() => {
      this.dropdownOpen = false;
      this.cd.markForCheck();
    });
  }
}
