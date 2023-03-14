import { Component, Inject, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { GlobalConstants } from 'src/app/shared/global-constants';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { NouveauteService } from 'src/app/services/nouveaute.service';

@Component({
  selector: 'app-nouveaute',
  templateUrl: './nouveaute.component.html',
  styleUrls: ['./nouveaute.component.scss']
})
export class NouveauteComponent {

  onAddNouveaute = new EventEmitter();
  onEditNouveaute= new EventEmitter();
  nouveauteForm: any = FormGroup;
  dialogAction: any = "Ajouter";
  action: any = "Ajouter";
  responseMessage: any;
  

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBulider: FormBuilder,
    protected nouveauteService: NouveauteService,
    public dialogRef: MatDialogRef<NouveauteComponent>,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.nouveauteForm = this.formBulider.group({
      photo: [null, [Validators.required]],
      description: [null, Validators.required],
      date: [null, Validators.required]
    });
    if (this.dialogData.action === 'Modifier') {
      this.dialogAction = "Modifier";
      this.action = "Modifier";
      this.nouveauteForm.patchValue(this.dialogData.data);
    }
    
  }

 handleSubmit() {
    if (this.dialogAction === "Modifier") {
      this.edit();
    } else {
      this.add();
    }
  }
  add() {
    var formData = this.nouveauteForm.value;
    var data = {
      photo: formData.photo,
      description: formData.description,
      date: formData.date
    }

    this.nouveauteService.add(data).subscribe((response: any) => {
      this.dialogRef.close();
      this.onAddNouveaute.emit();
      this.responseMessage = response.message;
      
      this.snackbarService.openSnackBar(this.responseMessage, "success");
    }, (error) => {
      this.dialogRef.close();
      console.error(error);
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    });
  }
  edit() {
    var formData = this.nouveauteForm.value;
    var data = {
      id: this.dialogData.data.id,
      photo: formData.photo,
      description: formData.description,
      date: formData.date
    }
    this.nouveauteService.update(data).subscribe((response: any) => {
      this.dialogRef.close();
      this.onEditNouveaute.emit();
      this.responseMessage = response.message;
      
      this.snackbarService.openSnackBar(this.responseMessage, "success");
    }, (error) => {
      this.dialogRef.close();
      console.error(error);
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
     
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    });
  }
}
