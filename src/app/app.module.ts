import { IconModule } from "@visurel/iconify-angular";

import { BrowserModule } from "@angular/platform-browser";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { VexModule } from "../@vex/vex.module";
import { HttpClientModule } from "@angular/common/http";
import { CustomLayoutModule } from "./custom-layout/custom-layout.module";
import { HomeComponent } from "./pages/dashboards/home/home.component";
import { TopUpTransactionComponent } from "./pages/dashboards/top-up-transaction/top-up-transaction.component";
import { MatTableModule } from "@angular/material/table";
import { CurencyBalanceComponent } from "./pages/dashboards/curency-balance/curency-balance.component";
import { RouterModule } from "@angular/router";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatPaginatorModule } from "@angular/material/paginator";
import { FlexLayoutModule } from "@angular/flex-layout";
import { DisburseCashComponent } from "./pages/dashboards/disburse-cash/disburse-cash.component";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatMenuModule } from "@angular/material/menu";
import { MatTableExporterModule } from 'mat-table-exporter';

import { MatDividerModule } from "@angular/material/divider";
import { ApiComponent } from "./pages/dashboards/api/api.component";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { TransactionsComponent } from "./pages/dashboards/transactions/transactions.component";
import { RechargeAccountComponent } from "./pages/dashboards/recharge-account/recharge-account.component";
import { NoBusinessModalComponent } from "./pages/dashboards/no-business-modal/no-business-modal.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { NgIdleKeepaliveModule } from "@ng-idle/keepalive";
import { MomentModule } from "angular2-moment";
import { ConfirmTransfersComponent } from "./pages/dashboards/confirm-transfers/confirm-transfers.component";
import { AuthTimeoutModalComponent } from "./pages/dashboards/auth-timeout-modal/auth-timeout-modal.component";
import { ReportsComponent } from "./pages/dashboards/reports/reports.component";
import { MatNativeDateModule, MatOptionModule } from "@angular/material/core";
import { TransactionsReportComponent } from "./pages/dashboards/reports/transactions-report/transactions-report.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { DatePipe } from "@angular/common";
import { DashboardAnalyticsModule } from "./pages/dashboards/dashboard-analytics/dashboard-analytics.module";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopUpTransactionComponent,
    CurencyBalanceComponent,
    DisburseCashComponent,
    TransactionsComponent,
    RechargeAccountComponent,
    ApiComponent,
    NoBusinessModalComponent,
    ConfirmTransfersComponent,
    AuthTimeoutModalComponent,
    ReportsComponent,
    TransactionsReportComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    VexModule,
    FlexLayoutModule,
    CustomLayoutModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatOptionModule,
    MatFormFieldModule,
    IconModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatMenuModule,
    MatDividerModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatTableExporterModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    NgIdleKeepaliveModule.forRoot(),
    MomentModule,
    DashboardAnalyticsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppModule {}
