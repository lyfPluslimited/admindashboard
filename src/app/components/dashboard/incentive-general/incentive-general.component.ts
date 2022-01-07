import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { IncentiveService } from 'src/app/services/incentive.service';

@Component({
  selector: 'app-incentive-general',
  templateUrl: './incentive-general.component.html',
  styleUrls: ['./incentive-general.component.css']
})
export class IncentiveGeneralComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  isDtInitialized: boolean = false;
   // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject();

  tracking:[]
  incentives:[]
  kpiPrices:any

  displayKpiPrice(kpiID:any){
    return this.kpiPrices.find((x:any) => x.kpi_id == kpiID).unit_amount
  }

  constructor(
    private incentive: IncentiveService,
    private route: ActivatedRoute,
    private modal: NgbModal
  ) { }

  openIncentiveList(incentiveList, dataList: []){
    this.incentives = dataList
    this.modal.open(incentiveList, { centered:true, size: 'lg' })
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };

    //get id from URL
    const id = this.route.snapshot.paramMap.get('id');

    this.incentive.doctorPrices(id).subscribe((res:any)=> {
      this.kpiPrices = res.prices
    })

    this.incentive.getGeneralTracking(id).subscribe((res:any) => {
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

  convertDateTimeToTime(date){
    return moment(date).format('LT')
  }

  convertDateTimetoNewFormat(date){
    return moment(date).format('DD/MM/YY')
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe()
  }

}
