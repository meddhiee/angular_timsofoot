import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialRoutes } from './material.routing';
import { MaterialModule } from '../shared/material-module';
import { ConfirmationComponent } from './dialog/confirmation/confirmation.component';
import { ChangePasswordComponent } from './dialog/change-password/change-password.component';
import {GererJoueurComponent}from './gerer-joueur/gerer-joueur.component';
import { JoueurComponent } from './dialog/joueur/joueur.component';
import {GererDetailsComponent}from './gerer-details/gerer-details.component';
import { DetailsComponent } from './dialog/details/details.component';
import { SuppressionComponent } from './dialog/suppression/suppression.component';
import { GererUtilisateurComponent } from './gerer-utilisateur/gerer-utilisateur.component';
import { GererCalendrierComponent } from './gerer-calendrier/gerer-calendrier.component';
import { CalendrierComponent } from './dialog/calendrier/calendrier.component';
import { GalerieComponent } from './dialog/galerie/galerie.component';
import { GererGalerieComponent } from './gerer-galerie/gerer-galerie.component';
import { GererNouveauteComponent } from './gerer-nouveaute/gerer-nouveaute.component';
import { NouveauteComponent } from './dialog/nouveaute/nouveaute.component';
import { ClassementComponent } from './dialog/classement/classement.component';
import { GererClassementComponent } from './gerer-classement/gerer-classement.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule
  ],
  providers: [],
  declarations: [

    ConfirmationComponent,
    SuppressionComponent,
    ChangePasswordComponent,
    GererJoueurComponent,
    JoueurComponent,
    GererDetailsComponent,
    DetailsComponent,
    GererUtilisateurComponent,
    GererCalendrierComponent,
    CalendrierComponent,
    GalerieComponent,
    GererGalerieComponent,
    GererNouveauteComponent,
    NouveauteComponent,
    ClassementComponent,
    GererClassementComponent
  ]
})
export class MaterialComponentsModule {}
