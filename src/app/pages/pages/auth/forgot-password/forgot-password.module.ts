import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ForgotPasswordRoutingModule } from "./forgot-password-routing.module";
import { ForgotPasswordComponent } from "./forgot-password.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { IconModule } from "@visurel/iconify-angular";
import { MatIconModule } from "@angular/material/icon";
import { EmailComponent } from "./email/email.component";
import { OtpVerificationComponent } from "./otp-verification/otp-verification.component";
import { NewPasswordComponent } from "./new-password/new-password.component";
import { NgOtpInputModule } from "ng-otp-input";

@NgModule({
  declarations: [
    ForgotPasswordComponent,
    EmailComponent,
    OtpVerificationComponent,
    NewPasswordComponent,
  ],
  imports: [
    CommonModule,
    ForgotPasswordRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    IconModule,
    MatIconModule,
    NgOtpInputModule,
  ],
})
export class ForgotPasswordModule {}
