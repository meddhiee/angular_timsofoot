import { Component, OnInit } from '@angular/core';
import { MatDialog ,MatDialogConfig} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DetailsService } from 'src/app/services/details.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { DetailsComponent } from '../dialog/details/details.component';
import { SuppressionComponent } from '../dialog/suppression/suppression.component';

@Component({
  selector: 'app-gerer-details',
  templateUrl: './gerer-details.component.html',
  styleUrls: ['./gerer-details.component.scss']
})
export class GererDetailsComponent implements OnInit {

  displayedColumns: string[] = ['eq_timsoft' , 'eq_adversaire' , 'score_timsoft' , 'score_adversaire', 'date','time', 'league','season','logo','cj_timsoft','cj_adv','cr_timsoft','cr_adv','edit','ajout'];
  dataSource:any;
  length1:any;
  responseMessage:any;

  constructor(private detailsService:DetailsService,
    private ngxService:NgxUiLoaderService,
    private dialog:MatDialog,
    private SnackbarService:SnackbarService,
    private router:Router) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
  }
  tableData() {
    this.detailsService.getDetails().subscribe((response:any)=>{
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
      this.SnackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
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
    const dialogRef = this.dialog.open(DetailsComponent , dialogConfog);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    }); 
    const sub = dialogRef.componentInstance.onAddDetails.subscribe((response)=>{
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
    const dialogRef = this.dialog.open(DetailsComponent , dialogConfog);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    }); 
    const sub = dialogRef.componentInstance.onEditDetails.subscribe((response)=>{
      this.tableData();
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
    this.detailsService.delete(id).subscribe((response:any)=>{
      this.tableData();
      this.responseMessage = response?.message;
      //alert("Product is Deleted");
      this.SnackbarService.openSnackBar(this.responseMessage , "success");
    },(error:any)=>{
      console.log(error.error?.message);
      if(error.error?.message){
        this.responseMessage = error.error?.message; 
      }else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.SnackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }


}
