import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: {firstName: string,lastName: string, age:number, gender:string,id: string};

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = {
      firstName:this.route.snapshot.params['firstName'],
      lastName:this.route.snapshot.params['lastName'],
      age:this.route.snapshot.params['age'],
      gender:this.route.snapshot.params['gender'],
      id:this.route.snapshot.params['id']
    };
    this.route.params.subscribe(
      (params:Params)=>{
        this.user.firstName = params['firstName'];
        this.user.lastName = params['lastName'];
        this.user.age = params['age'];
        this.user.gender = params['gender']
        this.user.id = params['id'];
      }
    );
  }

}
