import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { SuppressionComponent } from '../dialog/suppression/suppression.component';

@Component({
  selector: 'app-gerer-utilisateur',
  templateUrl: './gerer-utilisateur.component.html',
  styleUrls: ['./gerer-utilisateur.component.scss']
})
export class GererUtilisateurComponent {
  displayedColumns: string[] = ['name' , 'email' , 'contactNumber' , 'role', 'status'];
  dataSource:any;
  responseMessage:any;

  constructor(private userService:UserService,
    private dialog:MatDialog,
    private snackbarService:SnackbarService,
    private router:Router) { }

  ngOnInit(): void {
    this.tableData();
  }
  tableData() {
    this.userService.getUsers().subscribe((response:any)=>{
      this.dataSource = new MatTableDataSource(response);
    },(error:any)=>{
      console.log(error.error?.message);
      if(error.error?.message){
        this.responseMessage = error.error?.message; 
      }else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }

  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onChange(status:any , id:any){
    var data = {
      status:status.toString(),
      id:id
    }
    this.userService.update(data).subscribe((response:any)=>{
      this.responseMessage = response?.message;
      this.snackbarService.openSnackBar(this.responseMessage , "success");
    },(error:any)=>{
      //console.log(error.error?.message);
      if(error.error?.message){
        this.responseMessage = error.error?.message; 
      }else{
        //alert("status is updated successfully");

        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }
  handleDeleteAction(values:any){
    const dialogConfog = new MatDialogConfig();
    dialogConfog.data={
      message:'supprimer les detailles du match entre '+ values.eq_timsoft+' et '+values.eq_adversaire + ' en '+values.date,
      confirmation:true
    };
    const dialogRef = this.dialog.open(SuppressionComponent , dialogConfog);
    const sub = dialogRef.componentInstance.onEmistStatusChange.subscribe((response)=>{
      this.deleteDetails(values.id);
      dialogRef.close();
    })

  }
  deleteDetails(id:any){
    this.userService.delete(id).subscribe((response:any)=>{
      this.tableData();
      this.responseMessage = response?.message;
      //alert("Product is Deleted");
      this.snackbarService.openSnackBar(this.responseMessage , "success");
    },(error:any)=>{
      console.log(error.error?.message);
      if(error.error?.message){
        this.responseMessage = error.error?.message; 
      }else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }

}
