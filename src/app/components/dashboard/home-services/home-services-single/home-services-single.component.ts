import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { HomeService } from 'src/app/models/home-service.model';
import { User } from 'src/app/models/user.model';
import { HomeServicesService } from 'src/app/services/home-services.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home-services-single',
  templateUrl: './home-services-single.component.html',
  styleUrls: ['./home-services-single.component.css'],
})
export class HomeServicesSingleComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  isDtInitialized: boolean = false;
  dtTrigger: Subject<User> = new Subject();

  singleHomeService: HomeService;
  doctor: User;
  doctors: User[] = [];
  selectedDoctor: number;
  serviceID

  doctorsFromService: User[] = [];

  constructor(
    private spinner: NgxSpinnerService,
    private homeService: HomeServicesService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private userService: UsersService
  ) {}

  addNewDoctorModal(addNewDoctor) {
    this.modalService.open(addNewDoctor, {
      centered: true,
      size: 'lg',
    });
  }

  docApproval(doctorID){
    this.spinner.show()
    this.homeService.approveOrDisapproveDoctor(this.serviceID,doctorID).subscribe(res =>  {
      console.log(res)
      this.spinner.hide()
      this.ngOnInit()
    })
  }

  dDoctorModal(deleteDoctorModal, doctor){
    this.doctor = doctor;
    this.modalService.open(deleteDoctorModal, {centered: true})
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };

      //get id from URL
   const id = this.route.snapshot.paramMap.get('id');

   this.serviceID = Number(id);

    //get service name to display
    this.homeService.getServices().subscribe((res) => {
      this.singleHomeService = res.find(
        (x) => x.home_services_id == parseInt(id)
      );
    });

    //get doctors
    this.userService.getUsers().subscribe(res => {
      this.doctors = res.filter(x => x.userRole == 2)
    })

    //get doctors related to this home service
    this.homeService.getDoctors(id).subscribe((res:any) => {

      this.doctorsFromService = res.doctors

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

  addDoctor(id){
    const formData = new FormData();
    formData.append('doctor_id', id);
    formData.append('service_id', this.serviceID)

    this.modalService.dismissAll()
    this.spinner.show()
    this.homeService.addDoctorToService(formData).subscribe(res => {
      this.spinner.hide()
      this.ngOnInit()
    })
  }
  
  deleteDoctor(id){
    this.modalService.dismissAll()
    this.spinner.show()
    this.homeService.deleteDoctorFromService(id).subscribe(res => {
      this.spinner.hide()
      this.ngOnInit()
    })
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
