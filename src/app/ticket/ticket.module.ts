import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

import { TicketComponent } from "./ticket.component";
import { TicketService } from "./ticket.service";
import { SharedModule } from "../shared/shared.module";
import { MaterialModule } from "../shared/material.module";

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild([
      { path: "", component: TicketComponent },
      {
        path: "edit/:id",
        canDeactivate: [],
        component: TicketComponent
      }
    ])
  ],
  declarations: [
      TicketComponent,   TicketComponent
  ],
  providers: [TicketService],
  exports: [
    TicketComponent,
    TicketComponent,
  ]
})
export class TicketModule { }
