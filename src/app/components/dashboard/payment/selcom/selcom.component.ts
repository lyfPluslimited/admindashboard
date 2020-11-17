import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Selcom } from 'src/app/models/selcom.model';
import { SelcomService } from 'src/app/services/selcom.service';
import * as moment from 'moment';

@Component({
  selector: 'app-selcom',
  templateUrl: './selcom.component.html',
  styleUrls: ['./selcom.component.css']
})
export class SelcomComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  isDtInitialized:boolean = false

  orders: Selcom[] = [];

  dtTrigger: Subject<Selcom> = new Subject();

  constructor(private selcomService: SelcomService, private modalService: NgbModal) { }

  selcomForm = new FormGroup({
    transid: new FormControl({value: '', disabled: true}),
    order_id: new FormControl({value:'', disabled: true}),
    reference: new FormControl({value: '', disabled: true}),
    result: new FormControl({value: '', disabled: true}),
    resultcode: new FormControl({value: '', disabled: true}),
    payment_status: new FormControl({value: '', disabled: true}),
    user: new FormControl({value: '', disabled: true}),
    doctor: new FormControl({value: '', disabled: true}),
    amount: new FormControl({value: '', disabled: true}),
    payment_type: new FormControl({value: '', disabled: true}),
    type: new FormControl({value: '', disabled: true}),
    phone: new FormControl({value: '', disabled: true}),
    time: new FormControl({value: '', disabled: true}),
  })

  openViewPayment(viewPayment, order: Selcom){

    this.selcomForm.patchValue({
      transid: order.transid,
      order_id: order.order_id,
      time: order.reference,
      payment_status: order.payment_status,
      user: order.client.lastName,
      doctor: order.doctor.lastName,
      amount: order.amount,
      phone: order.phonenumber_used,
      payment_type: order.payment_type,
      type: order.type
    })
    this.modalService.open(viewPayment, { centered: true, size: 'lg'})
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this.selcomService.getSelcomPayments().subscribe(res =>{
      this.orders = res

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

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
