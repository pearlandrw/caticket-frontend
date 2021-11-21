/*Ticket entity */

import { Time } from '@angular/common';
import { TicketLog , TicketAttachment} from '../view-ticket/view-ticket';

export interface NewTicket {
    incident: number;
    summary: string;
    dealerId: string;
    userName: string,
    userId: string,
    category: string,
    priority: string,
    status: string,
    openDate: string,
    lastModificationDate:string,
    description: string,
    reportingmethod:string,
    groupName:string,
    dealId:string,
    contractConversationId:string,
    oldCreditAppCvrsId:string,
    newCreditAppCvrsId:string,
    ticketLogList:any[],
    attachments:TicketAttachment[];
}

 
  