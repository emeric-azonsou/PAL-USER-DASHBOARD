import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import icClose from "@iconify/icons-ic/twotone-close";

@Component({
  selector: 'vex-no-business-modal',
  templateUrl: './no-business-modal.component.html',
  styleUrls: ['./no-business-modal.component.scss']
})
export class NoBusinessModalComponent implements OnInit {
  icClose = icClose;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  redirect() {
    this.router.navigate(['/dashboards/pofile']);
  }

}
