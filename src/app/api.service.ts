import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { setList, startLoader, stopLoader, loader } from 'src/actions/list.action';
import { API_URL } from './app.constants';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  loader$: Observable<Boolean>;
  constructor(private http: HttpClient, private store: Store<any>) {
    this.loader$ = store.select(loader);
  }
  
  public getList() {
    this.store.dispatch(startLoader());
    this.http.get(API_URL.getList,{ headers: {
    }}).subscribe(val => {
      this.store.dispatch(setList(val));
      this.store.dispatch(stopLoader());
    },
    (err) => {
      this.store.dispatch(stopLoader());
    });
  }
  public updateEmail(id, body) {
    this.store.dispatch(startLoader());
    this.http.put(API_URL.updateEmail(id), body).subscribe(val => {
      this.getList();
      this.store.dispatch(stopLoader());
    },
    (err) => {
      this.store.dispatch(stopLoader());
    });
  }
  public deleteEmail(email) {
    this.store.dispatch(startLoader());
    this.http.delete(API_URL.deleteEmail(email), {}).subscribe(val => {
      this.getList();
      this.store.dispatch(stopLoader());
    },
    (err) => {
      this.store.dispatch(stopLoader());
    });
  }
  public addEmail(data) {
    this.store.dispatch(startLoader());
    this.http.post(API_URL.getList, data).subscribe(val => {
      this.getList();
      this.store.dispatch(stopLoader());
    },
    (err) => {
      this.store.dispatch(stopLoader());
    });
  }
}
