import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyContact } from 'src/models/myContact';
import { MyGroup } from 'src/models/myGroup';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  contact:MyContact = {} as MyContact
  groups:MyGroup[] = [] as MyGroup[]
  eMsg:string = ''
  isLoading:boolean=false
  constructor(private api:ContactService,private router:Router) { }

  ngOnInit(): void {
    //get all groups so that it shoul render inside the selector tag
    this.api.getAllGroup().subscribe((data:any)=>{
      this.groups = data
    })
  }

  addContact(){
    this.api.addContact(this.contact).subscribe((data:MyContact)=>{
      this.isLoading = true
      setTimeout(()=>{
        this.router.navigateByUrl('')
      },2000)

    },
    (error:any)=>{
      this.eMsg = error
    }
    )
  }
}
