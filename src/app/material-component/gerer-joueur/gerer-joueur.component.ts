import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { JoueurService } from 'src/app/services/joueur.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { JoueurComponent } from '../dialog/joueur/joueur.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-manage-category',
  templateUrl: './gerer-joueur.component.html',
  styleUrls: ['./gerer-joueur.component.scss']
})
export class GererJoueurComponent implements OnInit {

  displayedColumns: string[] = ['name','season','participations','buts','assists','car_jaune','car_rouge' , 'edit'];
  dataSource:any;
  responseMessage:any;

  constructor(private joueurService:JoueurService,
    private ngxService: NgxUiLoaderService,
    private dialog:MatDialog,
    private SnackbarService:SnackbarService,
    private router:Router) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
  }
  tableData() {
    this.joueurService.getJoueurs().subscribe((response:any)=>{
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
    const dialogRef = this.dialog.open(JoueurComponent , dialogConfog);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    }); 
    const sub = dialogRef.componentInstance.onAddJoueur.subscribe((response)=>{
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
    const dialogRef = this.dialog.open(JoueurComponent , dialogConfog);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    }); 
    const sub = dialogRef.componentInstance.onEditJoueur.subscribe((response)=>{
      this.tableData();
    })
  }
}
