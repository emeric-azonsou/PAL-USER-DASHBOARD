
import { Observable, throwError as observableThrowError } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BUSINESS_DATA_KEY } from '../Models/constants';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  businessUserData: any;

  constructor(private http: HttpClient) { }



  createNewBusiness(businessData) {
    const url = environment.addBusinessUrl;
    // const url = `http://127.0.0.1:8000/api/addbusiness`;
    const formData = new FormData();
    formData.append('business_email', businessData['business_email']);
    formData.append('business_legal_name', businessData['business_legal_name']);
    formData.append('business_logo', businessData['business_logo']);
    formData.append('business_phone', businessData['business_phone']);
    if(businessData['company_documentUpload']?.length) {
      businessData['company_documentUpload'].forEach(file => {
        formData.append('company_document_path[]', file, file.name)
      });
    }
    formData.append('country', businessData['country']);
    formData.append('description', businessData['description']);
    formData.append('DOB', businessData['dob']);
    formData.append('id_type', businessData['id_type']);
    formData.append('id_proof_path', businessData['id_proof_path']);
    formData.append('industry', businessData['industry']);
    formData.append('nationality', businessData['nationality']);
    formData.append('business_address', businessData['owner_address']);
    formData.append('owner_full_name', businessData['owner_full_name']);
    formData.append('status', businessData['status']);
    formData.append('user_id', businessData['user_id']);
    formData.append('staff_size', businessData['staff_size']);
    formData.append('owner_address', businessData['owner_address']);
    formData.append('website', businessData['website']);
    return this.http
      .post(url, formData, { responseType: 'json', })
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          console.log('Error:', error.message);
          return observableThrowError(error);
        })
      );
  }

  updateBusinessData(businessData, id) {
    const url = `${environment.updateBusinessUrl}${id}`;
    // const url = `http://127.0.0.1:8000/api/updatebusiness/${id}`;
    const formData = new FormData();
    formData.append('business_email', businessData['business_email']);
    formData.append('business_legal_name', businessData['business_legal_name']);
    formData.append('business_logo', businessData['business_logo']);
    formData.append('business_phone', businessData['business_phone']);
    formData.append('company_document_path', businessData['company_documentUpload']);
    formData.append('country', businessData['country']);
    formData.append('description', businessData['description']);
    formData.append('DOB', businessData['dob']);
    formData.append('id_type', businessData['id_type']);
    formData.append('id_proof_path', businessData['id_proof_path']);
    formData.append('industry', businessData['industry']);
    formData.append('nationality', businessData['nationality']);
    formData.append('business_address', businessData['owner_address']);
    formData.append('owner_full_name', businessData['owner_full_name']);
    formData.append('status', businessData['status']);
    formData.append('user_id', businessData['user_id']);
    formData.append('staff_size', businessData['staff_size']);
    formData.append('owner_address', businessData['owner_address']);
    formData.append('website', businessData['website']);
    formData.append('callback_url', businessData['callback_url']);
    return this.http
      .post(url, formData, { responseType: 'json', })
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          console.log('Error:', error.message);
          return observableThrowError(error);
        })
      );
  }

  updateBusinessCallbackURL(businessData, id) {
    const url = `${environment.updateBusinessUrl}${id}`;
    // const url = `http://127.0.0.1:8000/api/updatebusiness/${id}`;
    const formData = new FormData();
    formData.append('callback_url', businessData['callback']);
    return this.http
      .post(url, formData, { responseType: 'json', })
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          console.log('Error:', error.message);
          return observableThrowError(error);
        })
      );
  }
  

  getBusinessDetails(user_id) {
    // const url = `http://127.0.0.1:8000/api/getuserbusiness/${user_id}`;
    const url = `${environment.getBusinessDataUrl}${user_id}`;
    return this.http.get(url).pipe(
      map((response) => {
        if(response['data']) {
          this.businessUserData = response['data'];
          localStorage.setItem(BUSINESS_DATA_KEY, JSON.stringify(this.businessUserData));
        }
        return response['data'];
      }),

      catchError((error: HttpErrorResponse) => {
        console.error("Error:", error.message);
        return observableThrowError(error);
      })
    );
  }

  getClientDetails(getmomoclientdata, credentials) {
    const url = `${environment.getClientDetailsUrl}`;
    const params = new HttpParams()
    .set('user_id', getmomoclientdata['user_id'])
    .set('module_id', getmomoclientdata['module_id'])
    .set('operator', getmomoclientdata['operator'])
    .set('phone_no', getmomoclientdata['phone_no'])
    .set('currency', getmomoclientdata['currency'])
    .set('country', getmomoclientdata['country'])
    .set('amount', getmomoclientdata['amount']);

    // const url = `http://127.0.0.1:8000/api/getmomoclientdata?phone_no=${getmomoclientdata}`;
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${credentials}`,
      'Content-Type': 'application/json'
    })    
    return this.http.get(url, { headers: headers, params: params }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error("Error", error.message);
        if(error.status === 404) {
          return [{status: false, message: error.error}];
      } else {
        return observableThrowError(error);
      }
      })
    );
  }

  getBulkClientDetails(credentials, user_id, getmomoclientdata, form) {
    const url = `${environment.getBulkClientDetailsUrl}`;
    const params = new HttpParams()
    .set('user_id', user_id)
    .set('data', getmomoclientdata)
    .set('currency', form['currency'])
    .set('country', form['country'])

    // const url = `http://127.0.0.1:8000/api/getmomoclientdata?phone_no=${getmomoclientdata}`;
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${credentials}`,
      'Content-Type': 'application/json'
    })    
    return this.http.get(url, { headers: headers, params: params }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error("Error", error.message);
        return observableThrowError(error);
      })
    );
  }

  getBusinessSummary(user_id) {
    // const url = `http://127.0.0.1:8000/api/getmerchantusersummary/${user_id}`;
    const url = `${environment.getBusinessSummaryUrl}${user_id}`;
    return this.http.get(url).pipe(
      map((response) => {
        return response;
      }),

      catchError((error: HttpErrorResponse) => {
        console.error("Error:", error.message);
        return observableThrowError(error);
      })
    );
  }

  requestTopUp(accountData, credentials) {
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${credentials}`,
      'Content-Type': 'application/json'
    })
    const url = environment.requestTopUpUrl;
    // const url = `http://127.0.0.1:8000/api/requesttopup`;

    return this.http.post(url, accountData, { headers }).pipe(
      map(response => {
        return response;
      }),

      catchError((error: HttpErrorResponse) => {
        console.error("Error:", error.message);
        return observableThrowError(error);
      })
    )
  }

  getUserTopUps(user_id: string, credentials: string): Observable<any> {
    const url = `${environment.getUserTopUpsUrl}${user_id}`;
    // const url = `http://127.0.0.1:8000/api/getusertopups/${user_id}`;
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${credentials}`,
      'Content-Type': 'application/json'
    })    
    return this.http.get(url, { headers }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error("Error", error.message);
        return observableThrowError(error);
      })
    );
  }

  createtransfer(data) {
    const url = environment.createTransactionUrl;
    return this.http.post(url, data).pipe(
      map(response => {
        return response;
      }),

      catchError((error: HttpErrorResponse) => {
        console.error("Error:", error.message);
        return observableThrowError(error);
      })
    )
  }

  getUserBalances(user_id) {
    const url = `${environment.getUserBalancesUrl}${user_id}`;
    // const url = `http://127.0.0.1:8000/api/getbusinessuserbalances/${user_id}`;
    return this.http.get(url).pipe(
      map(response => {
        return response;
      }),

      catchError((error: HttpErrorResponse) => {
        console.error("Error:", error.message);
        return observableThrowError(error);
      })
    )
  }

  getUserCollectionsBalances(user_id) {
    const url = `${environment.getUserCollectionsBalancesUrl}${user_id}`;
    // const url = `http://127.0.0.1:8000/api/getbusinessusercollectionbalances/${user_id}`;
    return this.http.get(url).pipe(
      map(response => {
        return response;
      }),

      catchError((error: HttpErrorResponse) => {
        console.error("Error:", error.message);
        return observableThrowError(error);
      })
    )
  }
}
