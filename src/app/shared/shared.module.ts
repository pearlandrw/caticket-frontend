import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TicketService } from '../ticket/ticket.service';

@NgModule({
  imports: [CommonModule],
  exports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers : [TicketService]
})
export class SharedModule {}
