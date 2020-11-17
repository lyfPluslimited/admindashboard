import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { Symptom } from 'src/app/models/symptom.model';
import { SymptomService } from 'src/app/services/symptom.service';

@Component({
  selector: 'app-symptoms',
  templateUrl: './symptoms.component.html',
  styleUrls: ['./symptoms.component.css'],
})
export class SymptomsComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  isDtInitialized: boolean = false;
  symptoms: Symptom[] = [];
  dtTrigger: Subject<Symptom> = new Subject();
  symptomObj: Symptom;

  constructor(
    private symptomService: SymptomService,
    private service: SymptomService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService
  ) {}

  openAddSymptomModal(addSymptom: any) {
    this.modalService.open(addSymptom);
  }

  openDeleteSymptomModal(deleteSymptom: any, symptom: Symptom) {
    this.symptomObj = symptom;
    this.modalService.open(deleteSymptom, { centered: true });
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };

    this.symptomService.getSymptoms().subscribe((res) => {
      this.symptoms = res;
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

  addSymptomAction(name: string) {
    console.log(name)
    this.modalService.dismissAll();
    this.spinner.show();
    this.service.saveSymptom(name).subscribe((res) => {
      console.log(res);
      this.spinner.hide();
      this.ngOnInit();
    });
  }

  deleteSymptomAction() {
    this.modalService.dismissAll();
    this.spinner.show();
    this.service.deleteSymptom(this.symptomObj.symptoms_id).subscribe((res) => {
      console.log(res);
      this.spinner.hide();
      this.ngOnInit();
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
