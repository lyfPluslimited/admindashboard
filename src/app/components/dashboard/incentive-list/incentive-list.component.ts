import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { IncentiveService } from 'src/app/services/incentive.service';

@Component({
  selector: 'app-incentive-list',
  templateUrl: './incentive-list.component.html',
  styleUrls: ['./incentive-list.component.css']
})
export class IncentiveListComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  isDtInitialized: boolean = false;
   // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject();

  tracking:[]

  constructor(
    private spinner: NgxSpinnerService,
    private incentive: IncentiveService,
    private route: ActivatedRoute,
  ) { }

  convertDateTimetoNewFormat(date){
    return moment(date).format('DD/MM/YY')
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };

    //get id from URL
    const id = this.route.snapshot.paramMap.get('id');

    this.incentive.getKpisDoneInTracking(id).subscribe((res:[]) => {

      this.tracking = res

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
    this.dtTrigger.unsubscribe()
  }

}
