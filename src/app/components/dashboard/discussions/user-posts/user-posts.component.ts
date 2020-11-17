import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Posts } from 'src/app/models/posts.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  isDtInitialized:boolean = false;
  dtTrigger: Subject<Posts> = new Subject();

  posts: Posts[] = [];
  postID: number;
  singlePost: Posts;

  constructor(private postsService: PostService, private modalService: NgbModal) { }

  openFullPostModal(postView, post){
    this.modalService.open(postView);

    this.postsService.getSinglePost(post.userPostID).subscribe(res => {
      this.singlePostForm.patchValue(res);
      this.singlePost = res
    })
  }

  singlePostForm = new FormGroup({
    userID: new FormControl('', Validators.required),
    description: new FormControl({value: '', disabled: true}, Validators.required),
    timeStamp: new FormControl({value: '', disabled: true}, Validators.required),
    category: new FormControl({value: '', disabled: true}, Validators.required),
    userPrivacy: new FormControl({value: '', disabled: true}, Validators.required),
    post_image: new FormControl('', Validators.required),
    title: new FormControl({value: '', disabled: true}, Validators.required),
  })


  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this.postsService.getPosts().subscribe(res => {
      this.posts = res.filter(data => data.author != null && data.author.userRole == 1);
      if (this.isDtInitialized) {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.dtTrigger.next();
        });
      } else {
          this.isDtInitialized = true;
          this.dtTrigger.next();
      }

    })
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
