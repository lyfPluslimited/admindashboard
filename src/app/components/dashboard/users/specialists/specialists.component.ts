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
import { IncentiveService } from 'src/app/services/incentive.service';
import { QrcodeService } from 'src/app/services/qrcode.service';
import { Doctor, additionalDoctors } from 'fake-data';

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

  doctors: Doctor[] = [];
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
  incentive: boolean;

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<User> = new Subject();

  constructor(
    private userService: UsersService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private specializationService: SpecializationService,
    private configService: ConfigService,
    private hospitalService: HospitalService,
    private incentiveService: IncentiveService,
    private qrService: QrcodeService
  ) {}

  changeIncentivesModal(doctorIncentive, doctor: User) {
    this.incentive = doctor.incentive_doctor;
    this.doctorID = doctor.userID;
    this.modalService.open(doctorIncentive, { centered: true });
  }

  openIncentivePricesModal(incentivePrices, doctor: User) {
    this.doctorID = doctor.userID;
    this.modalService.open(incentivePrices, { centered: true });
  }

  openDoctorDetailsModal(doctorDetails, doctor) {
    this.doctorDetailForm.patchValue({
      userID: doctor.userID,
      firstName: doctor.firstName,
      lastName:  doctor.lastName,
      phone: doctor.phone,
      email: doctor.email,
      consultation_fee: doctor.consultation_fee,
      call_fee: doctor.call_fee,
      doctorsIDnumber: doctor.doctorsIDnumber,
      doctorsIDverificationStatus: doctor.doctorsIDverificationStatus,
      height: doctor.height,
      weight: doctor.weight,
      blood_group: doctor.blood_group,
      allergy: doctor.allergy,
      doctor_bio: doctor.doctor_bio,
      experience: doctor.experience,
      ip_address: doctor.ip_address,
      user_image: doctor.user_image,
      dateofBirth: doctor.dateOfBirth,
      gender: doctor.gender,
      userNhifNumber: doctor.userNhifNumber,
      specializationID: doctor.specializationID,
      specializationAreaID: doctor.specilizationAreaID,
      call_payment_id: doctor.call_payment_id,
      consultation_payment_id: doctor.consultation_payment_id,
      subscription_payment_id: doctor.subscription_payment_id,
      incentive_doctor: doctor.incentive_doctor,
    });
    console.log(doctor)
    this.doctorImage = doctor.user_image;
    this.selectedSpecialization = doctor.specializationID;
    this.selectedHospital = doctor.specilizationAreaID;
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

  openEditModal(doctorEdit, doctor) {
    console.log(doctor)
    this.updateDoctorForm.patchValue(doctor);
    this.selectedSpecialization = doctor.specializationID;
    this.selectedHospital = doctor.specilizationAreaID;
    
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
    call_payment_id: new FormControl({ value: '', disabled: true }),
    consultation_payment_id: new FormControl({ value: '', disabled: true }),
    subscription_payment_id: new FormControl({ value: '', disabled: true }),
    incentive_doctor: new FormControl({ value: '', disabled: true }),
  });

  updateDoctorForm = new FormGroup({
    userID: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    specializationID: new FormControl(''),
    specilizationAreaID: new FormControl(''),
  });

  kpiPricesForm = new FormGroup({
    invitationPrice: new FormControl('2000', Validators.required),
    successfulSignUpPrice: new FormControl('5000', Validators.required),
    onlineTimePrice: new FormControl('5000', Validators.required),
    forumPostPrice: new FormControl('3000', Validators.required),
    qnAnsPrice: new FormControl('3000', Validators.required),
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
    console.log(this.updateDoctorForm.value)
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

  setIncentivePrices() {
    this.modalService.dismissAll();
    this.spinner.show();
    console.log(this.kpiPricesForm.value);
    this.incentiveService
      .setKpiPricesForDoctor(this.kpiPricesForm.value, this.doctorID)
      .subscribe((res) => {
        console.log(res);
        this.kpiPricesForm.reset();
        this.spinner.hide();
        this.ngOnInit();
      });
  }

  changeIncentive(id) {
    this.modalService.dismissAll();
    this.spinner.show();
    this.incentiveService.updateIncentiveStatus(id).subscribe((res) => {
      console.log(res);
      this.spinner.hide();
      this.ngOnInit();
    });
  }

  generateQRCode(id) {
    this.modalService.dismissAll();
    this.spinner.show();
    this.qrService.generateQR(id).subscribe((res) => {
      console.log(res);
      this.spinner.hide();
      this.ngOnInit();
    });
  }

  openQRModal(qrModal, doctor: User) {
    this.doctorImage = `http://167.172.12.18/app/public${doctor.qrcode}`;
    this.doctorObj = doctor;
    this.modalService.open(qrModal, { centered: true });
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };

    this.configService.getConsultationPeriod().subscribe((res) => {
      this.consultationPeriod = res;
    });

    this.hospitalService.getHospitals().subscribe((res) => {
      this.hospitals = res.sort((a, b) => a.areaOfSpecialization.localeCompare(b.areaOfSpecialization));
    });

    this.specializationService.getSpecializations().subscribe((res) => {
      this.specialities = res;
    });

    

    this.userService.getDocs().subscribe((apiDoctors) => {

      this.doctors = [...apiDoctors, ...additionalDoctors];

      // console.log(apiDoctors)
  
      
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
    this.dtTrigger.unsubscribe();
  }
}
