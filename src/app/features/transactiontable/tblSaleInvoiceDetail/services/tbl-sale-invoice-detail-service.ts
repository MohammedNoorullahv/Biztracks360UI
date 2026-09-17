import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TblSaleInvoiceDetail } from '../models/tblSaleInvoiceDetail.model';
import { TblSaleInvoiceDetailAdd } from '../models/tblSaleInvoiceDetail-Add.model';
import { TblSaleInvoiceDetailUpdate } from '../models/tblSaleInvoiceDetail-Update.model';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})

export class TblSaleInvoiceDetailService {
  constructor(private http: HttpClient) { }

  //GET ALL
  getAllTblSaleInvoiceDetails(fldFKPo: number): Observable<TblSaleInvoiceDetail[]> {
    const params = new HttpParams()
      .set('FldFKPo', fldFKPo);

    return this.http.get<TblSaleInvoiceDetail[]>(
      `${environment.apiBaseUrl}/api/TblSaleInvoiceDetail/GetAllTblSaleInvoiceDetails`,
      { params }
    );
  }

  //GET ALL LEAN
  getAllLeanTblSaleInvoiceDetails(fldFKPo: number): Observable<TblSaleInvoiceDetail[]> {
    const params = new HttpParams()
      .set('FldFKPo', fldFKPo);

    return this.http.get<TblSaleInvoiceDetail[]>(
      `${environment.apiBaseUrl}/api/TblSaleInvoiceDetail/GetAllLeanTblSaleInvoiceDetails`,
      { params }
    );
  }

  //GET PENDING
  getPendingTblSaleInvoiceDetails(fldStatus: string): Observable<TblSaleInvoiceDetail[]> {
    const params = new HttpParams()
      .set('FldStatus', fldStatus);

    return this.http.get<TblSaleInvoiceDetail[]>(
      `${environment.apiBaseUrl}/api/TblSaleInvoiceDetail/GetPendingTblSaleInvoiceDetails`,
      { params }
    );
  }

  //GET PENDING LEAN
  getPendingLeanTblSaleInvoiceDetails(fldStatus: string): Observable<TblSaleInvoiceDetail[]> {
    const params = new HttpParams()
      .set('FldStatus', fldStatus);

    return this.http.get<TblSaleInvoiceDetail[]>(
      `${environment.apiBaseUrl}/api/TblSaleInvoiceDetail/GetPendingLeanTblSaleInvoiceDetails`,
      { params }
    );
  }

  //POST
  addTblSaleInvoiceDetail(model: TblSaleInvoiceDetailAdd): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/TblSaleInvoiceDetail/CreateTblSaleInvoiceDetail`, model);
  };

  //GET
  getTblSaleInvoiceDetailById(id: number): Observable<TblSaleInvoiceDetail> {
    return this.http.get<TblSaleInvoiceDetail>(`${environment.apiBaseUrl}/api/TblSaleInvoiceDetail/GetTblSaleInvoiceDetailById/${id}`);
  };

  //UPDATE
  updateTblSaleInvoiceDetail(tblSaleInvoiceDetailupdate: TblSaleInvoiceDetailUpdate): Observable<TblSaleInvoiceDetail> {
    return this.http.patch<TblSaleInvoiceDetail>(`${environment.apiBaseUrl}/api/TblSaleInvoiceDetail/updateTblSaleInvoiceDetail`, tblSaleInvoiceDetailupdate);
  };

  //DELETE
  deleteTblSaleInvoiceDetail(tblSaleInvoiceDetaildelete: TblSaleInvoiceDetailUpdate): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${environment.apiBaseUrl}/api/TblSaleInvoiceDetail/DeleteTblSaleInvoiceDetail`,
      {
        body: tblSaleInvoiceDetaildelete,
        observe: 'response'
      });
  };
}
