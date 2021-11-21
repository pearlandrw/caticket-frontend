import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BackendService } from '../_services'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { Ticket } from './ticket';
import { tick } from '@angular/core/testing';
import { NewTicket } from '../createticket/createticket';
import {Router} from '@angular/router';

@Injectable()
export class TicketService {
  newTicketId:number
  private basicAction = 'tickets/';
  //getTicketsUrl: string = "https://ac8ec036-e5a1-4111-bad7-44302de84709.mock.pstmn.io/getServiceTickets";
  getTicketsUrl: string = "http://localhost:8080/serviceDesk/findAll";

getTicketByIdUrl: string = "http://localhost:8080/serviceDesk";
  //getTicketByIdUrl: string ="https://be670619-c132-4121-bb7d-aacda1acb886.mock.pstmn.io/ticket";

  //Create Ticket URL
  createTicketsUrl: string = "http://localhost:8080/serviceDesk/";

  //Close Ticket
  closeTicketUrl : string =  "http://localhost:8080/serviceDesk/addTicketLog/";

  constructor(private http: HttpClient, private backend: BackendService, private router: Router) { }

  getTickets(dealerId:string): Observable<any> {
     return this.http.get(`${this.getTicketsUrl}/${dealerId}`);
  }

  getTicket(id: number): Observable<any> {
    return this.http.get(`${this.getTicketByIdUrl}/${id}`);
  }

  deleteTicket(id: number): Observable<Response> {
    const action = `${this.basicAction}${id}`;
    return this.backend.delete(action)
      .catch(this.handleError);
  }

  closeTicket(id:number, closeDescription: string): Observable<any> {
    return this.http.put(`${this.closeTicketUrl}/${id}`, {"statusRequested":"CLREQ", "description":closeDescription});
  }

  acknowledgeTicket(id:number, ackDescription: string): Observable<any> {
    return this.http.put(`${this.closeTicketUrl}/${id}`, {"statusRequested":"ACK", "description":ackDescription});
  }

  saveTicket(ticket: NewTicket): number {
    // let headers = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: headers });

    if (ticket.incident === 0) {
      return this.createTicket(ticket);
    }
    //return this.updateTicket(ticket);
  }
  
  private createTicket(ticket: NewTicket): number {
     this.http.post(`${this.createTicketsUrl}`, ticket)
     .subscribe({
      next: data => {
        this.router.navigateByUrl('/tickets');
         return data;
      },
      error: error => {
          console.error('There was an error!', error);
      }
  });
  return this.newTicketId;
  }

  private updateTicket(ticket: NewTicket): Observable<Ticket> {
    const action = `${this.basicAction}${ticket.incident}`;
    return this.backend.update(action, ticket)
      .map(() => ticket)
      .catch(this.handleError);
  }

  private extractData(response: Response) {
    let body : any = response.json ? response.json() : response;
    return body.data ? body.data : (body || {});
  }

  private handleError(error: Response): Observable<any> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json() || 'Server error');
  }

  initializeTicket(): Ticket {
    // Return an initialized object
    return {
    incident: 0,
    summary: "",
    dealerId: "",
    dealerName: "",
    description: "",
    userId: "",
    category:"",
    priority:"",
    status:"",
    assignedTo:"",
    openDate: "",
    lastModificationDate: "",
    ticketLogList:[],
    attachments:[]
    };
  }
}
