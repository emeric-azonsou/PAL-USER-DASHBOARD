import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder } from "@angular/forms";
import icMail from "@iconify/icons-ic/twotone-mail";
import { Router } from "@angular/router";
@Component({
  selector: "vex-new-password",
  templateUrl: "./new-password.component.html",
  styleUrls: ["./new-password.component.scss"],
})
export class NewPasswordComponent implements OnInit {
  form = this.fb.group({
    email: [null, Validators.required],
  });

  icMail = icMail;

  constructor(private router: Router, private fb: FormBuilder) {}

  ngOnInit() {}

  send() {
    this.router.navigate(["forgot-password/otp"]);
  }
}
