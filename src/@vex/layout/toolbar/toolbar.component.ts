import { Router } from "@angular/router";
import { DisburseCashComponent } from "./../../../app/pages/dashboards/disburse-cash/disburse-cash.component";
import { MatDialog } from "@angular/material/dialog";
import {
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  EventEmitter,
  HostListener,
  Output,
} from "@angular/core";
import { LayoutService } from "../../services/layout.service";
import icBookmarks from "@iconify/icons-ic/twotone-bookmarks";
import emojioneUS from "@iconify/icons-emojione/flag-for-flag-united-states";
import emojioneDE from "@iconify/icons-emojione/flag-for-flag-germany";
import icMenu from "@iconify/icons-ic/twotone-menu";
import { ConfigService } from "../../services/config.service";
import { map } from "rxjs/operators";
import icPersonAdd from "@iconify/icons-ic/twotone-person-add";
import icAssignmentTurnedIn from "@iconify/icons-ic/twotone-assignment-turned-in";
import icBallot from "@iconify/icons-ic/twotone-ballot";
import icDescription from "@iconify/icons-ic/twotone-description";
import icAssignment from "@iconify/icons-ic/twotone-assignment";
import icReceipt from "@iconify/icons-ic/twotone-receipt";
import icDoneAll from "@iconify/icons-ic/twotone-done-all";
import permIdentity from "@iconify/icons-ic/perm-identity";
import { NavigationService } from "../../services/navigation.service";
import icArrowDropDown from "@iconify/icons-ic/twotone-arrow-drop-down";
import { PopoverService } from "../../components/popover/popover.service";
import { MegaMenuComponent } from "../../components/mega-menu/mega-menu.component";
import icSearch from "@iconify/icons-ic/twotone-search";
import peopole from "@iconify/icons-ic/people-outline";
import { RechargeAccountComponent } from "src/app/pages/dashboards/recharge-account/recharge-account.component";
import { NoBusinessModalComponent } from "src/app/pages/dashboards/no-business-modal/no-business-modal.component";
import { BUSINESS_DATA_KEY, USER_SESSION_KEY } from "src/app/Models/constants";
import { MerchantData } from "src/app/Models/models.interface";

@Component({
  selector: "vex-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"],
})
export class ToolbarComponent implements OnInit {
  isOpen: boolean = false;
  isOpenDisbursePopup: boolean;
  currentPage: any;

  @Input() mobileQuery: boolean;

  @Input()
  @HostBinding("class.shadow-b")
  hasShadow: boolean;

  navigationItems = this.navigationService.items;

  isHorizontalLayout$ = this.configService.config$.pipe(
    map((config) => config.layout === "horizontal")
  );
  isVerticalLayout$ = this.configService.config$.pipe(
    map((config) => config.layout === "vertical")
  );
  isNavbarInToolbar$ = this.configService.config$.pipe(
    map((config) => config.navbar.position === "in-toolbar")
  );
  isNavbarBelowToolbar$ = this.configService.config$.pipe(
    map((config) => config.navbar.position === "below-toolbar")
  );

  icSearch = icSearch;
  icBookmarks = icBookmarks;
  emojioneUS = emojioneUS;
  emojioneDE = emojioneDE;
  icMenu = icMenu;
  icPersonAdd = icPersonAdd;
  icAssignmentTurnedIn = icAssignmentTurnedIn;
  icBallot = icBallot;
  icDescription = icDescription;
  icAssignment = icAssignment;
  icReceipt = icReceipt;
  icDoneAll = icDoneAll;
  perm_identity = permIdentity;
  icon_peapole = peopole;
  icArrowDropDown = icArrowDropDown;
  userBusinessData: any;
  userData: any;
  businessData: MerchantData;

  constructor(
    private layoutService: LayoutService,
    private configService: ConfigService,
    private navigationService: NavigationService,
    private popoverService: PopoverService,
    private dialog: MatDialog,
    private router: Router
  ) {
    const sessionData = localStorage.getItem(USER_SESSION_KEY);
    this.userData = JSON.parse(sessionData);
    const businessData = localStorage.getItem(BUSINESS_DATA_KEY);
    if (businessData !== "undefined") {
      this.businessData = JSON.parse(businessData);
    }
  }

  ngOnInit() { 
  }

  openQuickpanel() {
    this.layoutService.openQuickpanel();
  }

  openSidenav() {
    this.layoutService.openSidenav();
  }

  openMegaMenu(origin: ElementRef | HTMLElement) {
    this.popoverService.open({
      content: MegaMenuComponent,
      origin,
      position: [
        {
          originX: "start",
          originY: "bottom",
          overlayX: "start",
          overlayY: "top",
        },
        {
          originX: "end",
          originY: "bottom",
          overlayX: "end",
          overlayY: "top",
        },
      ],
    });
  }

  openSearch() {
    this.layoutService.openSearch();
  }
  openDisbursePopup() {
    if (this.userData.hasBusiness || !!this.businessData) {
      this.dialog.open(DisburseCashComponent);
      this.isOpenDisbursePopup = false;
    } else {
      this.dialog.open(NoBusinessModalComponent);
    }
  }

  openRechargePopup(): void {
    if (this.userData.hasBusiness || !!this.businessData) {
      this.dialog.open(RechargeAccountComponent);
    } else {
      this.dialog.open(NoBusinessModalComponent);
    }
  }

  onViewApiPart() {
    if (this.userData.hasBusiness || !!this.businessData) {
      this.router.navigate(["/dashboards/api"]);
    } else {
      this.dialog.open(NoBusinessModalComponent);
    }
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }
  toggleDisbursePopup() {
    this.isOpenDisbursePopup = !this.isOpenDisbursePopup;
  }

}
