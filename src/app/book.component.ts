import { Component, HostListener } from "@angular/core";
import { BookService } from './app.component.service';
import { LocationDetails } from './locationDetails';

@Component({
    templateUrl: './app.component.html'
})

export class BookComponent {
    public books;
    public errorMessage;
    public filteredList;
    public query = '';
    public response;
    public successMessage;
    public locationDetails = new LocationDetails(0, 0, 0);
    public selectedBookId;
    public showFlag = false;
  
    @HostListener('document:keyup', ['$event']) handleKeyUp(event) {
      if (event.keyCode) {
          this.filteredBooks();
      }
    }
  
    constructor(private bookServie: BookService) {
      this.getBooks();
    }

    getBooks() {
        this.bookServie.getBooks().subscribe((result) => {
            this.response = result;
            this.books = result;
        },
        (error) => {
        this.errorMessage = error;
        });
    }
  
    filteredBooks() {
      this.filteredList = [];
      if(this.books != null) {
        if(this.query != '') {
          this.books.forEach(element => {
            if (((element['bookName'].toLowerCase()).search(this.query.toLowerCase()) > -1)||
                (element['author'].toString().toLowerCase().search(this.query.toLowerCase()) > -1 )||
                (element['isbn'].toString().toLowerCase().search(this.query.toLowerCase()) > -1)) {
                    this.filteredList.push(element);
                }
          });
          if (this.filteredList.length > 0) {
            this.books = this.filteredList;
          }else {
            this.books = [];
          }
        }else {
          this.books = this.response;
        }
      }
    }

    createIssue(bookId, bookName) {
        this.bookServie.createIssue(bookId, bookName).subscribe((result) => {
            this.successMessage='Successfully Created';
            this.getBooks();
        },
        (error) => {
            this.errorMessage = 'No data';
        });
    }

    updateIssue(bookId) {
        this.bookServie.updateIssue(bookId).subscribe((result) => {
            this.successMessage='Successfully Updated';
            this.getBooks();
        },
        (error) => {
            this.errorMessage = 'No data';
        });
    }

    updateLocation() {
        this.bookServie.updateLocation(this.selectedBookId, this.locationDetails).subscribe((result) => {
            this.successMessage = 'Successfully updated';
            this.getBooks();
        },
        (error) => {
            this.errorMessage = 'Not updated';
        });

    }

    isLocationFlag(bookId) {
        this.selectedBookId = bookId;
        this.showFlag= !this.showFlag;
    }
}