import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AccueilComponent } from './accueil.component';
import { MaterialModule } from '../shared/material-module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(AccueilComponent)
  ],
  declarations: [AccueilComponent]
})
export class AccueilComponent { }
