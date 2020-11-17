import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  isDtInitialized: boolean = false;
  clients: User[] = [];
  clientId;
  clientObj: User;
  disabled: boolean;
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<User> = new Subject();

  constructor(
    private userService: UsersService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService
  ) {}

  openEditClientModal(editClient, client) {
    this.clientObj = client;
    this.modalService.open(editClient, { centered: true, size: 'lg' });
  }

  openDeleteModal(deleteClient, client: User) {
    this.disabled = client.deleted;
    this.modalService.open(deleteClient, { centered: true });
    this.clientId = client.userID;
  }

  openStatusModal(changeClientStatus, userID) {
    this.modalService.open(changeClientStatus, { centered: true });
    console.log(userID);
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };

    this.userService.getUsers().subscribe((res) => {
      this.clients = res.filter((data) => data.userRole === 1);
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

  deleteSingleClient() {
    this.modalService.dismissAll()
    this.spinner.show();
    this.userService.deleteClientAction(this.clientId).subscribe((res) => {
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
