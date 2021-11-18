/*Ticket entity */

import { Time } from '@angular/common';
import { TicketLog , TicketAttachment} from '../view-ticket/view-ticket';

export interface NewTicket {
    createdBy:string;
    summary: string;
    dealerId: string;
    dealerName: string;
    description: string;
    userId: string;
    category:string;
    dms:string;
    fs:string;
    country: string;
    dealNumber: string;
    conversationId: string;
    creditappConversationId: string;
    attachments : TicketAttachment[];
}

 
  