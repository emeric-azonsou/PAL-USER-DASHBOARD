import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  redirect() {
    this.dialog.closeAll();
    this.router.navigate(['/dashboards/profile']);
  }

}
