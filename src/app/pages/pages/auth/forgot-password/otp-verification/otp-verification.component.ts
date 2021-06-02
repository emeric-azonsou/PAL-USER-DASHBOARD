import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import icMail from "@iconify/icons-ic/twotone-mail";
@Component({
  selector: "vex-otp-verification",
  templateUrl: "./otp-verification.component.html",
  styleUrls: ["./otp-verification.component.scss"],
})
export class OtpVerificationComponent implements OnInit {
  form = this.fb.group({
    email: [null, Validators.required],
  });

  icMail = icMail;

  constructor(private router: Router, private fb: FormBuilder) {}

  ngOnInit() {}

  send() {
    this.router.navigate(["forgot-password/new-password"]);
  }
}
