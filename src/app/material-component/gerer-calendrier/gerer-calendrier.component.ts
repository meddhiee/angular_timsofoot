import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CalendrierService } from 'src/app/services/calendrier.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { CalendrierComponent } from '../dialog/calendrier/calendrier.component';
import { SuppressionComponent } from '../dialog/suppression/suppression.component';

@Component({
  selector: 'app-gerer-calendrier',
  templateUrl: './gerer-calendrier.component.html',
  styleUrls: ['./gerer-calendrier.component.scss']
})
export class GererCalendrierComponent {
  displayedColumns: string[] = ['eq_timsoft','eq_adv','jour' , 'mois' , 'annee' , 'league', 'temps','edit'];
  dataSource:any;
  
  responseMessage:any;

  constructor(private calendrierService:CalendrierService,
    private ngxService:NgxUiLoaderService,
    private dialog:MatDialog,
    private snackbarService:SnackbarService,
    private router:Router) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
  }
  tableData() {
    this.calendrierService.getCalendrier().subscribe((response:any)=>{
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
    const dialogRef = this.dialog.open(CalendrierComponent , dialogConfog);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    }); 
    const sub = dialogRef.componentInstance.onAddCalendrier.subscribe((response)=>{
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
    const dialogRef = this.dialog.open(CalendrierComponent , dialogConfog);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    }); 
    const sub = dialogRef.componentInstance.onEditCalendrier.subscribe((response)=>{
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
    this.calendrierService.delete(id).subscribe((response:any)=>{
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
