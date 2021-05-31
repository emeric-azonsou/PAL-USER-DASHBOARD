import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

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
    CustomLayoutModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
