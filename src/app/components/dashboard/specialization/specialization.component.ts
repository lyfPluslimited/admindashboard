import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { Specialization } from 'src/app/models/specialization.model';
import { SpecializationService } from 'src/app/services/specialization.service';

@Component({
  selector: 'app-specialization',
  templateUrl: './specialization.component.html',
  styleUrls: ['./specialization.component.css'],
})
export class SpecializationComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  isDtInitialized: boolean = false;
  specializations: Specialization[] = [];
  specObj: Specialization
  fileData: any;
  dtTrigger: Subject<Specialization> = new Subject();

  constructor(
    private specializationService: SpecializationService,
    private spinner: NgxSpinnerService,
    private service: SpecializationService,
    private modalService: NgbModal
  ) {}

  addSpecForm = new FormGroup({
    name: new FormControl('', Validators.required),
    swahili: new FormControl('', Validators.required),
  });

  updateSpecForm = new FormGroup({
    id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    swahili: new FormControl('', Validators.required)
  })

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      this.fileData = event.target.files[0];
    }
  }

  openAddSpecModal(addSpec) {
    this.modalService.open(addSpec);
  }

  openUpdateSpecModal(updateSpec, specialization: Specialization){
    this.updateSpecForm.patchValue({
      id: specialization.specializationID,
      name: specialization.specializationName,
      swahili: specialization.specializationName_sw
    })
    this.modalService.open(updateSpec)
  }

  openDeleteSpecModal(deleteSpec, specialization){
    this.specObj = specialization
    this.modalService.open(deleteSpec, { centered:true })
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };

    this.specializationService.getSpecializations().subscribe((res) => {
      this.specializations = res;
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

  addSpecAction() {
    this.modalService.dismissAll();
    this.spinner.show();

    const formData = new FormData();
    formData.append('name', this.addSpecForm.get('name').value);
    formData.append('swahili', this.addSpecForm.get('swahili').value);

    if (this.fileData != null) {
      formData.append('image', this.fileData, this.fileData.name);
    }

    this.service.saveSpecialization(formData).subscribe((res) => {
      console.log(res);
      this.addSpecForm.reset();
      this.spinner.hide();
      this.ngOnInit();
    });
  }

  updateSpecAction(){
    this.modalService.dismissAll()
    this.spinner.show()
    this.service.updateSpecialization(this.updateSpecForm.value).subscribe(res => {
      this.updateSpecForm.reset()
      this.spinner.hide()
      this.ngOnInit()
    })
  }

  deleteSingleSpec(){
    this.modalService.dismissAll()
    this.spinner.show()

    this.service.deleteSpecialization(this.specObj.specializationID).subscribe(res => {
      console.log(res)
      this.spinner.hide()
      this.ngOnInit()
    })
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
