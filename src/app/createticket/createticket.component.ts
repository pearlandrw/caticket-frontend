import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-createticket',
  templateUrl: './createticket.component.html',
  styleUrls: ['./createticket.component.scss']
})
export class CreateticketComponent implements OnInit {
  pageTitle: string = 'Create New Incident';
  constructor() { }

  ngOnInit(): void {
  }

}
