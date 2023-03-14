import { Component, Inject, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { GlobalConstants } from 'src/app/shared/global-constants';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { CalendrierService } from 'src/app/services/calendrier.service';

@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.scss']
})
export class CalendrierComponent {
  onAddCalendrier = new EventEmitter();
  onEditCalendrier = new EventEmitter();
  calendrierForm: any = FormGroup;
  dialogAction: any = "Ajouter";
  action: any = "Ajouter";
  responseMessage: any;
  

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBulider: FormBuilder,
    protected calendrierService: CalendrierService,
    public dialogRef: MatDialogRef<CalendrierComponent>,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.calendrierForm = this.formBulider.group({
      eq_timsoft: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      eq_adv: [null, Validators.required],
      jour: [null, Validators.required],
      mois: [null, Validators.required],
      annee: [null, Validators.required],
    
      league: [null, Validators.required],
      temps: [null, Validators.required]
    });
    if (this.dialogData.action === 'Modifier') {
      this.dialogAction = "Modifier";
      this.action = "Modifier";
      this.calendrierForm.patchValue(this.dialogData.data);
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
    var formData = this.calendrierForm.value;
    var data = {
      eq_timsoft: formData.eq_timsoft,
      eq_adv: formData.eq_adv,
      jour: formData.jour,
      mois: formData.mois,
      annee: formData.annee,
      league: formData.league,
      temps: formData.temps
    }

    this.calendrierService.add(data).subscribe((response: any) => {
      this.dialogRef.close();
      this.onAddCalendrier.emit();
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
    var formData = this.calendrierForm.value;
    var data = {
      id: this.dialogData.data.id,
      eq_timsoft: formData.eq_timsoft,
      eq_adv : formData.eq_adv,
      jour: formData.jour,
      mois:formData.mois,
      annee:formData.annee,

      league:formData.league,
      temps:formData.temps
    }
    this.calendrierService.update(data).subscribe((response: any) => {
      this.dialogRef.close();
      this.onEditCalendrier.emit();
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

