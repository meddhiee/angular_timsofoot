import { Component, Inject, EventEmitter ,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { JoueurService } from 'src/app/services/joueur.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-category',
  templateUrl: './joueur.component.html',
  styleUrls: ['./joueur.component.scss']
})
export class JoueurComponent implements OnInit {

  onAddJoueur = new EventEmitter();
  onEditJoueur = new EventEmitter();
  joueurForm:any = FormGroup;
  dialogAction:any = "Ajouter";
  action:any = "Ajouter";

responseMessage:any;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
  private formBulider:FormBuilder,
  protected joueurService:JoueurService,
  public dialogRef: MatDialogRef<JoueurComponent>,
  private snackbarService:SnackbarService
  ) { }

  ngOnInit(): void {
    this.joueurForm = this.formBulider.group({
      name:[null,[Validators.required]],
      season:[null,[Validators.required]],
      participations:[null,[Validators.required]],
      buts:[null,[Validators.required]],
      assists:[null,[Validators.required]],
      car_jaune:[null,[Validators.required]],
      car_rouge:[null,[Validators.required]]
    });
    if(this.dialogData.action === 'Modifier'){
      this.dialogAction = "Modifier";
      this.action = "Modifier";
      this.joueurForm.patchValue(this.dialogData.data);
    }
  }

  handleSubmit(){
    if(this.dialogAction === "Modifier"){
      this.edit();
    }else{
      this.add();
    }
  }
  add() {
    var formData = this.joueurForm.value;
    var data = {
      name: formData.name,
      season: formData.season,
      participations: formData.participations,
      buts: formData.buts,
      assists: formData.assists,
      car_jaune: formData.car_jaune,
      car_rouge: formData.car_rouge
    }
    this.joueurService.add(data).subscribe((response:any)=>{
      this.dialogRef.close();
      this.onAddJoueur.emit();
      this.responseMessage = response.message;

      this.snackbarService.openSnackBar(this.responseMessage , "success");
    },(error)=>{
      this.dialogRef.close();
      console.error(error);
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobalConstants.genericError;
      }
      
      this.snackbarService.openSnackBar(this.responseMessage , GlobalConstants.error);
    });
  }
  edit() {
    var formData = this.joueurForm.value;
    var data = {
      id: this.dialogData.data.id,
      name: formData.name,
      season: formData.season,
      participations: formData.participations,
      buts: formData.buts,
      assists: formData.assists,
      car_jaune: formData.car_jaune,
      car_rouge: formData.car_rouge
    }
    this.joueurService.update(data).subscribe((response:any)=>{
      this.dialogRef.close();
      this.onEditJoueur.emit();
      this.responseMessage = response.message;
    
      this.snackbarService.openSnackBar(this.responseMessage , "success");
    },(error)=>{
      this.dialogRef.close();
      console.error(error);
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage , GlobalConstants.error);
    });  
  }
}
