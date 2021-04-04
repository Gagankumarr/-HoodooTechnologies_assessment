import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{ DeliveryComponent } from './components/delivery/delivery.component';
import {DineoutComponent} from './components/dineout/dineout.component';
import {NightlifeComponent} from './components/nightlife/nightlife.component'
const routes: Routes = [
  {
    path:'',
    component:DeliveryComponent
  },
  {
    path:'delivery',
    component: DeliveryComponent
  },
  {
    path: 'dineout',
    component: DineoutComponent
  },
  {
    path:'nightlife',
    component: NightlifeComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
