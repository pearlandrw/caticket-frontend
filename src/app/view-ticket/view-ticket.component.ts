import { Component, OnInit } from '@angular/core';
import { TicketLog , ELEMENT_DATA} from './view-ticket';

@Component({
  selector: 'app-view-ticket',
  templateUrl: './view-ticket.component.html',
  styleUrls: ['./view-ticket.component.scss']
})


export class ViewTicketComponent implements OnInit {
  pageTitle: string = 'Incident Details';
  log: TicketLog[];
  displayedColumns: string[] = ['createdOn', 'createdBy', 'description'];
  dataSource = ELEMENT_DATA;
  panelOpenState = false;
  
  constructor() { 
  
  }

  ngOnInit(): void {
  }

}
