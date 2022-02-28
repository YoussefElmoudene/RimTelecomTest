import {Injectable} from '@angular/core';
import {Archive} from "../model/archive.model";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ArchiveService {
  private urlBase = environment.baseUrl;

  private _coordonneList: Array<Archive> = new Array<Archive>();


  get coordonneList(): Array<Archive> {
    return this._coordonneList;
  }

  set coordonneList(value: Array<Archive>) {
    this._coordonneList = value;
  }

  constructor(private http: HttpClient) {
  }

  public findAll(): Observable<Array<Archive>> {
   return  this.http.get<Array<Archive>>(this.urlBase + '/');
  }
}
