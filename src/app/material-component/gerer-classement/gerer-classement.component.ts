import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ClassementService } from 'src/app/services/classement.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { ClassementComponent } from '../dialog/classement/classement.component';
import { SuppressionComponent } from '../dialog/suppression/suppression.component';


@Component({
  selector: 'app-gerer-classement',
  templateUrl: './gerer-classement.component.html',
  styleUrls: ['./gerer-classement.component.scss']
})
export class GererClassementComponent {

  displayedColumns: string[] = ['league','saison','pos','mj','mg','mn' ,'mp' , 'bp','bc','db','pts'];
  dataSource:any;
  
  responseMessage:any;

  constructor(private classementService:ClassementService,
    private ngxService:NgxUiLoaderService,
    private dialog:MatDialog,
    private snackbarService:SnackbarService,
    private router:Router) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
  }
  tableData() {
    this.classementService.getClassement().subscribe((response:any)=>{
      this.ngxService.stop();
      this.dataSource = new MatTableDataSource(response);
    },(error:any)=>{
      this.ngxService.stop();
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

  handleAddAction(){
    const dialogConfog = new MatDialogConfig();
    dialogConfog.data={
      action:'Ajouter'
    };
    dialogConfog.width = "850px";
    const dialogRef = this.dialog.open(ClassementComponent , dialogConfog);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    }); 
    const sub = dialogRef.componentInstance.onAddClassement.subscribe((response)=>{
      this.tableData();
    })
  }
  handleEditAction(values:any){
    const dialogConfog = new MatDialogConfig();
    dialogConfog.data={
      action:'Modifier',
      data:values
    };
    dialogConfog.width = "850px";
    const dialogRef = this.dialog.open(ClassementComponent , dialogConfog);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    }); 
    const sub = dialogRef.componentInstance.onEditClassement.subscribe((response)=>{
      this.tableData();
    })
  }

  handleDeleteAction(values:any){
    const dialogConfog = new MatDialogConfig();
    dialogConfog.data={
      message:'supprimer ',
      confirmation:true
    };
    const dialogRef = this.dialog.open(SuppressionComponent , dialogConfog);
    const sub = dialogRef.componentInstance.onEmistStatusChange.subscribe((response)=>{
      this.deleteCalendrier(values.id);
      dialogRef.close();
    })

  }
  deleteCalendrier(id:any){
    this.classementService.delete(id).subscribe((response:any)=>{
      this.tableData();
      this.responseMessage = response?.message;
      
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
