/*Ticket entity */

import { Time } from '@angular/common';

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
}
export const ELEMENT_DATA: Ticket[] = [
    {
        incident: 1360748,
          summary: "Enrollment - Dealer gets an error",
          dealerId: "XL1HX",
          dealerName: "Sellers Subaru",
          description: "Dealer had FMC dealer , but gets a DPA error when accesing routeOne.",
          userId: "ecuser1",
          category: "Enrollment.Set Up",
          priority: "2 Moderate",
          status: "In Progress",
          assignedTo: "Test User",
          openDate: "11/13/2021 01:50 pm",
          lastModificationDate: '11/13/2021 01:55pm'
    },
    {
        incident: 1360748,
        summary: "Enrollment - Dealer gets an error",
          dealerId: "XL1HX",
          dealerName: "Sellers Subaru",
          description: "Dealer had FMC dealer , but gets a DPA error when accesing routeOne.",
          userId  : "ecuser1",
          category: "Enrollment.Set Up",
          priority: "2 Moderate",
          status: "In Progress",
          assignedTo: "Test User",
          openDate: "11/13/2021 01:50 pm",
          lastModificationDate: "11/13/2021 01:52 pm"
      },
  ];
  