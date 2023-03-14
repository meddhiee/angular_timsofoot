import { Routes } from '@angular/router';
import { RouteGuardService } from '../services/route-guard.service';
import { GererCalendrierComponent } from './gerer-calendrier/gerer-calendrier.component';
import { GererDetailsComponent } from './gerer-details/gerer-details.component';
import { GererGalerieComponent } from './gerer-galerie/gerer-galerie.component';
import {GererJoueurComponent} from './gerer-joueur/gerer-joueur.component'
import { GererNouveauteComponent } from './gerer-nouveaute/gerer-nouveaute.component';
import { GererUtilisateurComponent } from './gerer-utilisateur/gerer-utilisateur.component';

export const MaterialRoutes: Routes = [
    {
        path:'joueur',
        component:GererJoueurComponent,
        canActivate:[RouteGuardService],
        data:{
            expectedRole: ['admin']
        }

    },
    {
        path:'details',
        component:GererDetailsComponent,
        canActivate:[RouteGuardService],
        data:{
            expectedRole: ['admin']
        },

    },
    {
        path:'user',
        component:GererUtilisateurComponent,
        canActivate:[RouteGuardService],
        data:{
            expectedRole: ['admin']
        },
    },
    {
        path:'calendrier',
        component:GererCalendrierComponent,
        canActivate:[RouteGuardService],
        data:{
            expectedRole: ['admin']
        },
    },
    {
        path:'galerie',
        component:GererGalerieComponent,
        canActivate:[RouteGuardService],
        data:{
            expectedRole: ['admin']
        },
    },
    {
        path:'nouveaute',
        component:GererNouveauteComponent,
        canActivate:[RouteGuardService],
        data:{
            expectedRole: ['admin']
        },
    }
];
