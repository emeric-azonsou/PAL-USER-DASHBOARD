import {
  Component,
  Inject,
  LOCALE_ID,
  Renderer2,
  ViewChild,
} from "@angular/core";
import { ConfigService } from "../@vex/services/config.service";
import { Settings } from "luxon";
import { DOCUMENT } from "@angular/common";
import { Platform } from "@angular/cdk/platform";
import { NavigationService } from "../@vex/services/navigation.service";
import icLayers from "@iconify/icons-ic/twotone-layers";
import icAssigment from "@iconify/icons-ic/twotone-assignment";
import icDateRange from "@iconify/icons-ic/twotone-date-range";

import { LayoutService } from "../@vex/services/layout.service";
import { ActivatedRoute, Router } from "@angular/router";
import { filter, map } from "rxjs/operators";
import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { SplashScreenService } from "../@vex/services/splash-screen.service";
import { Style, StyleService } from "../@vex/services/style.service";
import icChromeReaderMode from "@iconify/icons-ic/twotone-chrome-reader-mode";
import { ConfigName } from "../@vex/interfaces/config-name.model";
import icMail from "@iconify/icons-ic/twotone-mail";
import { USER_SESSION_KEY } from "./Models/constants";
import { Keepalive } from "@ng-idle/keepalive";
import { DEFAULT_INTERRUPTSOURCES, Idle } from "@ng-idle/core";
import { MatDialog } from "@angular/material/dialog";
import { AuthTimeoutModalComponent } from "./pages/dashboards/auth-timeout-modal/auth-timeout-modal.component";
import { AuthserviceService } from "./services/authservice.service";
import { ColorVariable, colorVariables } from "src/@vex/components/config-panel/color-variables";

@Component({
  selector: "vex-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "TransFlexmoney";
  idleState = "Not started.";
  timedOut = false;
  lastPing?: Date = null;
  colorVariables = colorVariables;

  selectedColor = colorVariables.pal;

  constructor(
    private idle: Idle,
    private dialog: MatDialog,
    private keepalive: Keepalive,
    private configService: ConfigService,
    private styleService: StyleService,
    private renderer: Renderer2,
    private platform: Platform,
    @Inject(DOCUMENT) private document: Document,
    @Inject(LOCALE_ID) private localeId: string,
    private layoutService: LayoutService,
    private route: ActivatedRoute,
    private router: Router,
    private navigationService: NavigationService,
    private splashScreenService: SplashScreenService,
    private authService: AuthserviceService
  ) {

    this.selectColor(this.selectedColor);
    // sets an idle timeout of 5 seconds, for testing purposes.
    idle.setIdle(1200);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(30);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => {
      this.idleState = "No longer idle.";
      console.info('[SESSION TIMEOUT]', this.idleState);
      this.reset();
    });

    idle.onTimeout.subscribe(() => {
      this.idleState = "Timed out!";
      this.timedOut = true;
      console.info('[SESSION TIMEOUT]', this.idleState);
      this.logout();
    });

    idle.onIdleStart.subscribe(() => {
      this.idleState = "You've gone idle!";
      console.info('[SESSION TIMEOUT]', this.idleState);
      this.dialog.open(AuthTimeoutModalComponent);
    });

    idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState = "You will time out in " + countdown + " seconds!";
      console.info('[SESSION TIMEOUT]', this.idleState);
    });

    // sets the ping interval to 15 seconds
    keepalive.interval(60);

    keepalive.onPing.subscribe(() => (this.lastPing = new Date()));

    this.reset();

    Settings.defaultLocale = this.localeId;
    const sessionData = localStorage.getItem(USER_SESSION_KEY);
    if (!sessionData) {
      router.navigate(["/auth/login"]);
    }

    if (this.platform.BLINK) {
      this.renderer.addClass(this.document.body, "is-blink");
    }

    /**
     * Customize the template to your needs with the ConfigService
     * Example:
     *  this.configService.updateConfig({
     *    sidenav: {
     *      title: 'Custom App',
     *      imageUrl: '//placehold.it/100x100',
     *      showCollapsePin: false
     *    },
     *    footer: {
     *      visible: false
     *    }
     *  });
     */

    /**
     * Config Related Subscriptions
     * You can remove this if you don't need the functionality of being able to enable specific configs with queryParams
     * Example: example.com/?layout=apollo&style=default
     */
    this.route.queryParamMap
      .pipe(
        filter((queryParamMap) => queryParamMap.has("rtl")),
        map((queryParamMap) => coerceBooleanProperty(queryParamMap.get("rtl")))
      )
      .subscribe((isRtl) => {
        this.configService.updateConfig({
          rtl: isRtl,
        });
      });

    this.route.queryParamMap
      .pipe(filter((queryParamMap) => queryParamMap.has("layout")))
      .subscribe((queryParamMap) =>
        this.configService.setConfig(queryParamMap.get("layout") as ConfigName)
      );

    this.route.queryParamMap
      .pipe(filter((queryParamMap) => queryParamMap.has("style")))
      .subscribe((queryParamMap) =>
        this.styleService.setStyle(queryParamMap.get("style") as Style)
      );

    /**
     * Add your own routes here
     */
    this.navigationService.items = [
      {
        type: "subheading",
        label: "Disburse cash in :",
        children: [
          {
            type: "link",
            label: "Benin",
            route: "/apps/calendar",
            icon: "../assets/contryFlg/Flag-Benin.png",
            badge: {
              value: "Active",
              bgClass: "",
              textClass: "",
            },
          },
          {
            type: "link",
            label: "Togo",
            route: "/apps/aio-table",
            icon: "../assets/contryFlg/1200px-Flag_of_Togo.svg.png",
          },

          {
            type: "link",
            label: "Ghana",
            route: "/apps/mail",
            icon: "../assets/contryFlg/1200px-Flag_of_Ghana.svg.png",
            badge: {
              value: "Active",
              bgClass: "",
              textClass: "",
            },
          },
          {
            type: "link",
            label: "Ivory Coast",
            route: "/apps/editor",
            icon: "../assets/contryFlg/cote-d-ivoire-flag-png-large.png",
          },
          {
            type: "link",
            label: "Senegal",
            route: "/apps/editor",
            icon: "../assets/contryFlg/senegal-flag-png-large.png",
          },
          {
            type: "link",
            label: "Niger",
            route: "/apps/editor",
            icon: "../assets/contryFlg/niger-flag-png-large.png",
          },
          {
            type: "link",
            label: "Mali",
            route: "/apps/editor",
            icon: "../assets/contryFlg/Flag-Mali.png",
          },
        ],
      },

      // {
      //   type: 'subheading',
      //   label: 'Customize',
      //   children: []
      // },
      // {
      //   type: 'link',
      //   label: 'Configuration',
      //   route: () => this.layoutService.openConfigpanel(),
      //   icon: icSettings
      // }
    ];
  }

  selectColor(color: ColorVariable) {
    this.selectedColor = color;
    if (this.document) {
      this.document.documentElement.style.setProperty('--color-primary', color.default.replace('rgb(', '').replace(')', ''));
      this.document.documentElement.style.setProperty('--color-primary-contrast', color.contrast.replace('rgb(', '').replace(')', ''));
    }
  }

  hideChildModal() {
    this.dialog.closeAll();
  }

  reset() {
    this.idle.watch();
    this.idleState = "Started.";
    this.timedOut = false;
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.dialog.closeAll();
    this.router.navigate(["/auth/login"]);
  }
}
