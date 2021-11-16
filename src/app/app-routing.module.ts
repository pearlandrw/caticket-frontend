import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_guard';
import { NotFoundPageComponent } from './notfoundpage';
import { LoginComponent } from './login';
import { LoadingComponent } from './loading';
import { CreateticketComponent } from './createticket/createticket.component';
import { ViewTicketComponent } from './view-ticket/view-ticket.component';

// const routes: Routes = [];

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "loading",
    component: LoadingComponent,
  },
  {
    path: "products",
    loadChildren: () =>
    import('./product/product.module').then(m => m.ProductModule)
    , canActivate: [AuthGuard]
  },
  { 
    path: "tickets/view/:id", 
    component: ViewTicketComponent },
  {
    path: "tickets",
    loadChildren: () =>
    import('./ticket/ticket.module').then(m => m.TicketModule)
  },
  { 
    path: "tickets/new", 
    component: CreateticketComponent},
  { 
    path: "**", 
    component: NotFoundPageComponent},
  // ]
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
