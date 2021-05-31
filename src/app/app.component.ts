import { Component, Inject, LOCALE_ID, Renderer2 } from "@angular/core";
import { ConfigService } from "../@vex/services/config.service";
import { Settings } from "luxon";
import { DOCUMENT } from "@angular/common";
import { Platform } from "@angular/cdk/platform";
import { NavigationService } from "../@vex/services/navigation.service";
import icLayers from "@iconify/icons-ic/twotone-layers";
import icAssigment from "@iconify/icons-ic/twotone-assignment";
import icDateRange from "@iconify/icons-ic/twotone-date-range";

import { LayoutService } from "../@vex/services/layout.service";
import { ActivatedRoute } from "@angular/router";
import { filter, map } from "rxjs/operators";
import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { SplashScreenService } from "../@vex/services/splash-screen.service";
import { Style, StyleService } from "../@vex/services/style.service";
import icChromeReaderMode from "@iconify/icons-ic/twotone-chrome-reader-mode";
import { ConfigName } from "../@vex/interfaces/config-name.model";
import icMail from "@iconify/icons-ic/twotone-mail";

@Component({
  selector: "vex-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "TransFlexmoney";

  constructor(
    private configService: ConfigService,
    private styleService: StyleService,
    private renderer: Renderer2,
    private platform: Platform,
    @Inject(DOCUMENT) private document: Document,
    @Inject(LOCALE_ID) private localeId: string,
    private layoutService: LayoutService,
    private route: ActivatedRoute,
    private navigationService: NavigationService,
    private splashScreenService: SplashScreenService
  ) {
    Settings.defaultLocale = this.localeId;

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
          },
          {
            type: "link",
            label: "Ivory Cost",
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
}
