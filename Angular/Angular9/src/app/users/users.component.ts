import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../shared/services/users.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  title = 'Hello Users';
  users = null;

  constructor(private usersServices: UsersService) {}

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, {}) sort: MatSort;
  displayedColumns: string[] = ['id', 'name', 'description', 'age'];
  dataSource = new MatTableDataSource<User>();

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.usersServices
      .all()
      .subscribe(
        (users) => (
          (this.users = users),
          (this.dataSource.data = this.users),
          (this.dataSource.paginator = this.paginator),
          (this.dataSource.sort = this.sort)
        )
      );
  }
  filterProduct(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.usersServices.getDataByFilter(value).subscribe((response) => {
      this.dataSource = response['users'];
    });
  }
}

export interface User {
  id: number;
  name: string;
  description: string;
  age: number;
}
