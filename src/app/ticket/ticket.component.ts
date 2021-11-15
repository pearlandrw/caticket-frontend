import { Component, OnInit, ViewChild } from '@angular/core';

import { Ticket, ELEMENT_DATA } from './ticket';
import { TicketService} from './ticket.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {FormBuilder, FormGroup, FormControl} from '@angular/forms';

import { ConfirmDialog } from '../shared';
import * as _ from 'lodash';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';


@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TicketComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  pageTitle: string = 'Incident Manager';

  showImage: boolean = false;
  listFilter: any = {};
  errorMessage: string;

  tickets: Ticket[];
  ticketList: Ticket[];

  searchPriorities = new FormControl();
  searchPriorityList: string[] = ['Critical', 'Moderate', 'Non-Critical'];
  searchCategories = new FormControl();
  searchCategoryList: string[] = ['Compliance','Credit Card','EC', 'Enrollment', 'FS Integration','CAS','Password Reset','Outages'];
  searchStatusList: string[] = ['Closed', 'Awaiting Dealer Response', 'In-Progress'];;
  searchStatuses = new FormControl();
  searchTicketDateRange = new FormGroup({
    searchTicketStartDate: new FormControl(),
    searchTicketEndDate: new FormControl(),
  });



    displayedColumns = ["incident", "summary", "dealerName", "category", "priority", "status", "userId", "openDate", "lastModificationDate"];
    dataSource: any = null;
    pager: any = {};
    pagedItems: any[];
    searchFilter: any = {};
    selectedOption: string;
   

  constructor(
    private ticketService: TicketService,
    public dialog: MatDialog, public snackBar: MatSnackBar, formBuilder: FormBuilder){

  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
}

freshDataList(tickets: Ticket[]) {
  this.tickets = tickets;

  this.ticketList = tickets.map(e => {
      const ticket = e;
      e["categoryName"] = e["category"]["categoryName"];
      return ticket;
  });

  this.dataSource = new MatTableDataSource(this.tickets);
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}

ngOnInit(): void {
  this.ticketService.getTickets()
      .subscribe(tickets => {
          this.freshDataList(tickets);
      },
      error => this.errorMessage = <any>error);

  this.searchFilter = {};
  this.listFilter = {};
}



getTickets(pageNum?: number) {
  this.ticketService.getTickets()
      .subscribe(tickets => {
          this.freshDataList(tickets);
      },
      error => this.errorMessage = <any>error);
}
  
searchTickets(filters: any) {
  if (filters) {
      this.ticketService.getTickets()
          .subscribe(tickets => {
              this.tickets = tickets;
              console.log(this.tickets.length)
              this.tickets = this.tickets.filter((ticket: Ticket) => {
                  let match = true;

                  Object.keys(filters).forEach((k) => {
                      match = match && filters[k] ?
                          ticket[k] && ticket[k].toLocaleLowerCase().indexOf(filters[k].toLocaleLowerCase()) > -1 : match;
                  })
                  return match;
              });
              this.freshDataList(tickets);
          },
          error => this.errorMessage = <any>error);
  }

}



resetListFilter() {
  this.listFilter = {};
  this.getTickets();
}



reset() {
  this.listFilter = {};
  this.searchFilter = {};
  this.getTickets();
}

resetSearchFilter(searchPanel: any) {
    searchPanel.toggle();
    this.searchFilter = {};
    this.getTickets();
}


openSnackBar(message: string, action: string) {
  this.snackBar.open(message, action, {
      duration: 1500,
  });
}

openDialog(id: number) {
  let dialogRef = this.dialog.open(ConfirmDialog,
      { data: { title: 'Dialog', message: 'Are you sure to delete this item?' } });
  dialogRef.disableClose = true;


  dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;

      if (this.selectedOption === dialogRef.componentInstance.ACTION_CONFIRM) {
          this.ticketService.deleteTicket(id).subscribe(
              () => {
                  this.ticketService.getTickets()
                      .subscribe(tickets => {
                          this.freshDataList(tickets);
                      },
                      error => this.errorMessage = <any>error);
                  this.openSnackBar("The item has been deleted successfully. ", "Close");
              },
              (error: any) => {
                  this.errorMessage = <any>error;
                  console.log(this.errorMessage);
                  this.openSnackBar("This item has not been deleted successfully. Please try again.", "Close");
              }
          );
      }
  });
}
get searchTicketStartDate() { return this.searchTicketDateRange.get('searchTicketStartDate');  }
get searchTicketEndDate() { return this.searchTicketDateRange.get('searchTicketEndDate');  }
}