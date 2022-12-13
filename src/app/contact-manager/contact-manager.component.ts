import { Component, OnInit } from '@angular/core';
import { MyContact } from 'src/models/myContact';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css']
})
export class ContactManagerComponent implements OnInit {

  searchKey:string=''
  allContacts:any=[]
  isLoading:boolean=true
  eMsg:string=''
  constructor(private api:ContactService) { }

  ngOnInit(): void {
    this.getContacts()
  }
  getContacts(){
    this.api.getAllContacts()
    .subscribe((result:any)=>{
      this.allContacts = result
      this.isLoading=false
    },
    (error)=>{
      this.eMsg=error
      this.isLoading=false
    }
    )
  }

  deleteContact(contactId:any){
    this.api.deleteContact(contactId).subscribe((data:MyContact)=>{
      this.getContacts()
    },
    (error:any)=>{
      this.eMsg = error
    })
  }

  search(event:any){
    this.searchKey = event.target.value
  }
}
