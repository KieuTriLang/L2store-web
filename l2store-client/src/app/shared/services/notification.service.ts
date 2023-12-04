import { NotiMessage } from './../models/noti-message';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  notify = new Subject<NotiMessage>();
  notify$ = this.notify.asObservable();
  constructor() {}

  addNewNoti(notiMessage: NotiMessage) {
    this.notify.next(notiMessage);
  }
}
