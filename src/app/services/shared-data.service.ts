import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SharedDataService {
  allData: object;
 

  constructor() {}

  saveTransferData(transfersData: Object, credential: string) {
    this.allData = {
      transfersData:{
        ...transfersData
      },
      credential:credential
    };

  }

  getTransferData() {
    return this.allData;
  }
}
