import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css']
})
export class ViewContactComponent implements OnInit {

  contactId:string=''
  contactDetails:any
  groupId:string=''
  groupName:string=''
  isLoading:boolean=true
  errorMsg:string=''
  constructor(private activatedRoute:ActivatedRoute,private api:ContactService) { }
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((result:any)=>{    
      this.contactId = result.contactId
    })
    this.api.viewContact(this.contactId)
    .subscribe((result:any)=>{
      this.isLoading=false
      this.contactDetails = result
      this.groupId = result.groupId
      console.log(this.groupId);
      this.api.getGroup(this.groupId)
    .subscribe((result:any)=>{
      console.log(result);
      
      this.groupName = result.name
    })
    },
    (error)=>{
      this.errorMsg=error
      this.isLoading=false
    }
    )
    

  }

}
