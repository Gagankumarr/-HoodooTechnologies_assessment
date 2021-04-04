import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetCooksService {
  constructor(private _http:HttpClient) {
  }

  filterCooks(filterObject:any):Observable<any>{
    const url = "https://api.dev.chefed.co/chefed/api/v1/cook/filter";
    return this._http.post(url, filterObject); 
}

}
