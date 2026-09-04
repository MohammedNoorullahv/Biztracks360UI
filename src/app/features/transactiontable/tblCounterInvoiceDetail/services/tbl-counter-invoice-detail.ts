import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TblCounterInvoiceDetail } from '../models/tblCounterInvoiceDetail.model';
import { TblCounterInvoiceDetailAdd } from '../models/tblCounterInvoiceDetail-Add.model';
import { TblCounterInvoiceDetailUpdate } from '../models/tblCounterInvoiceDetail-Update.model';
import { environment } from '../../../../../environments/environment.development';


@Injectable({
  providedIn: 'root',
})

export class TblCounterInvoiceDetailService {
  constructor(private http: HttpClient) { }

  //GET ALL
  getAllTblCounterInvoiceDetails(fldFKInv: number): Observable<TblCounterInvoiceDetail[]> {
    return this.http.get<TblCounterInvoiceDetail[]>(`${environment.apiBaseUrl}/api/TblCounterInvoiceDetail/GetAllTblCounterInvoiceDetails?FldFKInv=${fldFKInv}`);
  };
  //return this.http.get<TblUserDetail[]>(`${environment.apiBaseUrl}/api/TblUserDetail/GetAllTblUserDetails?FldFKUser=${fldFKUser}`);

  //GET ACTIVE
  getActiveTblCounterInvoiceDetails(fldFKInv: number): Observable<TblCounterInvoiceDetail[]> {
    return this.http.get<TblCounterInvoiceDetail[]>(`${environment.apiBaseUrl}/api/TblCounterInvoiceDetail/GetActiveTblCounterInvoiceDetails/${fldFKInv}`);
  };

  //GET ACTIVELEAN
  getActiveLeanTblCounterInvoiceDetails(fldFKInv: number): Observable<TblCounterInvoiceDetail[]> {
    return this.http.get<TblCounterInvoiceDetail[]>(`${environment.apiBaseUrl}/api/TblCounterInvoiceDetail/GetActiveLeanTblCounterInvoiceDetails/${fldFKInv}`);
  };

  //POST
  addTblCounterInvoiceDetail(model: TblCounterInvoiceDetailAdd): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/TblCounterInvoiceDetail/CreateTblCounterInvoiceDetail`, model);
  };

  //GET
  getTblCounterInvoiceDetailById(id: number): Observable<TblCounterInvoiceDetail> {
    return this.http.get<TblCounterInvoiceDetail>(`${environment.apiBaseUrl}/api/TblCounterInvoiceDetail/GetTblCounterInvoiceDetailById/${id}`);
  };

  //UPDATE
  updateTblCounterInvoiceDetail(tblCounterInvoiceDetailupdate: TblCounterInvoiceDetailUpdate): Observable<TblCounterInvoiceDetail> {
    return this.http.patch<TblCounterInvoiceDetail>(`${environment.apiBaseUrl}/api/TblCounterInvoiceDetail/updateTblCounterInvoiceDetail`, tblCounterInvoiceDetailupdate);
  };

  //DELETE
  deleteTblCounterInvoiceDetail(tblCounterInvoiceDetaildelete: TblCounterInvoiceDetailUpdate): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${environment.apiBaseUrl}/api/TblCounterInvoiceDetail/DeleteTblCounterInvoiceDetail`,
      {
        body: tblCounterInvoiceDetaildelete,
        observe: 'response'
      });
  };
}
