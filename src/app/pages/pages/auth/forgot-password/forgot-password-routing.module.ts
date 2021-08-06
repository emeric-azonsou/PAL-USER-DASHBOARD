import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { QuicklinkModule } from "ngx-quicklink";
import { ForgotPasswordComponent } from "./forgot-password.component";
import { EmailComponent } from "./email/email.component";
import { OtpVerificationComponent } from "./otp-verification/otp-verification.component";
import { NewPasswordComponent } from "./new-password/new-password.component";

const routes: Routes = [
  {
    path: "",
    component: EmailComponent,
  },
  {
    path: "otp",
    component: OtpVerificationComponent,
  },
  {
    path: "new-password/:user_id",
    component: NewPasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, QuicklinkModule],
})
export class ForgotPasswordRoutingModule {}
