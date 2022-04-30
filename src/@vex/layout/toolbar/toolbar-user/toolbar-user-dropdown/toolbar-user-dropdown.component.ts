import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { MenuItem } from "../interfaces/menu-item.interface";
import { trackById } from "../../../../utils/track-by";
import icPerson from "@iconify/icons-ic/twotone-person";
import icSettings from "@iconify/icons-ic/twotone-settings";
import icAccountCircle from "@iconify/icons-ic/twotone-account-circle";
import icMoveToInbox from "@iconify/icons-ic/twotone-move-to-inbox";
import icListAlt from "@iconify/icons-ic/twotone-list-alt";
import icTableChart from "@iconify/icons-ic/twotone-table-chart";
import icCheckCircle from "@iconify/icons-ic/twotone-check-circle";
import icAccessTime from "@iconify/icons-ic/twotone-access-time";
import icDoNotDisturb from "@iconify/icons-ic/twotone-do-not-disturb";
import icOfflineBolt from "@iconify/icons-ic/twotone-offline-bolt";
import icChevronRight from "@iconify/icons-ic/twotone-chevron-right";
import icArrowDropDown from "@iconify/icons-ic/twotone-arrow-drop-down";
import icBusiness from "@iconify/icons-ic/twotone-business";
import icVerifiedUser from "@iconify/icons-ic/twotone-verified-user";
import icLock from "@iconify/icons-ic/twotone-lock";
import icNotificationsOff from "@iconify/icons-ic/twotone-notifications-off";
import { Icon } from "@visurel/iconify-angular";
import { PopoverRef } from "../../../../components/popover/popover-ref";
import { USER_SESSION_KEY } from "src/app/Models/constants";
import { User } from "src/app/Models/models.interface";
import { Router } from "@angular/router";

export interface OnlineStatus {
  id: "online" | "away" | "dnd" | "offline";
  label: string;
  icon: Icon;
  colorClass: string;
}

@Component({
  selector: "vex-toolbar-user-dropdown",
  templateUrl: "./toolbar-user-dropdown.component.html",
  styleUrls: ["./toolbar-user-dropdown.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarUserDropdownComponent implements OnInit {
  items: MenuItem[] = [
    {
      id: "1",
      icon: icAccountCircle,
      label: "Business Settings",
      description: "",
      colorClass: "text-teal",
      route: "/dashboards/profile",
    },
  ];

  statuses: OnlineStatus[] = [
    {
      id: "online",
      label: "Online",
      icon: icCheckCircle,
      colorClass: "text-green",
    },
    {
      id: "away",
      label: "Away",
      icon: icAccessTime,
      colorClass: "text-orange",
    },
    {
      id: "dnd",
      label: "Do not disturb",
      icon: icDoNotDisturb,
      colorClass: "text-red",
    },
    {
      id: "offline",
      label: "Offline",
      icon: icOfflineBolt,
      colorClass: "text-gray",
    },
  ];

  activeStatus: OnlineStatus = this.statuses[0];

  trackById = trackById;
  icPerson = icPerson;
  icSettings = icSettings;
  icChevronRight = icChevronRight;
  icArrowDropDown = icArrowDropDown;
  icBusiness = icBusiness;
  icVerifiedUser = icVerifiedUser;
  icLock = icLock;
  icNotificationsOff = icNotificationsOff;
  userData: User;
  userPhoto: string;

  constructor(
    private cd: ChangeDetectorRef,
    private router: Router,
    private popoverRef: PopoverRef<ToolbarUserDropdownComponent>
  ) {
    const sessionData = localStorage.getItem(USER_SESSION_KEY);
    this.userData = JSON.parse(sessionData);
  }

  ngOnInit() {
    this.userPhoto = `https://api.pals.africa/api/public/uploads/users/${this.userData.photo}`;
  }

  setStatus(status: OnlineStatus) {
    this.activeStatus = status;
    this.cd.markForCheck();
  }

  close() {
    this.popoverRef.close();
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['auth/login']);
  }
}
