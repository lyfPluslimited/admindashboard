import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DoctorSessions } from 'src/app/models/doctor-sessions.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-specialist-transactions',
  templateUrl: './specialist-transactions.component.html',
  styleUrls: ['./specialist-transactions.component.css']
})
export class SpecialistTransactionsComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  isDtInitialized:boolean = false;
  dtTrigger: Subject<DoctorSessions> = new Subject();

  transactions: DoctorSessions[] = [];

  constructor(private userService: UsersService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      console.log(params.get('id'))

      this.userService.getDoctorTransactions(params.get('id')).subscribe(res => {
        console.log(res)
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
    })
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
