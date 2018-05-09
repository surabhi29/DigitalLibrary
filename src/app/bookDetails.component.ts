import { Component } from "@angular/core";
import { BookService } from './app.component.service';
import { ActivatedRoute } from "@angular/router";
import { LocationDetails } from './locationDetails';

@Component({
    template: `
    <div style="padding: 20px">
        <div class="title">Location Details:-</div>
        <div *ngIf="errorMessage == null">
            <span>Shelf Number: {{bookLocation?.shelfNumber}}</span>
            <span style="margin: 0px 20px 0px 20px">Row Number: {{bookLocation?.rowNumber}}</span>
            <span>Column Number: {{bookLocation?.columnNumber}}</span>
        </div>
        <div *ngIf="errorMessage">{{errorMessage}}</div>
    </div>
    <div class="bookIssueDetails">
        <div class="headingIssue">
            <div class="title">Book Details:-</div>
            <div><a [routerLink]="['']">BACK</a></div>
        </div>
        <div>
            <table>
                <thead>
                    <th style="width:33.33%">PERSON NAME</th>
                    <th style="width:33.33%">ISSUE DATE</th>
                    <th style="width:33.33%">TO DATE</th>
                </thead>
            </table>
        </div>
        <div *ngIf="(bookHistory?.length > 0)">
            <table>
                <tr *ngFor="let data1 of bookHistory">
                    <td style="width:33.33%">{{data1.personName}}</td>
                    <td style="width:33.33%">{{data1.issueDate}}</td>
                    <td style="width:33.33%">{{data1.toDate}}</td>
                </tr>
            </table>
        </div>
        <div *ngIf="!(bookHistory?.length > 0)">
            <table>
                <tr style="text-align: center">
                     No Data
                </tr>
            </table>
        </div>
    </div>
    `
})

export class BookDetailsComponent {

    public bookHistory;
    public selectedBookId;
    public errorMessage;
    public bookLocation:LocationDetails;

    constructor(private bookService: BookService, private route: ActivatedRoute) {
        const bookId = route.pathFromRoot[1].snapshot.url[0].path;
        this.getBookIssueHistory(bookId);
        this.getBookLocation(bookId);
        
    }

    getBookIssueHistory(bookId) {
        this.selectedBookId = bookId;
        this.bookService.getBookIssueHistory(bookId).subscribe((result) => {
          this.bookHistory = result;
        },
        (error) => {
          this.errorMessage = error;
        });
    }

    getBookLocation(bookId) {
        this.bookService.getBookLocation(bookId).subscribe((result) => {
            this.bookLocation = <LocationDetails>result;
        },
        (error) => {
            this.errorMessage = "Not Found";
        });
    }

}