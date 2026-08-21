import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


import { TblHSNMaster } from '../models/tblHSNMaster.model';
import { TblHSNMasterAdd } from '../models/tblHSNMaster-Add.model';
import { TblHSNMasterUpdate } from '../models/tblHSNMaster-Update.model';
import { environment } from '../../../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class TblHSNMasterService {

  constructor(private http: HttpClient) { }

  //GET ALL
  getAllTblHSNMasters(): Observable<TblHSNMaster[]> {
    return this.http.get<TblHSNMaster[]>(`${environment.apiBaseUrl}/api/TblHSNMaster/GetAllTblHSNMasters`);
  };

  //GET ACTIVE
  getActiveTblHSNMasters(): Observable<TblHSNMaster[]> {
    return this.http.get<TblHSNMaster[]>(`${environment.apiBaseUrl}/api/TblHSNMaster/GetActiveTblHSNMasters`);
  };

  //GET ACTIVELEAN
  getActiveLeanTblHSNMasters(): Observable<TblHSNMaster[]> {
    return this.http.get<TblHSNMaster[]>(`${environment.apiBaseUrl}/api/TblHSNMaster/GetActiveLeanTblHSNMasters`);
  };

  //POST
  addTblHSNMaster(model: TblHSNMasterAdd): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/TblHSNMaster/CreateTblHSNMaster`, model);
  };

  //GET
  getTblHSNMasterById(id: number): Observable<TblHSNMaster> {
    return this.http.get<TblHSNMaster>(`${environment.apiBaseUrl}/api/TblHSNMaster/GetTblHSNMasterById/${id}`);
  };

  //UPDATE
  updateTblHSNMaster(tblHSNMasterupdate: TblHSNMasterUpdate): Observable<TblHSNMaster> {
    return this.http.patch<TblHSNMaster>(`${environment.apiBaseUrl}/api/TblHSNMaster/updateTblHSNMaster`, tblHSNMasterupdate);
  };

  //DELETE
  deleteTblHSNMaster(tblHSNMasterdelete: TblHSNMasterUpdate): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${environment.apiBaseUrl}/api/TblHSNMaster/DeleteTblHSNMaster`,
      {
        body: tblHSNMasterdelete,
        observe: 'response'
      });
  };


}
