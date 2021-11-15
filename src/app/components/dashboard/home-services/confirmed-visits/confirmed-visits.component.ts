import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ConfirmedVisit } from 'src/app/models/home-service.model';
import { HomeServicesService } from 'src/app/services/home-services.service';

@Component({
  selector: 'app-confirmed-visits',
  templateUrl: './confirmed-visits.component.html',
  styleUrls: ['./confirmed-visits.component.css']
})
export class ConfirmedVisitsComponent implements OnInit,OnDestroy {
  dtOptions: DataTables.Settings = {};

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  isDtInitialized: boolean = false;
  dtTrigger: Subject<ConfirmedVisit> = new Subject();

  visits: ConfirmedVisit[] = []

  constructor(private service:HomeServicesService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };

    this.service.getConfirmedVisits().subscribe(res => {
      this.visits = res.sort((a,b) => b.confirmation_id - a.confirmation_id)
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
