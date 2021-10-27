import { Component, OnInit } from "@angular/core";
import icCopy from "@iconify/icons-ic/twotone-content-copy";
import { BUSINESS_DATA_KEY } from "src/app/Models/constants";
import { MerchantData } from "src/app/Models/models.interface";
import icEdit from "@iconify/icons-ic/twotone-edit";
import icHidden from "@iconify/icons-ic/twotone-visibility-off";
import icVisible from "@iconify/icons-ic/twotone-visibility";
import { take } from "rxjs/operators";
import { BusinessService } from "src/app/services/business.service";
import { MatSnackBar } from "@angular/material/snack-bar";
@Component({
  selector: "vex-api",
  templateUrl: "./api.component.html",
  styleUrls: ["./api.component.scss"],
})
export class ApiComponent implements OnInit {
  icCopy = icCopy;
  icEdit = icEdit;
  icHidden = icHidden;
  icVisible = icVisible;
  userBusinessData: MerchantData;
  hide = true;
  edit = false;
  isUpdating: boolean = false;
  errorMessage: any;
  hasError: boolean;
  callbackURL: string 
  constructor(
    private businessService: BusinessService,
    private snackBar: MatSnackBar
  ) {
    const businessData = localStorage.getItem(BUSINESS_DATA_KEY);
    this.userBusinessData = JSON.parse(businessData);
    this.callbackURL = this.userBusinessData?.callback_url;
  }

  ngOnInit(): void {}

  copyInputMessage(inputElement) {
    inputElement.select();
    document.execCommand("copy");
    inputElement.setSelectionRange(0, 0);
  }

  updateCallbackUrl(callback_url: string) {
    this.isUpdating = true;
    const businessData = { ...this.userBusinessData };
    businessData.callback_url = callback_url
    this.businessService
      .updateBusinessData(businessData, this.userBusinessData.id)
      .pipe(take(1))
      .subscribe((response: any) => {
        this.isUpdating = false;
        if ((response.status = true && response.data)) {
          this.openSnackbar(response["message"]);
          localStorage.setItem(
            BUSINESS_DATA_KEY,
            JSON.stringify(response.data)
          );
          const parsedUrl = new URL(window.location.href);
          const baseUrl = parsedUrl.origin;
          window.location.replace(`${baseUrl}/dashboards/api`);
        } else {
          this.errorMessage = response.message || "something went wrong";
          this.hasError = true;
        }
      }),
      (error) => {
        this.isUpdating = false;
        this.hasError = true;
      };
  }

  openSnackbar(message) {
    this.snackBar.open(message, "CLOSE", {
      duration: 3000,
      horizontalPosition: "right",
    });
  }
}
