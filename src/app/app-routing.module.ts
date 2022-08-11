import { ApiComponent } from './pages/dashboards/api/api.component';
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CustomLayoutComponent } from "./custom-layout/custom-layout.component";
import { VexRoutes } from "../@vex/interfaces/vex-route.interface";
import { QuicklinkModule, QuicklinkStrategy } from "ngx-quicklink";
import { HomeComponent } from "./pages/dashboards/home/home.component";
import { TopUpTransactionComponent } from "./pages/dashboards/top-up-transaction/top-up-transaction.component";
import { ProfilComponent } from "./pages/dashboards/profil/profil.component";
import { TransactionsComponent } from './pages/dashboards/transactions/transactions.component';
import { ReportsComponent } from './pages/dashboards/reports/reports.component';
import { DashboardAnalyticsComponent } from './pages/dashboards/dashboard-analytics/dashboard-analytics.component';
import { CollectionsReportComponent } from './pages/dashboards/reports/collections-report/collections-report.component';

const routes: VexRoutes = [
  {
    path: "",
    redirectTo: "auth/login",
    pathMatch: "full",
  },

  {
    path: "auth",
    children: [
      {
        path: "login",
        loadChildren: () =>
          import("./pages/pages/auth/login/login.module").then(
            (m) => m.LoginModule
          ),
      },
      {
        path: "register",
        loadChildren: () =>
          import("./pages/pages/auth/register/register.module").then(
            (m) => m.RegisterModule
          ),
      },
      {
        path: "forgot-password",
        loadChildren: () =>
          import(
            "./pages/pages/auth/forgot-password/forgot-password.module"
          ).then((m) => m.ForgotPasswordModule),
      },
    ],
  },

  {
    path: "login",
    loadChildren: () =>
      import("./pages/pages/auth/login/login.module").then(
        (m) => m.LoginModule
      ),
  },
  {
    path: "register",
    loadChildren: () =>
      import("./pages/pages/auth/register/register.module").then(
        (m) => m.RegisterModule
      ),
  },
  {
    path: "forgot-password",
    loadChildren: () =>
      import("./pages/pages/auth/forgot-password/forgot-password.module").then(
        (m) => m.ForgotPasswordModule
      ),
  },
  {
    path: "coming-soon",
    loadChildren: () =>
      import("./pages/pages/coming-soon/coming-soon.module").then(
        (m) => m.ComingSoonModule
      ),
  },

  {
    path: "dashboards",
    component: CustomLayoutComponent,
    children: [
      {
        path: "analytics",
        component: DashboardAnalyticsComponent,
      },
      {
        path: "home",
        component: HomeComponent,
      },
      {
        path: "balance",
        component: TopUpTransactionComponent,
      },
      {
        path: "cash-out-transactions",
        component: ReportsComponent,
      },
      {
        path: "cash-in-transactions",
        component: CollectionsReportComponent,
      },
      {
        path: "profile",
        component: ProfilComponent,
      },
      {
        path:'api',
        component:ApiComponent
      },
      {
        path: "",
        loadChildren: () =>
          import(
            "./pages/dashboards/dashboard-analytics/dashboard-analytics.module"
          ).then((m) => m.DashboardAnalyticsModule),
      },
      {
        path: "apps",
        children: [
          {
            path: "chat",
            loadChildren: () =>
              import("./pages/apps/chat/chat.module").then((m) => m.ChatModule),
            data: {
              toolbarShadowEnabled: true,
            },
          },
          {
            path: "mail",
            loadChildren: () =>
              import("./pages/apps/mail/mail.module").then((m) => m.MailModule),
            data: {
              toolbarShadowEnabled: true,
              scrollDisabled: true,
            },
          },
          {
            path: "social",
            loadChildren: () =>
              import("./pages/apps/social/social.module").then(
                (m) => m.SocialModule
              ),
          },
          {
            path: "contacts",
            loadChildren: () =>
              import("./pages/apps/contacts/contacts.module").then(
                (m) => m.ContactsModule
              ),
          },
          {
            path: "calendar",
            loadChildren: () =>
              import("./pages/apps/calendar/calendar.module").then(
                (m) => m.CalendarModule
              ),
            data: {
              toolbarShadowEnabled: true,
            },
          },
          {
            path: "aio-table",
            loadChildren: () =>
              import("./pages/apps/aio-table/aio-table.module").then(
                (m) => m.AioTableModule
              ),
          },
          {
            path: "help-center",
            loadChildren: () =>
              import("./pages/apps/help-center/help-center.module").then(
                (m) => m.HelpCenterModule
              ),
          },
          {
            path: "scrumboard",
            loadChildren: () =>
              import("./pages/apps/scrumboard/scrumboard.module").then(
                (m) => m.ScrumboardModule
              ),
          },
          {
            path: "editor",
            loadChildren: () =>
              import("./pages/apps/editor/editor.module").then(
                (m) => m.EditorModule
              ),
          },
        ],
      },
      {
        path: "pages",
        children: [
          {
            path: "pricing",
            loadChildren: () =>
              import("./pages/pages/pricing/pricing.module").then(
                (m) => m.PricingModule
              ),
          },
          {
            path: "faq",
            loadChildren: () =>
              import("./pages/pages/faq/faq.module").then((m) => m.FaqModule),
          },
          {
            path: "guides",
            loadChildren: () =>
              import("./pages/pages/guides/guides.module").then(
                (m) => m.GuidesModule
              ),
          },
          {
            path: "invoice",
            loadChildren: () =>
              import("./pages/pages/invoice/invoice.module").then(
                (m) => m.InvoiceModule
              ),
          },
          {
            path: "error-404",
            loadChildren: () =>
              import("./pages/pages/errors/error-404/error-404.module").then(
                (m) => m.Error404Module
              ),
          },
          {
            path: "error-500",
            loadChildren: () =>
              import("./pages/pages/errors/error-500/error-500.module").then(
                (m) => m.Error500Module
              ),
          },
        ],
      },
      {
        path: "ui",
        children: [
          {
            path: "components",
            loadChildren: () =>
              import("./pages/ui/components/components.module").then(
                (m) => m.ComponentsModule
              ),
          },
          {
            path: "forms/form-elements",
            loadChildren: () =>
              import(
                "./pages/ui/forms/form-elements/form-elements.module"
              ).then((m) => m.FormElementsModule),
            data: {
              containerEnabled: true,
            },
          },
          {
            path: "forms/form-wizard",
            loadChildren: () =>
              import("./pages/ui/forms/form-wizard/form-wizard.module").then(
                (m) => m.FormWizardModule
              ),
            data: {
              containerEnabled: true,
            },
          },
          {
            path: "icons",
            loadChildren: () =>
              import("./pages/ui/icons/icons.module").then(
                (m) => m.IconsModule
              ),
          },
          {
            path: "page-layouts",
            loadChildren: () =>
              import("./pages/ui/page-layouts/page-layouts.module").then(
                (m) => m.PageLayoutsModule
              ),
          },
        ],
      },
      {
        path: "documentation",
        loadChildren: () =>
          import("./pages/documentation/documentation.module").then(
            (m) => m.DocumentationModule
          ),
      },
      {
        path: "**",
        loadChildren: () =>
          import("./pages/pages/errors/error-404/error-404.module").then(
            (m) => m.Error404Module
          ),
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: QuicklinkStrategy,
      scrollPositionRestoration: "enabled",
      relativeLinkResolution: "corrected",
      anchorScrolling: "enabled",
    }),
  ],
  exports: [RouterModule, QuicklinkModule],
})
export class AppRoutingModule {}
