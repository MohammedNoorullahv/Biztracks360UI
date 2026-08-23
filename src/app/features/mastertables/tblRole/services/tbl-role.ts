import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TblRole } from '../models/tblRole.model';
import { TblRoleAdd } from '../models/tblRole-Add.model';
import { TblRoleUpdate } from '../models/tblRole-Update.model';
import { environment } from '../../../../../environments/environment.development';



@Injectable({
  providedIn: 'root',
})

export class TblRoleService {

  constructor(private http: HttpClient) { }

  //GET ALL
  getAllTblRoles(): Observable<TblRole[]> {
    return this.http.get<TblRole[]>(`${environment.apiBaseUrl}/api/TblRole/GetAllTblRoles`);
  };

  //GET ACTIVE
  getActiveTblRoles(): Observable<TblRole[]> {
    return this.http.get<TblRole[]>(`${environment.apiBaseUrl}/api/TblRole/GetActiveTblRoles`);
  };

  //GET ACTIVELEAN
  getActiveLeanTblRoles(): Observable<TblRole[]> {
    return this.http.get<TblRole[]>(`${environment.apiBaseUrl}/api/TblRole/GetActiveLeanTblRoles`);
  };

  //POST
  addTblRole(model: TblRoleAdd): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/TblRole/CreateTblRole`, model);
  };

  //GET
  getTblRoleById(id: number): Observable<TblRole> {
    return this.http.get<TblRole>(`${environment.apiBaseUrl}/api/TblRole/GetTblRoleById/${id}`);
  };

  //UPDATE
  updateTblRole(tblRoleupdate: TblRoleUpdate): Observable<TblRole> {
    return this.http.patch<TblRole>(`${environment.apiBaseUrl}/api/TblRole/updateTblRole`, tblRoleupdate);
  };

  //DELETE
  deleteTblRole(tblRoledelete: TblRoleUpdate): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${environment.apiBaseUrl}/api/TblRole/DeleteTblRole`,
      {
        body: tblRoledelete,
        observe: 'response'
      });
  };


}
