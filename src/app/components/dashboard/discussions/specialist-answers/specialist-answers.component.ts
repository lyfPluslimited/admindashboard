import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Comments } from 'src/app/models/comments.model';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-specialist-answers',
  templateUrl: './specialist-answers.component.html',
  styleUrls: ['./specialist-answers.component.css']
})
export class SpecialistAnswersComponent implements OnInit {
  dtOptions: DataTables.Settings = {};

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  isDtInitialized:boolean = false;
  dtTrigger: Subject<Comments> = new Subject();

  comments: Comments[] = [];

  constructor(private service: CommentService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this.service.getComments().subscribe(res => {
      this.comments = res.filter(data => data.user != null && data.user.userRole == 2);
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

