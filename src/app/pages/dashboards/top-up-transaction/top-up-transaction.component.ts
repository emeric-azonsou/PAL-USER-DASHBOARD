import { Component, OnInit } from "@angular/core";
const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: "BG452515",
    name: "10 min ago",
    weight: "Togo",
    symbol: "MTN",
    walletNumber: 96060855,
    walFee: 5.0,
    amountReceived: 400,
    status: "Sent",
  },
  {
    position: "BG452515",
    name: "1 hours ago",
    weight: "Togo",
    symbol: "MTN",
    walletNumber: 96060855,
    walFee: 5.0,
    amountReceived: 400,
    status: "Sent",
  },
  {
    position: "BG452515",
    name: "1 days ago",
    weight: "Togo",
    symbol: "MTN",
    walletNumber: 96060855,
    walFee: 5.0,
    amountReceived: 400,
    status: "Sent",
  },
];
export interface PeriodicElement {
  name: string;
  position: string;
  weight: string;
  symbol: string;
  walletNumber: number;
  walFee: number;
  amountReceived: number;
  status: string;
}
@Component({
  selector: "vex-top-up-transaction",
  templateUrl: "./top-up-transaction.component.html",
  styleUrls: ["./top-up-transaction.component.scss"],
})
export class TopUpTransactionComponent implements OnInit {
  displayedColumns: string[] = [
    "position",
    "name",
    "weight",
    "symbol",
    "Wallet number",
    "Pal Fee",
    "Amount received",
    "Status",
  ];
  dataSource = ELEMENT_DATA;

  constructor() {}

  ngOnInit(): void {}
}
