import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TblCompanyMaster } from '../models/tblCompanyMaster.model';
import { TblCompanyMasterAdd } from '../models/tblCompanyMaster-Add.model';
import { TblCompanyMasterUpdate } from '../models/tblCompanyMaster-Update.model';
import { environment } from '../../../../../environments/environment.development';


@Injectable({
  providedIn: 'root',
})
export class TblCompanyMasterService {

  constructor(private http: HttpClient) { }

  //GET ALL
  getAllTblCompanyMasters(): Observable<TblCompanyMaster[]> {
    return this.http.get<TblCompanyMaster[]>(`${environment.apiBaseUrl}/api/TblCompanyMaster/GetAllTblCompanyMasters`);
  };

  //GET ACTIVE
  getActiveTblCompanyMasters(): Observable<TblCompanyMaster[]> {
    return this.http.get<TblCompanyMaster[]>(`${environment.apiBaseUrl}/api/TblCompanyMaster/GetActiveTblCompanyMasters`);
  };

  //GET ACTIVELEAN
  getActiveLeanTblCompanyMasters(): Observable<TblCompanyMaster[]> {
    return this.http.get<TblCompanyMaster[]>(`${environment.apiBaseUrl}/api/TblCompanyMaster/GetActiveLeanTblCompanyMasters`);
  };

  //POST
  addTblCompanyMaster(model: TblCompanyMasterAdd): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/TblCompanyMaster/CreateTblCompanyMaster`, model);
  };

  //GET
  getTblCompanyMasterById(id: number): Observable<TblCompanyMaster> {
    return this.http.get<TblCompanyMaster>(`${environment.apiBaseUrl}/api/TblCompanyMaster/GetTblCompanyMasterById/${id}`);
  };

  //UPDATE
  updateTblCompanyMaster(tblCompanyMasterupdate: TblCompanyMasterUpdate): Observable<TblCompanyMaster> {
    return this.http.patch<TblCompanyMaster>(`${environment.apiBaseUrl}/api/TblCompanyMaster/updateTblCompanyMaster`, tblCompanyMasterupdate);
  };

  //DELETE
  deleteTblCompanyMaster(tblCompanyMasterdelete: TblCompanyMasterUpdate): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${environment.apiBaseUrl}/api/TblCompanyMaster/DeleteTblCompanyMaster`,
      {
        body: tblCompanyMasterdelete,
        observe: 'response'
      });
  };



}
