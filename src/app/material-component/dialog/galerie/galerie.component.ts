import { Component, Inject, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { GlobalConstants } from 'src/app/shared/global-constants';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GalerieService } from 'src/app/services/galerie.service';

@Component({
  selector: 'app-galerie',
  templateUrl: './galerie.component.html',
  styleUrls: ['./galerie.component.scss']
})
export class GalerieComponent {
  onAddGalerie = new EventEmitter();
  onEditGalerie = new EventEmitter();
  galerieForm: any = FormGroup;
  dialogAction: any = "Ajouter";
  action: any = "Ajouter";
  responseMessage: any;
  

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBulider: FormBuilder,
    protected galerieService: GalerieService,
    public dialogRef: MatDialogRef<GalerieComponent>,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.galerieForm = this.formBulider.group({
      photo: [null, [Validators.required]],
      titre: [null, Validators.required],
      date: [null, Validators.required]
    });
    if (this.dialogData.action === 'Modifier') {
      this.dialogAction = "Modifier";
      this.action = "Modifier";
      this.galerieForm.patchValue(this.dialogData.data);
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
    var formData = this.galerieForm.value;
    var data = {
      photo: formData.photo,
      titre: formData.titre,
      date: formData.date
    }

    this.galerieService.add(data).subscribe((response: any) => {
      this.dialogRef.close();
      this.onAddGalerie.emit();
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
    var formData = this.galerieForm.value;
    var data = {
      id: this.dialogData.data.id,
      photo: formData.photo,
      titre: formData.titre,
      date: formData.date
    }
    this.galerieService.update(data).subscribe((response: any) => {
      this.dialogRef.close();
      this.onEditGalerie.emit();
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
