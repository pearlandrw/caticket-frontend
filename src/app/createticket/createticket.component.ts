import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { Ticket } from '../ticket/ticket';
import { TicketLog, TicketAttachment } from '../view-ticket/view-ticket';
import {NewTicket} from './createticket';
import { TicketService } from '../ticket/ticket.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-createticket',
  templateUrl: './createticket.component.html',
  styleUrls: ['./createticket.component.scss']
})
export class CreateticketComponent implements OnInit {
  pageTitle: string = 'Create New Incident';
  newTicket: NewTicket;
  dealerName:string;
  constructor(private ticketService: TicketService, private router: Router) { }

  ngOnInit(): void {
    this.dealerName = "Michigan Dealer Name"; //TODO Parameterize
    this.newTicket =this.initializeTicket();
  }

  initializeTicket(): NewTicket {
    return {
    incident:0,
    summary: "",
    dealerId: localStorage.getItem("dealerId"),
    userName: localStorage.getItem("userName"), 
    userId:localStorage.getItem("userId"),
    category:"",
    priority:"",
    status:"",
    openDate:"",
    lastModificationDate:"",
    description: "",
    reportingmethod:"",
    groupName:"",
    dealId:"",
    contractConversationId:"",
    oldCreditAppCvrsId:"",
    newCreditAppCvrsId:"",
    ticketLogList:[],
    attachments: []
    
    //dms: "",
    //fs:"",
    };
  }

  createNewTicket(): void{
    this.ticketService.saveTicket(this.newTicket);
    console.log("Ticket Saved:"+this.newTicket.category);
  }

  addAttachment(): void{
    
  }

}
