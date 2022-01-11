import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ConfigService } from 'src/app/services/config.service';
import * as moment from 'moment';

@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.css'],
})
export class InvitationsComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  isDtInitialized: boolean = false;
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject();

  invitations: [];

  constructor(private config: ConfigService, private http: HttpClient) {}

  calculateTime(time) {
    return moment(time).format('LLL');
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };

    this.http
      .get(`${this.config.REST_API_URL}/admin/invitations`)
      .subscribe((res: any) => {
        this.invitations = res;
        console.log(this.invitations);

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
