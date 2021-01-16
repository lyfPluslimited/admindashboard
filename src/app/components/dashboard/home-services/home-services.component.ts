import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { HomeService } from 'src/app/models/home-service.model';
import { HomeServicesService } from 'src/app/services/home-services.service';

@Component({
  selector: 'app-home-services',
  templateUrl: './home-services.component.html',
  styleUrls: ['./home-services.component.css'],
})
export class HomeServicesComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  isDtInitialized: boolean = false;
  dtTrigger: Subject<HomeService> = new Subject();
  fileData;
  services: HomeService[];
  singleService: HomeService;

  constructor(
    private spinner: NgxSpinnerService,
    private homeService: HomeServicesService,
    private modalService: NgbModal
  ) {}

  openEditModal(editService, service: HomeService){
    this.singleService = service
    this.editServiceForm.patchValue({
      name: service.service_name
    })
    this.modalService.open(editService, {centered: true})
  }

  openDeleteModal(deleteService, service: HomeService){
    this.singleService = service;
    this.modalService.open(deleteService, {centered:true})
  }

  openAddServiceModal(addService){
    this.modalService.open(addService, {centered: true})
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      this.fileData = event.target.files[0];
    }
  }

  newServiceForm = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  editServiceForm = new FormGroup({
    name: new FormControl( '' , Validators.required),
  });


  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };

    this.homeService.getServices().subscribe((res) => {
      this.services = res;
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

  addService() {
    const formData = new FormData();

    formData.append('name', this.newServiceForm.get('name').value);
    if (this.fileData != null) {
      formData.append('image', this.fileData, this.fileData.name);
    }

    this.modalService.dismissAll()

    this.spinner.show();

    this.homeService.addService(formData).subscribe((res) => {
      this.newServiceForm.reset();
      this.spinner.hide();
      this.ngOnInit();
    });
  }

  edit(id) {
    const formData = new FormData();

    formData.append('name', this.editServiceForm.get('name').value);
    if (this.fileData != null) {
      formData.append('image', this.fileData, this.fileData.name);
    }

    this.modalService.dismissAll()

    this.spinner.show();

    this.homeService.editService(formData, id).subscribe((res) => {

      this.newServiceForm.reset();
      this.spinner.hide();
      this.ngOnInit();
    });
  }

  deleteService(id) {
    this.modalService.dismissAll()
    this.spinner.show();

    this.homeService.deleteService(id).subscribe((res) => {
      this.spinner.hide();
      this.ngOnInit();
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
