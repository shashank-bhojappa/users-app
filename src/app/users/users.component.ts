import { Component,OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators'
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users = [
    {
      id: 1,
      name: 'User1'
    },
    {
      id: 2,
      name: 'User2'
    },
    {
      id: 3,
      name: 'User3'
    }
  ];
  @ViewChild('postForm', {static: false}) postForm: NgForm;

  loadedPosts:Post[] = [];
  isFetching = false;
  singlehobbies = '';
  singleFirstName = '';
  singleLastName = '';
  singleAge:number;
  singleGender = '';
  singlePost = false;
  update = false;
  fetchSingle = false;
  fetchAll = false;

  constructor(private http: HttpClient, private postsService:PostsService) {}

  ngOnInit() {
    //this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    this.postsService.createAndStorePost(postData.firstName,postData.lastName,postData.age,postData.gender,postData.hobbies)
    // Send Http request
    this.postForm.resetForm();
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts()
  }

  onClearPosts() {
    // Send Http request
    this.postsService.deletePosts().subscribe(()=>{
      this.loadedPosts = [];
    })
  }

  private fetchPosts(){
    this.isFetching = true;
    this.fetchAll = true;
    this.http.get<{[key:string]:Post}>('https://angular-tutorial-cdd05-default-rtdb.firebaseio.com/posts.json')
    .pipe(map(responseData => {
      const postsArray: Post[] = [];
      console.log(responseData)
      for(const key in responseData){
        if (responseData.hasOwnProperty(key)){
          postsArray.push({...responseData[key], id: key})
        }
      }
      console.log(postsArray)
      return postsArray
    }))
    .subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    });
  }

  getSinglePost(fetchID:HTMLInputElement) {
  return this.http
    .get<Post>(`https://angular-tutorial-cdd05-default-rtdb.firebaseio.com/posts/${fetchID.value}.json`)
    .subscribe(posts => {
      this.singlePost = true;
      console.log(posts);
      console.log(posts.hobbies);
      this.singleFirstName = posts.firstName;
      this.singleLastName =  posts.lastName;
      this.singleAge = posts.age;
      this.singleGender = posts.gender;
      this.singlehobbies = posts.hobbies
    });
}
close(){
  this.singlePost = false;
}

fetchBox(){
  this.fetchSingle = !this.fetchSingle;
}

deleteSinglePost(idnum:HTMLHeadingElement) {
  return this.http
    .delete(`https://angular-tutorial-cdd05-default-rtdb.firebaseio.com/posts/${idnum.textContent}.json`)
    .subscribe();
}

updatebox(){
  this.update = !this.update;
}

updateSinglePost(postID:HTMLInputElement, FirstName: HTMLInputElement,LastName: HTMLInputElement,
   Age: HTMLInputElement,Gender: HTMLInputElement,Hobbies:HTMLTextAreaElement) {
  return this.http
    .patch(`https://angular-tutorial-cdd05-default-rtdb.firebaseio.com/posts/${postID.value}.json`, 
    { firstName: FirstName.value, lastName: LastName.value, age:Age.value, gender:Gender.value,hobbies:Hobbies.value})
    .subscribe();
}

}
