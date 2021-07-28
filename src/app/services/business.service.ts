
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

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor(private http: HttpClient) { }



  createNewBusiness(businessData) {
    const url = environment.addBusinessUrl;
    // const url = `http://127.0.0.1:8000/api/addbusiness`;
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
    const url = `https://api.pals.africa/api/getuserbusiness/${user_id}`;
    return this.http.get(url).pipe(
      map((response) => {
        return response['data'];
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
        return response.data;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error("Error", error.message);
        return observableThrowError(error);
      })
    );
  }
  createtransfer(data) {
    const url = `https://api.pals.africa/api/createtransfer`;
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
    const url = `https://api.pals.africa/api/getbusinessuserbalances/${user_id}`;
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
}
