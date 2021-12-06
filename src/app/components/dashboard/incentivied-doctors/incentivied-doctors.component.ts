import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { data } from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { IncentiveService } from 'src/app/services/incentive.service';

@Component({
  selector: 'app-incentivied-doctors',
  templateUrl: './incentivied-doctors.component.html',
  styleUrls: ['./incentivied-doctors.component.css'],
})
export class IncentiviedDoctorsComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  isDtInitialized: boolean = false;
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject();

  doctors: [] = [];

  constructor(
    private incentiveService: IncentiveService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
    ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };

    this.incentiveService.displayIncentiveDoctors().subscribe((res) => {
      this.doctors = res;
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

  makePayment(id){
    this.spinner.show()
    this.incentiveService.makePayment(id).subscribe(res => {
      console.log(res)
      this.toastr.success(res.toString())
      this.spinner.hide()
      this.ngOnInit()
    })
  }

  checkLengthOfTracking(tracking: []) {
    var count: Number = 0;
    if (tracking.length > 0) {
      var data = tracking.filter((x: any) => x.paid == false);

      data.forEach((element: any) => {
        count += element.amount;
      });
      return count;
    }
    return count;
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
