import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DoctorSessions } from 'src/app/models/doctor-sessions.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { Specialization } from 'src/app/models/specialization.model';
import { SpecializationService } from 'src/app/services/specialization.service';
import { ConfigService } from 'src/app/services/config.service';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';

@Component({
  selector: 'app-specialists',
  templateUrl: './specialists.component.html',
  styleUrls: ['./specialists.component.css'],
})
export class SpecialistsComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  isDtInitialized: boolean = false;

  doctors: User[] = [];
  doctorTransactions: DoctorSessions[] = [];
  doctorObj: User;
  doctorID: number;
  status: string;
  disabled: boolean;
  specialities: Specialization[] = [];
  selectedSpecialization;
  selectedHospital;
  hospitals: Hospital[] = [];
  consultationPeriod;
  doctorImage;

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<User> = new Subject();

  constructor(
    private userService: UsersService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private specializationService: SpecializationService,
    private configService: ConfigService,
    private hospitalService: HospitalService
  ) {}

  openDoctorDetailsModal(doctorDetails, doctor: User) {
    this.doctorDetailForm.patchValue(doctor);
    this.doctorImage = doctor.user_image
    this.selectedSpecialization = doctor.specializationID
    this.selectedHospital = doctor.specilizationAreaID
    this.modalService.open(doctorDetails, { centered: true, size: 'lg' });
  }

  openConsultationModal(consultationModal) {
    this.consultationPeriodForm.patchValue(this.consultationPeriod);
    this.modalService.open(consultationModal);
  }

  openVerificationStatus(doctorVerification, doctor) {
    this.status = doctor.doctorsIDverificationStatus;
    this.doctorID = doctor.userID;
    this.modalService.open(doctorVerification, { centered: true });
  }

  openEditModal(doctorEdit, doctor: User) {
    this.updateDoctorForm.patchValue(doctor);
    this.selectedSpecialization = doctor.specializationID;
    console.log('specialization is ', this.selectedSpecialization);
    this.modalService.open(doctorEdit, { centered: true, size: 'lg' });
  }

  openFeeModal(changeDoctorFee, doctor) {
    this.userService.getUserById(doctor.userID).subscribe((data) => {
      this.changeFeeForm.patchValue(data);
      this.modalService.open(changeDoctorFee, { centered: true });
    });
  }

  openDeleteModal(deleteDoctor, doctor: User) {
    this.disabled = doctor.deleted;
    this.modalService.open(deleteDoctor, { centered: true });
    this.doctorID = doctor.userID;
  }

  verifyDoctorStatus(id) {
    this.userService.verifyDoctor(id).subscribe(() => {
      this.modalService.dismissAll();
      this.ngOnInit();
    });
  }

  unverifyDoctorStatus(id) {
    this.userService.unverifyDoctor(id).subscribe(() => {
      this.modalService.dismissAll();
      this.ngOnInit();
    });
  }

  doctorDetailForm = new FormGroup({
    userID: new FormControl({ value: '', disabled: true }, Validators.required),
    firstName: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    lastName: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    phone: new FormControl({ value: '', disabled: true }, Validators.required),
    email: new FormControl({ value: '', disabled: true }, [
      Validators.required,
      Validators.email,
    ]),
    consultation_fee: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    call_fee: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    doctorsIDnumber: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    doctorsIDverificationStatus: new FormControl({ value: '', disabled: true }),
    height: new FormControl({ value: '', disabled: true }),
    weight: new FormControl({ value: '', disabled: true }),
    blood_group: new FormControl({ value: '', disabled: true }),
    allergy: new FormControl({ value: '', disabled: true }),
    doctor_bio: new FormControl({ value: '', disabled: true }),
    experience: new FormControl({ value: '', disabled: true }),
    ip_address: new FormControl({ value: '', disabled: true }),
    user_image: new FormControl({ value: '', disabled: true }),
    dateofBirth: new FormControl({ value: '', disabled: true }),
    gender: new FormControl({ value: '', disabled: true }),
    userNhifNumber: new FormControl({ value: '', disabled: true }),
    specializationID: new FormControl({ value: '', disabled: true }),
    specializationAreaID: new FormControl({ value: '', disabled: true }),
  });

  updateDoctorForm = new FormGroup({
    userID: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    specializationID: new FormControl(''),
  });

  changeFeeForm = new FormGroup({
    userID: new FormControl('', Validators.required),
    consultation_fee: new FormControl('', Validators.required),
    call_fee: new FormControl('', Validators.required),
  });

  consultationPeriodForm = new FormGroup({
    period: new FormControl('', Validators.required),
    period_definition: new FormControl('', Validators.required),
  });

  updateConsultationPeriodAction() {
    this.modalService.dismissAll();
    this.spinner.show();
    this.configService
      .updateConsultationPeriod(this.consultationPeriodForm.value)
      .subscribe(() => {
        this.consultationPeriodForm.reset();
        this.spinner.hide();
        this.ngOnInit();
      });
  }

  submitDoctorDetails() {
    this.modalService.dismissAll();
    this.spinner.show();
    this.userService
      .saveDoctorDetails(this.updateDoctorForm.value)
      .subscribe((res) => {
        this.updateDoctorForm.reset();
        this.spinner.hide();
        this.ngOnInit();
      });
  }

  deleteSingleDoctor() {
    this.modalService.dismissAll();
    this.spinner.show();
    this.userService.deleteDoctorAction(this.doctorID).subscribe((res) => {
      console.log(res);
      this.spinner.hide();
      this.ngOnInit();
    });
  }

  submitFeeDetails() {
    this.modalService.dismissAll();
    this.spinner.show();
    console.log(this.changeFeeForm.value);
    this.userService
      .saveFeeDetails(this.changeFeeForm.value)
      .subscribe((res) => {
        console.log(res);
        this.changeFeeForm.reset();
        this.spinner.hide();
        this.ngOnInit();
      });
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };

    this.configService.getConsultationPeriod().subscribe((res) => {
      this.consultationPeriod = res;
    });

    this.hospitalService.getHospitals().subscribe(res => {
      this.hospitals = res
    })

    this.specializationService.getSpecializations().subscribe((res) => {
      this.specialities = res;
    });

    this.userService.getUsers().subscribe((res) => {
      this.doctors = res.filter((data) => data.userRole === 2);
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
