import { Component, OnInit, ViewChild, Inject } from '@angular/core';

import { Ticket } from './ticket';
import { TicketService } from './ticket.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ConfirmDialog } from '../shared';
import * as _ from 'lodash';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TicketComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  pageTitle: string = 'Incident Manager';

  showImage: boolean = false;
  isLoading: boolean = true;
  listFilter: any = {};
  errorMessage: string;

  tickets: Ticket[];
  ticketList: Ticket[];

  searchPriorities = new FormControl();
  searchPriorityList: string[] = ['Critical', 'Moderate', 'Non-Critical'];
  searchCategories = new FormControl();
  searchCategoryList: string[] = ['Compliance', 'Credit Card', 'EC', 'Enrollment', 'FS Integration', 'CAS', 'Password Reset', 'Outages'];
  searchStatusList: string[] = ['Closed', 'Awaiting Dealer Response', 'In-Progress'];;
  searchStatuses = new FormControl();
  searchTicketDateRange = new FormGroup({
    searchTicketStartDate: new FormControl(),
    searchTicketEndDate: new FormControl(),
  });



  displayedColumns = ["incident", "summary", "dealerName", "category", "priority", "status", "userId", "openDate", "lastModificationDate", "actions"];
  dataSource: any = null;
  pager: any = {};
  pagedItems: any[];
  searchFilter: any = {};
  selectedOption: string;


  constructor(
    private ticketService: TicketService,
    public dialog: MatDialog, public snackBar: MatSnackBar, formBuilder: FormBuilder) {

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
      // e["categoryName"] = e["category"]["categoryName"];
      return e;
    });

    this.dataSource = new MatTableDataSource(this.tickets);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    console.log("dealerId" + localStorage.getItem("dealerId"));
    this.ticketService.getTickets(localStorage.getItem("dealerId"))
      .subscribe(tickets => {
        this.isLoading = false;
        this.freshDataList(tickets);
      },
        error => {
          this.isLoading = false;
          this.errorMessage = <any>error;

        });

    this.searchFilter = {};
    this.listFilter = {};
  }

  getTickets(pageNum?: number) {
    this.isLoading = true;
    this.ticketService.getTickets(localStorage.getItem("dealerId"))
      .subscribe(tickets => {
        this.freshDataList(tickets);
        this.isLoading = false;
      },
        error =>{
          this.errorMessage = <any>error;
          this.isLoading = false;
      });
  }

  searchTickets(filters: any) {
    console.log("Summary:" + this.searchFilter.summary);
    console.log("Incident:" + this.searchFilter.incident);
    console.log("Dealer:" + this.searchFilter.dealer);
    console.log("CreatedBy:" + this.searchFilter.createdBy);
    console.log("Priorities:" + this.searchPriorities.value);
    console.log("Categories:" + this.searchCategories.value);
    console.log("Statuses:" + this.searchStatuses.value);
    console.log("Ticket Start Date:" + this.searchTicketStartDate.value);
    console.log("Ticket End Date:" + this.searchTicketEndDate.value);
    if (filters) {
      this.ticketService.getTickets(localStorage.getItem("dealerId"))
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
  closeticket(incident: number) {
    console.log("Request close:" + incident);
    this.ticketService.closeTicket(incident, "Closing this ticket");
    this.reset();

  }
  openRequestCloseComment(incident: number) {
    console.log("openRequestCloseComment incident:" + incident);
    const dialogRef = this.dialog.open(AddRequestCloseCommentDialog, {
      width: '600px',
      data: {
        "incident": incident,
        "comment": ""
      },
    });

    dialogRef.afterClosed().subscribe(result => {
     console.log('Request Close Comment dialog closed');
      this.getTickets(1);
    });

  }
  
  openNeedInputComment(incident: number) {
    console.log("openNeedInputComment incident:" + incident);
    const dialogRef = this.dialog.open(NeedInputCommentDialog, {
      width: '600px',
      data: {
        "incident": incident,
        "comment": ""
      },
    });

    dialogRef.afterClosed().subscribe(result => {
     console.log('Request Close Comment dialog afterClosed Method');
      this.getTickets(1);
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
            this.ticketService.getTickets(localStorage.getItem("dealerId"))
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
  get searchTicketStartDate() { return this.searchTicketDateRange.get('searchTicketStartDate'); }
  get searchTicketEndDate() { return this.searchTicketDateRange.get('searchTicketEndDate'); }
}
/* Request to close Component */

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'addRequestCloseComment.html'
})
export class AddRequestCloseCommentDialog {
  constructor(private ticketService: TicketService,
    public dialogRef: MatDialogRef<AddRequestCloseCommentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: AddRequestCloseCommentDialogData
  ) { }

  onRequestCloseCancel(): void {
    this.dialogRef.close();
  }

  onRequestCloseOk(): void {
    console.log("comment" + this.data.comment);
    console.log("incident" + this.data.incident);
    this.dialogRef.close();
    this.ticketService.closeTicket(this.data.incident, this.data.comment).subscribe(tickets => {
        
        console.log("closeTicket successful "+this.data.incident);
    },
      error => {
        console.log("error closeTicket "+this.data.incident);
      });
    }
}
export interface AddRequestCloseCommentDialogData {
  comment: string;
  incident: number;
}

/*Need Input Component*/ 

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'needInputComment.html'
})
export class NeedInputCommentDialog {
  constructor(private ticketService: TicketService,
    public dialogRef: MatDialogRef<NeedInputCommentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: NeedInputCommentDialogData
  ) { }

  onNeedInputCancel(): void {
    this.dialogRef.close();
  }

  onNeedInputOk(): void {
    console.log("comment" + this.data.comment);
    console.log("incident" + this.data.incident);
    this.dialogRef.close();
    this.ticketService.acknowledgeTicket(this.data.incident, this.data.comment).subscribe(tickets => {
        
        console.log("acknowledgeTicket successful "+this.data.incident);
    },
      error => {
        console.log("error acknowledgeTicket "+this.data.incident);
      });
    }
}
export interface NeedInputCommentDialogData {
  comment: string;
  incident: number;
}