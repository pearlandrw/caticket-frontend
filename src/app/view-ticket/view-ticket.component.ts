import { Component, OnInit, Inject } from '@angular/core';
import { TicketLog, TicketAttachment } from './view-ticket';
import { TicketService } from '../ticket/ticket.service';
import { Ticket } from '../ticket/ticket';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {HttpClientModule, HttpClient, HttpRequest, HttpResponse, HttpEventType} from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-ticket',
  templateUrl: './view-ticket.component.html',
  styleUrls: ['./view-ticket.component.scss']
})


export class ViewTicketComponent implements OnInit {
  displayedLogColumns: string[] = ['description', 'createdBy', 'createdOn'];
  displayedAttachmentColumns: string[] = ['docName', 'attachedTimeStamp', 'attachedBy', 'description'];
  logdataSource: TicketLog[];
  attachmentDataSource: TicketAttachment[];
  pageTitle: string = 'Incident Details';
  isTicketDetailLoading: boolean = true;

  panelOpenState = false;
  errorMessage: string;

  ticket: Ticket;
  ticketLog: TicketLog[];
  ticketAttachments: TicketAttachment[];
  ticketId:number;
  isLoading :boolean = true;

  constructor(private ticketService: TicketService, public dialog: MatDialog,private _Activatedroute:ActivatedRoute) {
    this.ticketId  = +this._Activatedroute.snapshot.paramMap.get("id");
  }

  ngOnInit(): void {
    console.log("View Ticket for Incident:"+this.ticketId);
    this.getTicket(this.ticketId);
  }

  getTicket(id: number): void {
    this.isTicketDetailLoading= true;
    this.ticketService
      .getTicket(id)
      .subscribe(ticket => {
        console.log("debug");
        this.onProductRetrieved(ticket);
        this.isTicketDetailLoading= false;
      },
        (error: any) => {(
          this.errorMessage = <any>error);
          this.isTicketDetailLoading= false;
        }
      );
  }

  onProductRetrieved(ticket: Ticket): void {
    console.log(ticket.category);
    this.ticket = ticket;
    this.ticketLog = ticket.ticketLogList;
    this.ticketAttachments = ticket.attachments;
    this.logdataSource = this.ticketLog;
    this.attachmentDataSource = this.ticketAttachments;
  }
  addComment(): void {
    const dialogRef = this.dialog.open(AddCommentDialog, {
      width: '600px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Comment dialog closed');

    });
  }
  addAttachment(): void {
    const dialogRef = this.dialog.open(AddAttachmentDialog, {
      width: '600px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Attachment dialog closed');

    });
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'addComment.html',
  styleUrls: ['./addComment.scss']
})
export class AddCommentDialog {
  constructor(
    public dialogRef: MatDialogRef<AddCommentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: CommentDialogData,
  ) { }

  onCancel(): void {
    this.dialogRef.close();
  }

  onOk(): void {
    console.log(this.data.comment);
    //TODO Add Comment
    this.dialogRef.close();
  }
}
export interface CommentDialogData {
  comment: string;
}

@Component({
  selector: 'attachment-dialog',
  templateUrl: 'addAttachment.html',
  styleUrls: ['./addAttachment.scss']
})
export class AddAttachmentDialog {
  percentDone: number;
  constructor(
    public dialogRef: MatDialogRef<AddAttachmentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: AttachmentDialogData,
    private http: HttpClient, 
  ) { }

  onCancel(): void {
    this.dialogRef.close();
  }

  onOk(): void {
    console.log(this.data.documentName);
    console.log(this.data.document);
    console.log(this.data.description);
    //TODO addAttachment Endpoint
    this.dialogRef.close();

  }

  upload(files: File[]){
    this.uploadAndProgress(files);
  }

  
  uploadAndProgress(files: File[]){
    console.log(files)
    var formData = new FormData();
    Array.from(files).forEach(f => {
      formData.append('file',f)
      this.data.documentName = f.name;
      this.data.document = f.arrayBuffer;
    })
    
    this.http.post('https://file.io', formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.percentDone = Math.round(100 * event.loaded / event.total);
        } 
    });
  }

}
export interface AttachmentDialogData {
  documentName: string;
  attachedOn: string;
  attachedBy: string;
  description: string;
  document : any;
}