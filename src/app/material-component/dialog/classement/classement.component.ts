import { Component, Inject, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { GlobalConstants } from 'src/app/shared/global-constants';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ClassementService } from 'src/app/services/classement.service';

@Component({
  selector: 'app-classement',
  templateUrl: './classement.component.html',
  styleUrls: ['./classement.component.scss']
})
export class ClassementComponent {

  onAddClassement = new EventEmitter();
  onEditClassement= new EventEmitter();
  classementForm: any = FormGroup;
  dialogAction: any = "Ajouter";
  action: any = "Ajouter";
  responseMessage: any;
  

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBulider: FormBuilder,
    protected classementService: ClassementService,
    public dialogRef: MatDialogRef<ClassementComponent>,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.classementForm = this.formBulider.group({
      league: [null, [Validators.required]],
      saison: [null, Validators.required],
      pos: [null, Validators.required],
      mj: [null, Validators.required],
      mg: [null, Validators.required],
      mn: [null, Validators.required],
      mp: [null, Validators.required],
      bp: [null, Validators.required],
      bc: [null, Validators.required],
      db: [null, Validators.required],
      pts: [null, Validators.required]
    });
    if (this.dialogData.action === 'Modifier') {
      this.dialogAction = "Modifier";
      this.action = "Modifier";
      this.classementForm.patchValue(this.dialogData.data);
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
    var formData = this.classementForm.value;
    var data = {
      league: formData.photo,
      saison: formData.description,
      pos: formData.date,
      mj: formData.date,
      mg: formData.date,
      mn: formData.date,
      mp: formData.date,
      bp: formData.date,
      bc: formData.date,
      db: formData.date,
      pts: formData.date,
    }

    this.classementService.add(data).subscribe((response: any) => {
      this.dialogRef.close();
      this.onAddClassement.emit();
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
    var formData = this.classementForm.value;
    var data = {
      id: this.dialogData.data.id,
      league: formData.photo,
      saison: formData.description,
      pos: formData.date,
      mj: formData.date,
      mg: formData.date,
      mn: formData.date,
      mp: formData.date,
      bp: formData.date,
      bc: formData.date,
      db: formData.date,
      pts: formData.date,
    }
    this.classementService.update(data).subscribe((response: any) => {
      this.dialogRef.close();
      this.onEditClassement.emit();
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
