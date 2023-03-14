import { Injectable } from "@angular/core";


export interface Menu{
    state:string;
    name:string;
    type:string;
    icon:string;
    role:string;
    
}

const MENUITEMS1 = [
    {state:'dashboard' , name:'Dashboard', type:'link', icon:'dashboard', role:'admin'},
    {state:'user' , name:'Gerer Utilisateurs', type:'link', icon:'people', role:'admin'},
    {state:'joueur' , name:'Gerer joueur', type:'link', icon:'assignment_ind', role:'admin'}
   
]
const MENUITEMS2=[
    {state:'details' , name:'Gerer Details', type:'link', icon:'inventory_2', role:'admin'},
    {state:'composition' , name:'Gerer Composition', type:'link', icon:'group_add', role:'admin'},
    {state:'goals' , name:'Gerer Buts', type:'link', icon:'my_location', role:'admin'}

]
const MENUITEMS3=[
    {state:'nouveaute' , name:'Gerer Nouveautés', type:'link', icon:'plus_one', role:'admin'},
    {state:'classement' , name:'Gerer Classement', type:'link', icon:'poll', role:'admin'},
    {state:'galerie' , name:'Gerer Gallerie', type:'link', icon:'add_photo_alternate', role:'admin'},
    {state:'calendrier' , name:'Gerer Calendrier', type:'link', icon:'calendar_today', role:'admin'}
]

@Injectable()
export class MenuItems{
    getMenuitem():Menu[]{
        return MENUITEMS1;
    }
    getMenuitem2():Menu[]{
        return MENUITEMS2;
    }
    getMenuitem3():Menu[]{
        return MENUITEMS3;
    }
}
