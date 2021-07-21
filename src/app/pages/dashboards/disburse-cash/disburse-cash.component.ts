import { CustomerCreateUpdateComponent } from './../../apps/aio-table/customer-create-update/customer-create-update.component';
import { Customer } from './../../apps/aio-table/interfaces/customer.model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import icClose from '@iconify/icons-ic/twotone-close';
import icPrint from '@iconify/icons-ic/twotone-print';
import icDownload from '@iconify/icons-ic/twotone-cloud-download';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icPerson from '@iconify/icons-ic/twotone-person';
import icMyLocation from '@iconify/icons-ic/twotone-my-location';
import icLocationCity from '@iconify/icons-ic/twotone-location-city';
import icEditLocation from '@iconify/icons-ic/twotone-edit-location';

@Component({
  selector: 'vex-disburse-cash',
  templateUrl: './disburse-cash.component.html',
  styleUrls: ['./disburse-cash.component.scss']
})
export class DisburseCashComponent implements OnInit {



  form: FormGroup;

  icClose=icClose;
  


  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<CustomerCreateUpdateComponent>,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    

    
  }

  

  createCustomer() {
    const customer = this.form.value;

    if (!customer.imageSrc) {
      customer.imageSrc = 'assets/img/avatars/1.jpg';
    }

    this.dialogRef.close(customer);
  }

 

 


}
