import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MyContact } from 'src/models/myContact';
import { MyGroup } from 'src/models/myGroup';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
 
  contact:MyContact = {} as MyContact
  groups:MyGroup[] = [] as MyGroup[]
  eMsg:string = ''
  isLoading:boolean=true
  contactId:string  = ''

  constructor(private activatedRoute:ActivatedRoute,private api:ContactService,private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data:any)=>{
      this.contactId = data['contactId']
    })

    if(this.contactId){
      this.api.viewContact(this.contactId).subscribe((data:any)=>{
        this.isLoading=false
        this.contact = data
        this.api.getAllGroup().subscribe((data:any)=>{
          this.groups = data
        })
      },
      (error:any)=>{
        this.eMsg = error
        this.isLoading=false
      }
      )
    }
  }
  updateContact(){
    this.api.updateContact(this.contactId,this.contact).subscribe((data:MyContact)=>{
      this.isLoading=true
      setTimeout(()=>{
        this.router.navigateByUrl('')
      },2000)
    },
    (error:any)=>{
      this.eMsg = error
    })
  }

}
