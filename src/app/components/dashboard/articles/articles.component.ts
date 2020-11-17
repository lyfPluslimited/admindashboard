import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Article } from 'src/app/models/article.model';
import { Topic } from 'src/app/models/topic.model';
import { ArticleService } from 'src/app/services/article.service';
import { TopicService } from 'src/app/services/topic.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ConfigService } from 'src/app/services/config.service';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
})
export class ArticlesComponent implements OnInit {
  dtOptions: DataTables.Settings = {};

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  isDtInitialized: boolean = false;
  dtTrigger: Subject<Article> = new Subject();

  articles: Article[] = [];
  articleId: number;
  singleArticle: Article;
  topics: Topic[] = [];
  public Editor = ClassicEditor;
  fileData;

  constructor(
    private articleService: ArticleService,
    private modalService: NgbModal,
    private topicService: TopicService,
    private config: ConfigService,
    private http: HttpClient,
    private spinner: NgxSpinnerService
  ) {}

  openFullPostModal(articleView, article: Article) {
    this.articleService.getSingleArticle(article.subID).subscribe((res) => {
      this.singleArticle = res;
      this.modalService.open(articleView, { centered: true, size: 'lg' });
    });
  }

  openNewArticleModal(addNewArticle) {
    this.modalService.open(addNewArticle, {
      centered: true,
      size: 'lg',
      scrollable: true,
    });
  }

  openEditArticleModal(editArticle, article: Article) {
    this.singleArticle = article;
    this.updateArticleForm.patchValue({
      title: article.subTopicTitle,
      causes: article.causes,
      symptoms: article.symptoms,
      preventions: article.preventiveCureTreatment,
      description: article.description,
      id: article.subID,
    });
    this.modalService.open(editArticle);
  }

  openDeleteArticleModal(deleteArticle, article: Article) {
    this.articleService.getSingleArticle(article.subID).subscribe((res) => {
      this.articleId = res.subID;
      this.modalService.open(deleteArticle, { centered: true });
    });
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      this.fileData = event.target.files[0];
    }
  }

  addArticleForm = new FormGroup({
    title: new FormControl(''),
    causes: new FormControl(''),
    symptoms: new FormControl(''),
    preventions: new FormControl(''),
    description: new FormControl(''),
    topic: new FormControl(''),
  });

  updateArticleForm = new FormGroup({
    title: new FormControl(''),
    causes: new FormControl(''),
    symptoms: new FormControl(''),
    preventions: new FormControl(''),
    description: new FormControl(''),
    id: new FormControl(''),
  });

  addArticle() {
    const formData = new FormData();

    formData.append('title', this.addArticleForm.get('title').value);
    formData.append('causes', this.addArticleForm.get('causes').value);
    formData.append('symptoms', this.addArticleForm.get('symptoms').value);
    formData.append(
      'description',
      this.addArticleForm.get('description').value
    );
    formData.append(
      'preventions',
      this.addArticleForm.get('preventions').value
    );
    formData.append('topic', this.addArticleForm.get('topic').value);
    if (this.fileData != null) {
      formData.append('image', this.fileData, this.fileData.name);
    }

    this.modalService.dismissAll();

    this.spinner.show();

    this.http
      .post(`${this.config.REST_API_URL}/admin/saveArticle`, formData)
      .subscribe((res) => {
        console.log(res);
        this.addArticleForm.reset();
        this.spinner.hide();
        this.ngOnInit();
      });
  }

  updateArticle() {
    this.modalService.dismissAll();
    this.spinner.show();
    this.articleService
      .updateArticleAction(this.updateArticleForm.value)
      .subscribe((res) => {
        console.log(res);
        this.updateArticleForm.reset();
        this.spinner.hide();
        this.ngOnInit();
      });
  }

  deleteSingleArticle() {
    this.modalService.dismissAll();
    this.spinner.show();
    this.articleService.deleteArticle(this.articleId).subscribe((res) => {
      console.log(res);
      this.spinner.hide();
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };

    this.topicService.getTopics().subscribe((data) => {
      this.topics = data;
    });

    this.articleService.getArticles().subscribe((res) => {
      this.articles = res;
      if (this.isDtInitialized) {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next();
        });
      } else {
        this.isDtInitialized = true;
        this.dtTrigger.next();
      }
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
