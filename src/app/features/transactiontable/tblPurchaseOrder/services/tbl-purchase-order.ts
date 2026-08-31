import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
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
  // getAllTblPurchaseOrders(fldFromDate: Date, fldToDate: Date): Observable<TblPurchaseOrder[]> {
  //   return this.http.get<TblPurchaseOrder[]>(`${environment.apiBaseUrl}/api/TblPurchaseOrder/GetAllTblPurchaseOrders`);
  // };
  // GET ALL
getAllTblPurchaseOrders(fldFromDate: string, fldToDate: string): Observable<TblPurchaseOrder[]> {
  const params = new HttpParams()
    .set('FldFromDate', fldFromDate)
    .set('FldToDate', fldToDate);

  return this.http.get<TblPurchaseOrder[]>(
    `${environment.apiBaseUrl}/api/TblPurchaseOrder/GetAllTblPurchaseOrders`, 
    { params }
  );
}


 //https://localhost:7041/api/TblPurchaseOrder/GetAllTblPurchaseOrders?FldFromDate=2026-08-01&FldToDate=2026-08-30

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

  //GET LAST PO
  getLastTblPurchaeOrder(fldFKUnit: number): Observable<TblPurchaseOrder>{
    return this.http.get<TblPurchaseOrder>(`${environment.apiBaseUrl}/api/TblPurchaseOrder/GetLastTblPurchaseOrder/${fldFKUnit}`);
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
