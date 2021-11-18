import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { Ticket } from '../ticket/ticket';
import { TicketLog, TicketAttachment } from '../view-ticket/view-ticket';
import {NewTicket} from './createticket';



@Component({
  selector: 'app-createticket',
  templateUrl: './createticket.component.html',
  styleUrls: ['./createticket.component.scss']
})
export class CreateticketComponent implements OnInit {
  pageTitle: string = 'Create New Incident';
  newTicket: NewTicket;
  constructor() { }

  ngOnInit(): void {
    this.newTicket =this.initializeTicket();
  }

  initializeTicket(): NewTicket {
    return {
    createdBy:"John Brenan", //TODO Logged In User
    summary: "",
    dealerId: "",
    dealerName: "Southfield Toyota", //TODO Selected Dealership
    description: "",
    userId: "",
    category:"",
    dms: "",
    fs:"",
    country: "US", //Dealer Country of origin
    dealNumber: "",
    conversationId: "",
    creditappConversationId: "",
    attachments: []
    };
  }

}
