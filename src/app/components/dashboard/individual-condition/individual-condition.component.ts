import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ArticleService } from 'src/app/services/article.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-individual-condition',
  templateUrl: './individual-condition.component.html',
  styleUrls: ['./individual-condition.component.css']
})
export class IndividualConditionComponent implements OnInit {
  patientList = [
    {
      name: "bfc894c9-d881-402f-9993-8abe2607ec37",
      condition: "Small cell lung cancer (NSCLC)",
      date: "11-09-2023",
      id: 1
    },
    {
      name: uuidv4(),
      condition: "Chronic pneumonia",
      date: "11-09-2023",
      id: 2
    },
  {
    name: uuidv4(),
    condition: "COPD",
    date: "11-09-2023",
    id: 3
  },
  {
    name: uuidv4(),
    condition: "Tuberculosis",
    date: "10-09-2023", 
    id: 4
  },
  {
    name: uuidv4(),
    condition: "Asthma",
    date: "30-08-2023", 
    id: 5
  },
  {
    name: "bfc894c9-d881-402f-9993-8abe2607ec37",
    condition: "Small cell lung cancer (NSCLC)",
    date: "29-08-2023",
    id: 6
  },
  {
    name: uuidv4(),
    condition: "COPD",
    date: "27-08-2023", 
    id: 7
  },
  {
    name: uuidv4(),
    condition: "Chronic Pneumonia",
    date: "07-09-2023",
    id: 8
  },
  {
    name: uuidv4(),
    condition: "COPD",
    date: "07-09-2023",
    id: 9
  },
  {
    name: uuidv4(),
    condition: "Pneumonia",
    date: "07-09-2023",
    id: 10
  },
  ]

  dtOptions: DataTables.Settings = {};

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  isDtInitialized: boolean = false;
  dtTrigger: Subject<{}> = new Subject();

  constructor(
    private articleService: ArticleService,
    private http: HttpClient
  ) { }

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
