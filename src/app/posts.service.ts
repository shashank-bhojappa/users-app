import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "./post.model";

@Injectable()
export class PostsService{
    
    constructor(private http:HttpClient){}

    createAndStorePost(firstName:string, lastName:string, age:number, gender:string,hobbies:string){
        const postData: Post = {firstName:firstName, lastName:lastName, age:age, gender:gender, hobbies:hobbies};

        this.http.post<{name:string}>('https://angular-tutorial-cdd05-default-rtdb.firebaseio.com/posts.json',
         postData)
    .subscribe(responseData => {
      console.log(responseData)
    });
    }

    fetchPosts(){
        
    }
    deletePosts(){
     return this.http.delete('https://angular-tutorial-cdd05-default-rtdb.firebaseio.com/posts.json');
    }
}