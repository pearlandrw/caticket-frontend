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

@Injectable()
export class TicketService {
  private basicAction = 'tickets/';
  //getTicketsUrl: string = "https://ac8ec036-e5a1-4111-bad7-44302de84709.mock.pstmn.io/getServiceTickets";
  getTicketsUrl: string = "http://localhost:8080/serviceDesk/findAll";
  constructor(private http: HttpClient, private backend: BackendService) { }

  getTickets(): Observable<any> {
     return this.http.get(this.getTicketsUrl);
  }

  getTicket(id: number): Observable<Ticket> {
    if (id === 0) {
      return Observable.of(this.initializeTicket());
    };
    const action = `${this.basicAction}${id}?_expand=category`;
    return this.backend.getByQuery(action)
      .map(this.extractData)
      // .do(data => console.log('getProduct: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  deleteTicket(id: number): Observable<Response> {
    const action = `${this.basicAction}${id}`;
    return this.backend.delete(action)
      .catch(this.handleError);
  }

  saveProduct(ticket: Ticket): Observable<Ticket> {
    // let headers = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: headers });

    if (ticket.incident === 0) {
      return this.createTicket(ticket);
    }
    return this.updateTicket(ticket);
  }
  
  private createTicket(ticket: Ticket): Observable<Ticket> {
    ticket.incident = null;
    return this.backend.create(this.basicAction, ticket)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private updateTicket(ticket: Ticket): Observable<Ticket> {
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
    };
  }
}
