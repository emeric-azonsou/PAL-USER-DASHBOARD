import { IconModule } from '@visurel/iconify-angular';

import { BrowserModule } from "@angular/platform-browser";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

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
import { MatSelectModule } from "@angular/material/select";
import { MatPaginatorModule } from '@angular/material/paginator';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopUpTransactionComponent,
    CurencyBalanceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    // Vex
    VexModule,
    FlexLayoutModule,
    CustomLayoutModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    IconModule,
    MatPaginatorModule
    
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppModule {}
