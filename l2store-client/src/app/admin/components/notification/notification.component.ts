import { NotiMessage } from './../../../shared/models/noti-message';
import { NotificationService } from './../../../shared/services/notification.service';
import { Component, OnInit } from '@angular/core';
import { faInfoCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  notiIcon = faInfoCircle;
  isOpened = false;
  notify: NotiMessage = {
    type: 'danger',
    title: 'Products',
    message: 'Add success',
  };
  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.notify$.subscribe(async (value) => {
      this.changeIconNoti(value.type);
      this.notify = value;
      this.isOpened = true;
      await this.timeout(4000);
      this.isOpened = false;
    });
  }

  timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  changeIconNoti(type: string) {
    switch (type) {
      case 'info':
        this.notiIcon = faInfoCircle;
        break;
      case 'danger':
        this.notiIcon = faTimesCircle;
        break;

      default:
        break;
    }
  }
}
