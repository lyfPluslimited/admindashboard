import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { Topic } from 'src/app/models/topic.model';
import { ConfigService } from 'src/app/services/config.service';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  isDtInitialized:boolean = false

  topics: Topic[] = [];
  topicId;
  fileData;
  dtTrigger: Subject<Topic> = new Subject();


  constructor(
    private topicService: TopicService, 
    private http: HttpClient,
    private config: ConfigService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService
    ) { }
  

  openAddTopicModal(addTopic){
    this.modalService.open(addTopic, { centered:true });
  }


  openDeleteTopicModal(deleteTopic, topic){ 
    this.topicService.getSingleTopic(topic.topicID).subscribe( res => {
      this.topicId =  res.topicID
      this.modalService.open(deleteTopic, { centered: true })
    })
  }

  onFileSelect(event){
    if(event.target.files.length > 0){
      this.fileData = event.target.files[0]
    }
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };

    this.topicService.getTopics().subscribe(res => {
      this.topics = res;
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

  saveTopic(caption){
    this.modalService.dismissAll()
    this.spinner.show()
    const formData = new FormData();
    if (this.fileData != null) {
      formData.append('topic_image', this.fileData, this.fileData.name)
    }
    formData.append('topicTitle', caption)
    console.log(this.fileData)
    this.http.post(`${this.config.REST_API_URL}/admin/saveTopics`, formData).subscribe(response => {
      console.log(response)
      this.spinner.hide()
      this.ngOnInit()
    })
  }

  deleteSingleTopic(){
    this.modalService.dismissAll()
    this.spinner.show()
    this.topicService.deleteTopic(this.topicId).subscribe(res => {
      console.log(res)
      this.spinner.hide()
      this.ngOnInit()
    })
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }


}
