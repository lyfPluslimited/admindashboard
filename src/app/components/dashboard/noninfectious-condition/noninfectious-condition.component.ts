import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ArticleService } from 'src/app/services/article.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-noninfectious-condition',
  templateUrl: './noninfectious-condition.component.html',
  styleUrls: ['./noninfectious-condition.component.css'],
})
export class NoninfectiousConditionComponent implements OnInit {
  patientList = [
    {
      name: uuidv4(),
      condition: 'Chronic malaria',
      date: '11-09-2023',
      id: 4
    },
    {
      name: uuidv4(),
      condition: 'Typhoid fever',
      date: '09-09-2023',
      id: 5
    },
    {
      name: uuidv4(),
      condition: 'GERD',
      date: '12-09-2023',
      id: 2
    },
    {
      name: uuidv4(),
      condition: 'Hepatitis A',
      date: '12-09-2023',
      id: 1
    },
    {
      name: uuidv4(),
      condition: 'Salmonellosis',
      date: '04-09-2023',
      id: 6
    },
    {
      name: uuidv4(),
      condition: 'Osteoporosis',
      date: '03-09-2023',
      id: 7
    },
    {
      name: uuidv4(),
      date: '29-08-2023',
      condition: 'Diabetes Type 1 (IDDM)',
      id: 8
    },
    {
      name: uuidv4(),
      date: '29-08-2023',
      condition: 'Diabetes',
      id: 9
    },
    {
      name: uuidv4(),
      date: '29-08-2023',
      condition: 'Diabetes',
      id: 10
    },
  ];

  dtOptions: DataTables.Settings = {};

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  isDtInitialized: boolean = false;
  dtTrigger: Subject<{}> = new Subject();

  constructor(
    private articleService: ArticleService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };
    this.articleService.getArticles().subscribe((res) => {
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
