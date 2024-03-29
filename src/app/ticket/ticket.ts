/*Ticket entity */

import { Time } from '@angular/common';
import { TicketLog , TicketAttachment} from '../view-ticket/view-ticket';

export interface Ticket {
    incident: number;
    summary: string;
    dealerId: string;
    dealerName: string;
    description: string;
    userId: string;
    category:string;
    priority:string;
    status:string;
    assignedTo:string;
    openDate: string;
    lastModificationDate: string;
    ticketLogList :TicketLog[];
    attachments : TicketAttachment[];
}

 
  