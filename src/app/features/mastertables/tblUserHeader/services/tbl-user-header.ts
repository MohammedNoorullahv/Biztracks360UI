import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TblUserHeader } from '../models/tblUserHeader.model';
import { TblUserHeaderAdd } from '../models/tblUserHeader-Add.model';
import { TblUserHeaderUpdate } from '../models/tblUserHeader-Update.model';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TblUserHeaderService {

  constructor(private http: HttpClient) { }

  //GET ALL
  getAllTblUserHeaders(): Observable<TblUserHeader[]> {
    return this.http.get<TblUserHeader[]>(`${environment.apiBaseUrl}/api/TblUserHeader/GetAllTblUserHeaders`);
  };

  //GET ACTIVE
  getActiveTblUserHeaders(): Observable<TblUserHeader[]> {
    return this.http.get<TblUserHeader[]>(`${environment.apiBaseUrl}/api/TblUserHeader/GetActiveTblUserHeaders`);
  };

  //GET ACTIVELEAN
  getActiveLeanTblUserHeaders(): Observable<TblUserHeader[]> {
    return this.http.get<TblUserHeader[]>(`${environment.apiBaseUrl}/api/TblUserHeader/GetActiveLeanTblUserHeaders`);
  };

  //POST
  addTblUserHeader(model: TblUserHeaderAdd): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/TblUserHeader/CreateTblUserHeader`, model);
  };

  //GET
  getTblUserHeaderById(id: number): Observable<TblUserHeader> {
    return this.http.get<TblUserHeader>(`${environment.apiBaseUrl}/api/TblUserHeader/GetTblUserHeaderById/${id}`);
  };

  //UPDATE
  updateTblUserHeader(tblUserHeaderupdate: TblUserHeaderUpdate): Observable<TblUserHeader> {
    return this.http.patch<TblUserHeader>(`${environment.apiBaseUrl}/api/TblUserHeader/updateTblUserHeader`, tblUserHeaderupdate);
  };

  //DELETE
  deleteTblUserHeader(tblUserHeaderdelete: TblUserHeaderUpdate): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${environment.apiBaseUrl}/api/TblUserHeader/DeleteTblUserHeader`,
      {
        body: tblUserHeaderdelete,
        observe: 'response'
      });
  };



}
