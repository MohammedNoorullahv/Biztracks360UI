import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environment.development';

import { TblProperty } from '../models/tblProperty.model';
import { TblPropertyAdd } from '../models/tblProperty-Add.model';
import { TblPropertyUpdate } from '../models/tblProperty-Update.model';
import { environment } from '../../../../../environments/environment.development';


@Injectable({
  providedIn: 'root',
})
export class TblPropertyService {

  constructor(private http: HttpClient) { }

  //GET ALL
  getAllTblPropertys(): Observable<TblProperty[]> {
    return this.http.get<TblProperty[]>(`${environment.apiBaseUrl}/api/TblProperty/GetAllTblPropertys`);
  };

  //GET ACTIVE
  getActiveTblPropertys(): Observable<TblProperty[]> {
    return this.http.get<TblProperty[]>(`${environment.apiBaseUrl}/api/TblProperty/GetActiveTblPropertys`);
  };

  //GET ACTIVELEAN
  getActiveLeanTblPropertys(): Observable<TblProperty[]> {
    return this.http.get<TblProperty[]>(`${environment.apiBaseUrl}/api/TblProperty/GetActiveLeanTblPropertys`);
  };

  //POST
  addTblProperty(model: TblPropertyAdd): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/TblProperty/CreateTblProperty`, model);
  };

  //GET
  getTblPropertyById(id: number): Observable<TblProperty> {
    return this.http.get<TblProperty>(`${environment.apiBaseUrl}/api/TblProperty/GetTblPropertyById/${id}`);
  };

  //UPDATE
  updateTblProperty(tblPropertyupdate: TblPropertyUpdate): Observable<TblProperty> {
    return this.http.patch<TblProperty>(`${environment.apiBaseUrl}/api/TblProperty/updateTblProperty`, tblPropertyupdate);
  };

  //DELETE
  deleteTblProperty(tblPropertydelete: TblPropertyUpdate): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${environment.apiBaseUrl}/api/TblProperty/DeleteTblProperty`,
      {
        body: tblPropertydelete,
        observe: 'response'
      });
  };



}
