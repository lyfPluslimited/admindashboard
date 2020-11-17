import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { ConfigService } from 'src/app/services/config.service';
import { HospitalService } from 'src/app/services/hospital.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.css'],
})
export class HospitalsComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  isDtInitialized: boolean = false;
  hospitals: Hospital[] = [];
  dtTrigger: Subject<Hospital> = new Subject();
  fileData: any;
  hospitalId: number;

  constructor(
    private hospitalService: HospitalService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private config: ConfigService,
    private http: HttpClient
  ) {}

  openAddHospitalModal(addHospital) {
    this.modalService.open(addHospital, { centered: true });
  }

  openChangeHospitalStatusModal(changeHospitalStatus, hospital: Hospital) {
    this.hospitalService
      .getSingleHospital(hospital.specializationAreaID)
      .subscribe((res) => {
        this.hospitalId = res.specializationAreaID;
        this.modalService.open(changeHospitalStatus, { centered: true });
      });
  }

  openUpdateHospitalModal(updateHospital, hospital: Hospital){
    this.updateHospitalForm.patchValue({
      id: hospital.specializationAreaID,
      name: hospital.areaOfSpecialization,
      address: hospital.address
    })
    this.modalService.open(updateHospital)
  }

  openDeleteHospitalModal(deleteHospital: any, hospital: Hospital) {
    this.hospitalService
      .getSingleHospital(hospital.specializationAreaID)
      .subscribe((res) => {
        this.hospitalId = res.specializationAreaID;
        this.modalService.open(deleteHospital, { centered: true });
      });
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };

    this.hospitalService.getHospitals().subscribe((data) => {
      this.hospitals = data;
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

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      this.fileData = event.target.files[0];
    }
  }

  addHospitalForm = new FormGroup({
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
  });

  updateHospitalForm = new FormGroup({
    id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required)
  })

  addHospitalAction() {
    this.modalService.dismissAll();
    this.spinner.show();

    const formData = new FormData();
    formData.append('name', this.addHospitalForm.get('name').value);
    formData.append('address', this.addHospitalForm.get('address').value);
    if (this.fileData != null) {
      formData.append('image', this.fileData, this.fileData.name);
    }

    this.http
      .post(`${this.config.REST_API_URL}/admin/save-hospital`, formData)
      .subscribe((res) => {
        console.log(res);
        this.addHospitalForm.reset();
        this.spinner.hide();
        this.ngOnInit();
      });
  }

  changeStatus() {
    this.modalService.dismissAll();
    this.spinner.show();
    this.hospitalService
      .changeHospitalVerification(this.hospitalId)
      .subscribe((res) => {
        console.log(res);
        this.spinner.hide();
        this.ngOnInit();
      });
  }

  updateHospitalAction(){
    this.modalService.dismissAll()
    this.spinner.show()
    this.hospitalService.updateHospital(this.updateHospitalForm.value).subscribe(res => {
      this.updateHospitalForm.reset()
      this.spinner.hide()
      this.ngOnInit()
    })
  }

  deleteSingleHospital() {
    this.modalService.dismissAll();
    this.spinner.show();
    this.hospitalService
      .deleteHospitalAction(this.hospitalId)
      .subscribe((res) => {
        console.log(res);
        this.spinner.hide();
        this.ngOnInit();
      });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
