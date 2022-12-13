import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MyContact } from 'src/models/myContact';
import {catchError, throwError,Observable } from 'rxjs'
import { MyGroup } from 'src/models/myGroup';
@Injectable({
  providedIn: 'root'
})
export class ContactService {

  baseURL = "http://localhost:3000"
  constructor(private http:HttpClient) { }

  getAllContacts():Observable<MyContact>{
    let url:string = `${this.baseURL}/contacts`

    return this.http.get<MyContact>(url).pipe(catchError(this.handleError))
  }

  viewContact(contactId:string):Observable<MyContact>{
    let url:string = `${this.baseURL}/contacts/${contactId}`
    return this.http.get<MyContact>(url).pipe(catchError(this.handleError))
  }

  addContact(contact:MyContact):Observable<MyContact>{
    let url:string = `${this.baseURL}/contacts`
    return this.http.post<MyContact>(url,contact).pipe(catchError(this.handleError))
  }

  updateContact(contactId:string,contact:MyContact):Observable<MyContact>{
    let url:string = `${this.baseURL}/contacts/${contactId}`
    return this.http.put<MyContact>(url,contact).pipe(catchError(this.handleError))
  }

  deleteContact(contactId:string):Observable<MyContact>{
    let url:string = `${this.baseURL}/contacts/${contactId}`
    return this.http.delete<MyContact>(url).pipe(catchError(this.handleError))
  }

  getAllGroup():Observable<MyGroup>{
    let url:string = `http://localhost:3000/groups`
    return this.http.get<MyGroup>(url).pipe(catchError(this.handleError))

  }
  getGroup(id:string):Observable<MyGroup>{
    let url:string = `http://localhost:3000/groups/${id}`
    return this.http.get<MyGroup>(url).pipe(catchError(this.handleError))
  }
  handleError(error:HttpErrorResponse){
    let errorMsg:string=''
    if(error.error instanceof ErrorEvent){
      //client error
      errorMsg= `Error: ${error.error.message}`
    }
    else{
      errorMsg= `Status: ${error.status} \n Error: ${error.message}`
    }
    return throwError(errorMsg)
  }

}
