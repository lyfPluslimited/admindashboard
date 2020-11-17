import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  constructor(
    private modal: NgbModal, 
    private auth: AuthService
    ) { }

    openLogoutModal(logoutModal){
      this.modal.open(logoutModal)
    }

  logoutAction(){
    this.modal.dismissAll()
    this.auth.logout()
  }


  ngOnInit(): void {
  }

}
