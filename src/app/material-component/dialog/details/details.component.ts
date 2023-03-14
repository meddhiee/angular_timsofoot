import { Component, Inject, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DetailsService } from 'src/app/services/details.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  onAddDetails = new EventEmitter();
  onEditDetails = new EventEmitter();
  detailsForm: any = FormGroup;
  dialogAction: any = "Ajouter";
  action: any = "Ajouter";
  responseMessage: any;
  

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBulider: FormBuilder,
    protected detailsService: DetailsService,
    public dialogRef: MatDialogRef<DetailsComponent>,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.detailsForm = this.formBulider.group({
      eq_timsoft: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      eq_adversaire: [null, Validators.required],
      score_timsoft: [null, Validators.required],
      score_adversaire: [null, Validators.required],
      date: [null, Validators.required],
      time: [null, Validators.required],
      league: [null, Validators.required],
      season: [null, Validators.required],
      logo: [null, Validators.required],
      cj_timsoft: [null, Validators.required],
      cj_adv: [null, Validators.required],
      cr_timsoft: [null, Validators.required],
      cr_adv: [null, Validators.required]
    });
    if (this.dialogData.action === 'Modifier') {
      this.dialogAction = "Modifier";
      this.action = "Modifier";
      this.detailsForm.patchValue(this.dialogData.data);
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
    var formData = this.detailsForm.value;
    var data = {
      eq_timsoft: formData.eq_timsoft,
      eq_adversaire: formData.eq_adversaire,
      score_timsoft: formData.score_timsoft,
      score_adversaire: formData.score_timsoft,
      date: formData.date,
      time: formData.time,
      league: formData.league,
      season: formData.season,
      buts_timsoft: formData.buts_timsoft,
      buts_adversaire: formData.buts_adversaire,
      cj_timsoft: formData.cj_timsoft,
      cj_adv: formData.cj_adv,
      cr_timsoft: formData.cr_timsoft,
      cr_adv: formData.cr_adv
    }

    this.detailsService.add(data).subscribe((response: any) => {
      this.dialogRef.close();
      this.onAddDetails.emit();
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
    var formData = this.detailsForm.value;
    var data = {
      id: this.dialogData.data.id,
      eq_timsoft: formData.eq_timsoft,
      eq_adversaire : formData.categoryId,
      score_timsoft: formData.score_timsoft,
      score_adversaire:formData.score_adversaire,
      date:formData.date,
      time:formData.time,
      league:formData.league,
      season:formData.season,
      buts_timsoft:formData.buts_timsoft,
      buts_adversaire:formData.buts_adversaire,
      cj_timsoft:formData.cj_timsoft,
      cj_adv:formData.cj_adv,
      description:formData.description,
      cr_timsoft:formData.cr_timsoft
    }
    this.detailsService.update(data).subscribe((response: any) => {
      this.dialogRef.close();
      this.onEditDetails.emit();
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
