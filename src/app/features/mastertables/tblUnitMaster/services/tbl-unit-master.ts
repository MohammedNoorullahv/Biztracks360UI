import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TblUnitMaster } from '../models/tblUnitMaster.model';
import { TblUnitMasterAdd } from '../models/tblUnitMaster-Add.model';
import { TblUnitMasterUpdate } from '../models/tblUnitMaster-Update.model';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})

export class TblUnitMasterService {

  constructor(private http: HttpClient) { }

  //GET ALL
  getAllTblUnitMasters(): Observable<TblUnitMaster[]> {
    return this.http.get<TblUnitMaster[]>(`${environment.apiBaseUrl}/api/TblUnitMaster/GetAllTblUnitMasters`);
  };

  //GET ACTIVE
  getActiveTblUnitMasters(): Observable<TblUnitMaster[]> {
    return this.http.get<TblUnitMaster[]>(`${environment.apiBaseUrl}/api/TblUnitMaster/GetActiveTblUnitMasters`);
  };

  //GET ACTIVELEAN
  getActiveLeanTblUnitMasters(): Observable<TblUnitMaster[]> {
    return this.http.get<TblUnitMaster[]>(`${environment.apiBaseUrl}/api/TblUnitMaster/GetActiveLeanTblUnitMasters`);
  };

  //POST
  addTblUnitMaster(model: TblUnitMasterAdd): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/TblUnitMaster/CreateTblUnitMaster`, model);
  };

  //GET
  getTblUnitMasterById(id: number): Observable<TblUnitMaster> {
    return this.http.get<TblUnitMaster>(`${environment.apiBaseUrl}/api/TblUnitMaster/GetTblUnitMasterById/${id}`);
  };

  //UPDATE
  updateTblUnitMaster(tblUnitMasterupdate: TblUnitMasterUpdate): Observable<TblUnitMaster> {
    return this.http.patch<TblUnitMaster>(`${environment.apiBaseUrl}/api/TblUnitMaster/updateTblUnitMaster`, tblUnitMasterupdate);
  };

  //DELETE
  deleteTblUnitMaster(tblUnitMasterdelete: TblUnitMasterUpdate): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${environment.apiBaseUrl}/api/TblUnitMaster/DeleteTblUnitMaster`,
      {
        body: tblUnitMasterdelete,
        observe: 'response'
      });
  };


}
