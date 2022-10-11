import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  private stringRepo = new Subject<string>()

  listen(): Observable<string>{
    return this.stringRepo.asObservable()
  }

  notify(log: string){
    this.stringRepo.next(log)
  }
}
