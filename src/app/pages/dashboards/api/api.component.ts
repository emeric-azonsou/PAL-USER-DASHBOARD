import { Component, OnInit } from '@angular/core';
import icCopy from '@iconify/icons-ic/twotone-content-copy';
import { BUSINESS_DATA_KEY } from 'src/app/Models/constants';
@Component({
  selector: 'vex-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss']
})
export class ApiComponent implements OnInit {
  icCopy=icCopy;
  userBusinessData: any;

  constructor() { 
    const businessData = localStorage.getItem(BUSINESS_DATA_KEY);
    this.userBusinessData = JSON.parse(businessData);

  }

  ngOnInit(): void {
  }

  copyInputMessage(inputElement) {
    inputElement.select();
    document.execCommand("copy");
    inputElement.setSelectionRange(0, 0);
  }
}
