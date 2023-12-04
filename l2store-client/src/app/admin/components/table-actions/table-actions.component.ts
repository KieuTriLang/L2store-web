import { Component, Input, OnInit } from '@angular/core';
import {
  faEdit,
  faInfoCircle,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
interface Actions {
  info: boolean;
  edit: boolean;
  delete: boolean;
}
@Component({
  selector: 'app-table-actions',
  templateUrl: './table-actions.component.html',
  styleUrls: ['./table-actions.component.scss'],
})
export class TableActionsComponent implements OnInit {
  @Input() url: string = '';
  @Input() id: any = '';
  @Input() actions: Actions = { info: true, edit: true, delete: true };

  infoIcon = faInfoCircle;
  editIcon = faEdit;
  deleteIcon = faTrash;
  constructor() {}

  ngOnInit(): void {}
}
