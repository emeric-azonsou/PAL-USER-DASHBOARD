import { ChangeDetectorRef, Component, OnInit, OnDestroy } from "@angular/core";
import icGroup from "@iconify/icons-ic/twotone-group";
import icPageView from "@iconify/icons-ic/twotone-pageview";
import icCloudOff from "@iconify/icons-ic/twotone-cloud-off";
import icTimer from "@iconify/icons-ic/twotone-timer";
import { defaultChartOptions } from "../../../../@vex/utils/default-chart-options";
import {
  Order,
  tableSalesData,
} from "../../../../static-data/table-sales-data";
import { TableColumn } from "../../../../@vex/interfaces/table-column.interface";
import icMoreVert from "@iconify/icons-ic/twotone-more-vert";
import { TransactionsService } from "src/app/services/transactions.service";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import {
  BUSINESS_DATA_KEY,
  SUMMARY_DATA_KEY,
  USER_SESSION_KEY,
} from "src/app/Models/constants";
import { BusinessService } from "src/app/services/business.service";

@Component({
  selector: "vex-dashboard-analytics",
  templateUrl: "./dashboard-analytics.component.html",
  styleUrls: ["./dashboard-analytics.component.scss"],
})
export class DashboardAnalyticsComponent implements OnInit, OnDestroy {
  tableColumns: TableColumn<Order>[] = [
    {
      label: "",
      property: "status",
      type: "badge",
    },
    {
      label: "PRODUCT",
      property: "name",
      type: "text",
    },
    {
      label: "$ PRICE",
      property: "price",
      type: "text",
      cssClasses: ["font-medium"],
    },
    {
      label: "DATE",
      property: "timestamp",
      type: "text",
      cssClasses: ["text-secondary"],
    },
  ];
  tableData = tableSalesData;

  series: ApexAxisChartSeries = [
    {
      name: "Subscribers",
      data: [28, 40, 36, 0, 52, 38, 60, 55, 67, 33, 89, 44],
    },
  ];

  userSessionsSeries: ApexAxisChartSeries = [
    {
      name: "Users",
      data: [10, 50, 26, 50, 38, 60, 50, 25, 61, 80, 40, 60],
    },
    {
      name: "Sessions",
      data: [5, 21, 42, 70, 41, 20, 35, 50, 10, 15, 30, 50],
    },
  ];

  salesSeries: ApexAxisChartSeries = [
    {
      name: "Sales",
      data: [28, 40, 36, 0, 52, 38, 60, 55, 99, 54, 38, 87],
    },
  ];

  pageViewsSeries: ApexAxisChartSeries = [
    {
      name: "Page Views",
      data: [405, 800, 200, 600, 105, 788, 600, 204],
    },
  ];

  uniqueUsersSeries: ApexAxisChartSeries = [
    {
      name: "Unique Users",
      data: [356, 806, 600, 754, 432, 854, 555, 1004],
    },
  ];

  uniqueUsersOptions = defaultChartOptions({
    chart: {
      type: "area",
      height: 100,
    },
    colors: ["#ff9800"],
  });

  icGroup = icGroup;
  icPageView = icPageView;
  icCloudOff = icCloudOff;
  icTimer = icTimer;
  icMoreVert = icMoreVert;
  dateArray: string[];
  options: import("e:/Noworri/PAL-USER-DASHBOARD/src/@vex/components/chart/chart.component").ApexOptions;
  currentMonthTransactions: any;
  unsubscribe$ = new Subject();
  userData: any;
  merchantSummaryData: any;
  userBusinessData: any;
  credentials: string;
  currentMonthAmount: any;
  balanceData: any;
  dataLoaded: boolean = false;

  constructor(
    private cd: ChangeDetectorRef,
    private transactionService: TransactionsService,
    private service: BusinessService
  ) {
    const sessionData = JSON.parse(localStorage.getItem(USER_SESSION_KEY));
    this.userData = sessionData;
    const summaryData = JSON.parse(localStorage.getItem(SUMMARY_DATA_KEY));
    this.merchantSummaryData = summaryData;

    const businessData = localStorage.getItem(BUSINESS_DATA_KEY);
    if (businessData !== "undefined") {
      this.userBusinessData = JSON.parse(businessData);
    }

    this.credentials = `${this.userBusinessData?.api_secret_key_live}:${this.userBusinessData?.api_public_key_live}`;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  ngOnInit() {
    this.getUserBalances();
    this.getTransactionsSummaryCurrentMonthData();

    setTimeout(() => {
      const temp = [
        {
          name: "Subscribers",
          data: [55, 213, 55, 0, 213, 55, 33, 55],
        },
        {
          name: "",
        },
      ];
    }, 3000);
  }

  getUserBalances() {
    this.service
      .getUserBalances(this.userData.user_id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response: any) => {
        if (response.data.length) {
          const balanceDataMap = this.toMap(response.data);
          Object.keys(balanceDataMap).forEach(
            (currency) => {
              const balances = balanceDataMap[currency].map(data => data.balance);
              const result = balances
                ?.reduce((acc: any, cur: any) => {
                  return balanceDataMap[currency] = acc + Number(cur)
                }, 0) as number;
                return result.toFixed(2);
            }
          );
          this.balanceData = balanceDataMap;
        }
      });
  }

  private toMap(balanceData) {
    const result = balanceData.reduce(function (dataMap, item) {
      dataMap[item.currency] = dataMap[item.currency] || [];
      dataMap[item.currency].push(item);
      return dataMap;
    }, Object.create(null));

    return result;
  }

  getTransactionsSummaryCurrentMonthData() {
    var date = new Date();
    var startDate = new Date(date.getFullYear(), date.getMonth(), 1)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    var endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    const range = {
      from: startDate,
      to: endDate,
    };
    this.transactionService
      .getUserTransactionSummary(
        this.userBusinessData.user_id,
        this.credentials,
        range
      )
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response: any) => {
        const summaryData = response["data"];
        if (summaryData) {
          this.currentMonthTransactions = summaryData.totalTransactionsCount;
          this.currentMonthAmount = summaryData.totalTransactionsAmount;
          const seriesData = [];
          this.dateArray = Object.keys(summaryData.monthlyTransactions);
          Object.keys(summaryData.monthlyTransactions).forEach((date) => {
            const dailyTransactions = summaryData.monthlyTransactions[date].map(
              (transaction: any) => transaction.amount
            );
            let dailyRevenue = dailyTransactions.reduce(
              (acc, cur) => acc + Number(cur),
              0
            );
            dailyRevenue = parseFloat(dailyRevenue).toFixed(2);
            const dailyTransactionsCount =
              summaryData.monthlyTransactions[date].length;
            seriesData.push(dailyTransactionsCount);
          });
          this.salesSeries = [
            {
              name: "Disbursements",
              data: seriesData,
            },
          ];

          this.options = defaultChartOptions({
            grid: {
              show: true,
              strokeDashArray: 3,
              padding: {
                left: 16,
              },
            },
            chart: {
              type: "bar",
              height: 300,
              sparkline: {
                enabled: false,
              },
              zoom: {
                enabled: false,
              },
            },
            stroke: {
              width: 4,
            },
            labels: this.dateArray,
            xaxis: {
              type: "datetime",
              labels: {
                show: true,
              },
            },
            yaxis: {
              floating: false,
              decimalsInFloat: 0,
              labels: {
                show: true,
              },
            },
          });
        }
        this.dataLoaded = true;
        return summaryData;
      });
  }
}
