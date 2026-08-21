import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


import { TblAreaMaster } from '../models/tblAreaMaster.model';
import { TblAreaMasterAdd } from '../models/tblAreaMaster-Add.model';
import { TblAreaMasterUpdate } from '../models/tblAreaMaster-Update.model';
import { environment } from '../../../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class TblAreaMasterService {

  constructor(private http: HttpClient) { }

  //GET ALL
  getAllTblAreaMasters(): Observable<TblAreaMaster[]> {
    return this.http.get<TblAreaMaster[]>(`${environment.apiBaseUrl}/api/TblAreaMaster/GetAllTblAreaMasters`);
  };

  //GET ACTIVE
  getActiveTblAreaMasters(): Observable<TblAreaMaster[]> {
    return this.http.get<TblAreaMaster[]>(`${environment.apiBaseUrl}/api/TblAreaMaster/GetActiveTblAreaMasters`);
  };

  //GET ACTIVELEAN
  getActiveLeanTblAreaMasters(): Observable<TblAreaMaster[]> {
    return this.http.get<TblAreaMaster[]>(`${environment.apiBaseUrl}/api/TblAreaMaster/GetActiveLeanTblAreaMasters`);
  };

  //POST
  addTblAreaMaster(model: TblAreaMasterAdd): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/TblAreaMaster/CreateTblAreaMaster`, model);
  };

  //GET
  getTblAreaMasterById(id: number): Observable<TblAreaMaster> {
    return this.http.get<TblAreaMaster>(`${environment.apiBaseUrl}/api/TblAreaMaster/GetTblAreaMasterById/${id}`);
  };

  //UPDATE
  updateTblAreaMaster(tblAreaMasterupdate: TblAreaMasterUpdate): Observable<TblAreaMaster> {
    return this.http.patch<TblAreaMaster>(`${environment.apiBaseUrl}/api/TblAreaMaster/updateTblAreaMaster`, tblAreaMasterupdate);
  };

  //DELETE
  deleteTblAreaMaster(tblAreaMasterdelete: TblAreaMasterUpdate): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${environment.apiBaseUrl}/api/TblAreaMaster/DeleteTblAreaMaster`,
      {
        body: tblAreaMasterdelete,
        observe: 'response'
      });
  };


}
