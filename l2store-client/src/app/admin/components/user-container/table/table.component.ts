import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../../../user/services/user.service';
import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { UserDto } from 'src/app/user/models/userDto';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() name: string = 'All user';

  page = 1;
  limited = 12;
  totalPage = 0;

  users!: UserDto[];
  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.page = params['page'] || 1;
      this.getUserRoleUser();
    });
  }

  getUserRoleUser() {
    const params = new HttpParams()
      .set('page', this.page)
      .set('limited', this.limited);
    this.userService.getUserRoleUser(params).subscribe((res) => {
      this.page = res.pageable.pageNumber + 1;
      this.users = res.content;
      this.totalPage = res.totalPages;
    });
  }
  handlePageChange(page: number) {
    this.page = page;
    this.getUserRoleUser();
  }
}
