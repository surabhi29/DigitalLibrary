import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BookService {
  constructor(private http: HttpClient) {}
  
  getBooks(): Observable<any> {
    return this.http.get(environment.server_url + 'books');
  }

  getBookIssueHistory(bookId) {
    return this.http.get(environment.server_url + 'books/' + bookId + '/issue-history');
  }

  createIssue(bookId, bookName) {  
    return this.http.post(environment.server_url + 'books/' + bookId + '/issue?name=' + bookName, null);
  }

  updateIssue(bookId) {
    return this.http.put(environment.server_url + 'books/' + bookId + '/issue', null);
  }

  updateLocation(bookId, locationDetails) {
    return this.http.put(environment.server_url + 'books/' + bookId + '/location', locationDetails);
  }

  getBookLocation(bookId) {
    return this.http.get(environment.server_url + 'books/' + bookId + '/location');
  }
}
