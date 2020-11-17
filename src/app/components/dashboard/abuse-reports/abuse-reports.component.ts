import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { AbuseReports } from 'src/app/models/abuse-reports.model';
import { AbuseReportsService } from 'src/app/services/abuse-reports.service';

@Component({
  selector: 'app-abuse-reports',
  templateUrl: './abuse-reports.component.html',
  styleUrls: ['./abuse-reports.component.css']
})
export class AbuseReportsComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  reports: AbuseReports[] = [];
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<AbuseReports> = new Subject();

  constructor(private reportService: AbuseReportsService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this.reportService.getAbuseReports().subscribe(res => {
      this.reports = res.filter(data => data.reporter != null) ;
      this.dtTrigger.next();
    })
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
