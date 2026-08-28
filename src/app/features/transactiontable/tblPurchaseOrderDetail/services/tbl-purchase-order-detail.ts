import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TblPurchaseOrderDetail } from '../models/tblPurchaseOrderDetail.model';
import { TblPurchaseOrderDetailAdd } from '../models/tblPurchaseOrderDetail-Add.model';
import { TblPurchaseOrderDetailUpdate } from '../models/tblPurchaseOrderDetail-Update.model';
import { environment } from '../../../../../environments/environment.development';


@Injectable({
  providedIn: 'root',
})

export class TblPurchaseOrderDetailService {
  constructor(private http: HttpClient) { }

  //GET ALL
  getAllTblPurchaseOrderDetails(fldFKPo: number): Observable<TblPurchaseOrderDetail[]> {
    return this.http.get<TblPurchaseOrderDetail[]>(`${environment.apiBaseUrl}/api/TblPurchaseOrderDetail/GetAllTblPurchaseOrderDetails/${fldFKPo}`);
  };

  //GET ACTIVE
  getActiveTblPurchaseOrderDetails(fldFKPo: number): Observable<TblPurchaseOrderDetail[]> {
    return this.http.get<TblPurchaseOrderDetail[]>(`${environment.apiBaseUrl}/api/TblPurchaseOrderDetail/GetActiveTblPurchaseOrderDetails/${fldFKPo}`);
  };

  //GET ACTIVELEAN
  getActiveLeanTblPurchaseOrderDetails(fldFKPo: number): Observable<TblPurchaseOrderDetail[]> {
    return this.http.get<TblPurchaseOrderDetail[]>(`${environment.apiBaseUrl}/api/TblPurchaseOrderDetail/GetActiveLeanTblPurchaseOrderDetails/${fldFKPo}`);
  };

  //POST
  addTblPurchaseOrderDetail(model: TblPurchaseOrderDetailAdd): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/TblPurchaseOrderDetail/CreateTblPurchaseOrderDetail`, model);
  };

  //GET
  getTblPurchaseOrderDetailById(id: number): Observable<TblPurchaseOrderDetail> {
    return this.http.get<TblPurchaseOrderDetail>(`${environment.apiBaseUrl}/api/TblPurchaseOrderDetail/GetTblPurchaseOrderDetailById/${id}`);
  };

  //UPDATE
  updateTblPurchaseOrderDetail(tblPurchaseOrderDetailupdate: TblPurchaseOrderDetailUpdate): Observable<TblPurchaseOrderDetail> {
    return this.http.patch<TblPurchaseOrderDetail>(`${environment.apiBaseUrl}/api/TblPurchaseOrderDetail/updateTblPurchaseOrderDetail`, tblPurchaseOrderDetailupdate);
  };

  //DELETE
  deleteTblPurchaseOrderDetail(tblPurchaseOrderDetaildelete: TblPurchaseOrderDetailUpdate): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${environment.apiBaseUrl}/api/TblPurchaseOrderDetail/DeleteTblPurchaseOrderDetail`,
      {
        body: tblPurchaseOrderDetaildelete,
        observe: 'response'
      });
  };
}