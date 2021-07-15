import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { USER_SESSION_KEY } from 'src/app/Models/constants';
import { BusinessService } from 'src/app/services/business.service';

@Component({
  selector: 'vex-curency-balance',
  templateUrl: './curency-balance.component.html',
  styleUrls: ['./curency-balance.component.scss']
})
export class CurencyBalanceComponent implements OnInit, OnDestroy {
  userData: any;
  balanceData: any;

  unsubscribe$ = new Subject();
  constructor(
    private service: BusinessService
  ) {
    const sessionData = JSON.parse(localStorage.getItem(USER_SESSION_KEY));
    this.userData = sessionData;
  }

  ngOnInit(): void {
    this.getUserBalances();
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getUserBalances() {
    this.service.getUserBalances(this.userData.user_id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response: any) => {
        this.balanceData = response.data;
      })
  }

}
