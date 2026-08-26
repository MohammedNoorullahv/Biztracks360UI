import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TblPurchaseOrder } from '../models/tblPurchaseOrder.model';
import { TblPurchaseOrderAdd } from '../models/tblPurchaseOrder-Add.model';
import { TblPurchaseOrderUpdate } from '../models/tblPurchaseOrder-Update.model';
import { environment } from '../../../../../environments/environment.development';


@Injectable({
  providedIn: 'root',
})

export class TblPurchaseOrderService {

  constructor(private http: HttpClient) { }

  //GET ALL
  getAllTblPurchaseOrders(): Observable<TblPurchaseOrder[]> {
    return this.http.get<TblPurchaseOrder[]>(`${environment.apiBaseUrl}/api/TblPurchaseOrder/GetAllTblPurchaseOrders`);
  };

  //GET ACTIVE
  getActiveTblPurchaseOrders(): Observable<TblPurchaseOrder[]> {
    return this.http.get<TblPurchaseOrder[]>(`${environment.apiBaseUrl}/api/TblPurchaseOrder/GetActiveTblPurchaseOrders`);
  };

  //GET ACTIVELEAN
  getActiveLeanTblPurchaseOrders(): Observable<TblPurchaseOrder[]> {
    return this.http.get<TblPurchaseOrder[]>(`${environment.apiBaseUrl}/api/TblPurchaseOrder/GetActiveLeanTblPurchaseOrders`);
  };

  //POST
  addTblPurchaseOrder(model: TblPurchaseOrderAdd): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/TblPurchaseOrder/CreateTblPurchaseOrder`, model);
  };

  //GET
  getTblPurchaseOrderById(id: number): Observable<TblPurchaseOrder> {
    return this.http.get<TblPurchaseOrder>(`${environment.apiBaseUrl}/api/TblPurchaseOrder/GetTblPurchaseOrderById/${id}`);
  };

  //UPDATE
  updateTblPurchaseOrder(tblPurchaseOrderupdate: TblPurchaseOrderUpdate): Observable<TblPurchaseOrder> {
    return this.http.patch<TblPurchaseOrder>(`${environment.apiBaseUrl}/api/TblPurchaseOrder/updateTblPurchaseOrder`, tblPurchaseOrderupdate);
  };

  //DELETE
  deleteTblPurchaseOrder(tblPurchaseOrderdelete: TblPurchaseOrderUpdate): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${environment.apiBaseUrl}/api/TblPurchaseOrder/DeleteTblPurchaseOrder`,
      {
        body: tblPurchaseOrderdelete,
        observe: 'response'
      });
  };
}
