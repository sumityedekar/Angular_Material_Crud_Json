import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from './Components/user-form/user-form.component';
import { UserService } from './Services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnakBarService } from './Services/mat-snak-bar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-crud-material';
  displayedColumns: string[] = ['id','department', 'name', 'mobile', 'email', 'doj', 'salary', 'usercode', 'status', 'action'];
  dataSource = new MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog: MatDialog, private userService: UserService, private snakBar:MatSnakBarService){}

  ngOnInit(){
    this.getUserList();
  }
  
  openUserForm(){
    const dialogRef = this.dialog.open(UserFormComponent);
    dialogRef.afterClosed().subscribe( res =>{
      if(res){
        this.getUserList();
      }
    })
  }

  openEditUserForm(data:any){
    const dialogRef = this.dialog.open(UserFormComponent, {
      data
    });
    dialogRef.afterClosed().subscribe( res =>{
      if(res){
        this.getUserList();
      }
    })
  }

  getUserList(){
    this.userService.getUser().subscribe((res:any) => {
      console.log(res);
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  deleteUser(id:number){
    console.warn(id);
    this.userService.deleteUser(id).subscribe(res => {
      this.snakBar.openSnackBar('User deleted successfully', 'Done');
      this.getUserList();
    })
  }

  applyFilter(event:any){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }
}
