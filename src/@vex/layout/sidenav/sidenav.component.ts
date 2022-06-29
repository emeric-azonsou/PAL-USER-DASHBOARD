import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { trackByRoute } from '../../utils/track-by';
import { NavigationService } from '../../services/navigation.service';
import icRadioButtonChecked from '@iconify/icons-ic/twotone-radio-button-checked';
import icRadioButtonUnchecked from '@iconify/icons-ic/twotone-radio-button-unchecked';
import { LayoutService } from '../../services/layout.service';
import { ConfigService } from '../../services/config.service';
import { map, takeUntil } from 'rxjs/operators';
import icHome from '@iconify/icons-ic/twotone-home';
import icReport from '@iconify/icons-ic/twotone-report';
import icAttachMoney from '@iconify/icons-ic/twotone-attach-money';
import icAssignment from '@iconify/icons-ic/twotone-assignment';
import icChart from '@iconify/icons-ic/twotone-add-chart';
import icAnalytics from '@iconify/icons-ic/twotone-analytics';
import icWallet from '@iconify/icons-ic/twotone-account-balance-wallet';
import icBalance from '@iconify/icons-ic/twotone-account-balance';
import icArrowDown from '@iconify/icons-ic/twotone-arrow-circle-down';
import icArrowUp from '@iconify/icons-ic/twotone-arrow-circle-up';
import { BUSINESS_DATA_KEY, SUMMARY_DATA_KEY, USER_SESSION_KEY } from 'src/app/Models/constants';
import { Router } from '@angular/router';
import { BusinessService } from 'src/app/services/business.service';
import { Subject } from 'rxjs';
import { MerchantData, User } from 'src/app/Models/models.interface';
import { MatDialog } from '@angular/material/dialog';
import { NoBusinessModalComponent } from 'src/app/pages/dashboards/no-business-modal/no-business-modal.component';


@Component({
  selector: 'vex-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {

  @Input() collapsed: boolean;
  collapsedOpen$ = this.layoutService.sidenavCollapsedOpen$;
  title$ = this.configService.config$.pipe(map(config => config.sidenav.title));
  imageUrl$ = this.configService.config$.pipe(map(config => config.sidenav.imageUrl));
  showCollapsePin$ = this.configService.config$.pipe(map(config => config.sidenav.showCollapsePin));

  items = this.navigationService.items;
  trackByRoute = trackByRoute;
  icRadioButtonChecked = icRadioButtonChecked;
  icRadioButtonUnchecked = icRadioButtonUnchecked;
  icHome= icHome;
  icWallet = icWallet;
  icReport = icReport;
  icChart = icChart;
  icAttachMoney= icAttachMoney;
  icAnalytics = icAnalytics;
  icAssignment= icAssignment;
  icBalance = icBalance;
  icArrowDown = icArrowDown;
  icArrowUp = icArrowUp;
  userData: any;
  businessUserData: any;
  hasBusinessRegistered: boolean;
  unsubscribe$ = new Subject();
  businessData: MerchantData;
  



  constructor(private navigationService: NavigationService,
              private layoutService: LayoutService,
              private configService: ConfigService,
              private router: Router,
              private businessService: BusinessService,
              private dialog: MatDialog
              ) { 
                const sessionData = localStorage.getItem(USER_SESSION_KEY);
                this.userData = JSON.parse(sessionData);
                // const businessData = localStorage.getItem(BUSINESS_DATA_KEY);
                // this.businessUserData = JSON.parse(businessData);
              }

  ngOnInit() {

    this.getUserBusinessData(this.userData.user_id);
    this.getUserBusinessSummary(this.userData.user_id);

   
    
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onMouseEnter() {
    this.layoutService.collapseOpenSidenav();
  }

  onMouseLeave() {
    this.layoutService.collapseCloseSidenav();
  }

  toggleCollapse() {
    this.collapsed ? this.layoutService.expandSidenav() : this.layoutService.collapseSidenav();
  }

  getUserBusinessData(userID) {
    this.businessService.getBusinessDetails(userID)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(data => {
      this.businessUserData = data;
      this.hasBusinessRegistered = !!this.businessUserData;

      localStorage.setItem(BUSINESS_DATA_KEY, JSON.stringify(this.businessUserData));
    })
  }

  getUserBusinessSummary(userID) {
    this.businessService.getBusinessSummary(userID)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(data => {
      const response = JSON.stringify(data);
      localStorage.setItem(SUMMARY_DATA_KEY, response);
    })
  }

  onViewApiPart() {
    if (this.userData.hasBusiness || !!this.businessData) {
      this.router.navigate(["/dashboards/api"]);
    } else {
      this.dialog.open(NoBusinessModalComponent);
    }
  }

}
