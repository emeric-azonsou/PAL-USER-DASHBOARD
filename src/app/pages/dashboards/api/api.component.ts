import { Component, OnInit } from '@angular/core';
import icCopy from '@iconify/icons-ic/twotone-content-copy';
@Component({
  selector: 'vex-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss']
})
export class ApiComponent implements OnInit {
  icCopy=icCopy;
  constructor() { }

  ngOnInit(): void {
  }

}
