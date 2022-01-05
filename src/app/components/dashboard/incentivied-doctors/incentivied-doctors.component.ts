import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { User } from 'src/app/models/user.model';
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
  doctorId;

  constructor(
    private incentiveService: IncentiveService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private modal: NgbModal
    ) {}

    openKpiListModal(kpiListModal){
      this.incentiveService.getKpis().subscribe((res:any) => {
        var kpi1 = res.find((x:any)=> x.id == 1).default_unit_quantity
        var kpi2 = res.find((x:any) => x.id == 2).default_unit_quantity
        var kpi3 = res.find((x:any) => x.id == 3).default_unit_quantity
        var kpi4 = res.find((x:any) => x.id == 4).default_unit_quantity
        var kpi5 = res.find((x:any) => x.id == 5).default_unit_quantity

        this.kpiQuantityForm.patchValue({
          invitationqnty: kpi1,
          signupqnty: kpi2,
          onlineTimeqnty: kpi3,
          forumqnty: kpi4,
          qnqnty: kpi5
        })

        this.modal.open(kpiListModal, {centered:true})

      })
    }

    openKpiPriceModal(doctor: User, priceModal){

      this.doctorId = doctor.userID
      console.log(doctor)
      this.incentiveService.getDoctorKpiPrices(doctor.userID).subscribe((res:any) => {
        console.log(res)
        var kpi1 = res.find((x:any)=> x.kpi_id == 1).unit_amount
        var kpi2 = res.find((x:any) => x.kpi_id == 2).unit_amount
        var kpi3 = res.find((x:any) => x.kpi_id == 3).unit_amount
        var kpi4 = res.find((x:any) => x.kpi_id == 4).unit_amount
        var kpi5 = res.find((x:any) => x.kpi_id == 5).unit_amount

        this.kpiPriceForm.patchValue({
          invitationPrice: kpi1,
          successfulSignUpPrice: kpi2,
          onlineTimePrice: kpi3,
          forumPostPrice: kpi4,
          qnAnsPrice: kpi5,
          consultationPercentage: Number(doctor.incentive_percentage)*100
        })

        this.modal.open(priceModal, { centered: true })
      })
    }

    kpiPriceForm = new FormGroup({
      invitationPrice: new FormControl(''),
      successfulSignUpPrice: new FormControl(''),
      onlineTimePrice: new FormControl(''),
      forumPostPrice: new FormControl(''),
      qnAnsPrice: new FormControl(''),
      consultationPercentage: new FormControl('')
    })

    kpiQuantityForm = new FormGroup({
      invitationqnty: new FormControl(''),
      signupqnty: new FormControl(''),
      onlineTimeqnty: new FormControl(''),
      forumqnty: new FormControl(''),
      qnqnty: new FormControl('')
    })

    setIncentivePrices(){
      this.modal.dismissAll()
      this.spinner.show()
      this.incentiveService.udpateKpiPricesForDoctor(this.kpiPriceForm.value, this.doctorId).subscribe(res => {
        this.spinner.hide()
        this.toastr.success(res.toString())
        this.ngOnInit()
      })
    }

    updateKpiQuantity(){
      this.modal.dismissAll()
      this.spinner.show()
      this.incentiveService.updateKpiQuantities(this.kpiQuantityForm.value).subscribe(res => {
        this.spinner.hide()
        this.toastr.success(res.toString())
        this.ngOnInit()
      })
    }

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
