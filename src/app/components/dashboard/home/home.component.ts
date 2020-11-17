import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Hospital } from 'src/app/models/hospital.model';
import { Topic } from 'src/app/models/topic.model';
import { User } from 'src/app/models/user.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { TopicService } from 'src/app/services/topic.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  totalUsers: User[] = [];
  totalSpecialistsCount: number;
  totalTopics: Topic[] = [];
  hospitals: Hospital[] = []

  constructor(
    private userService: UsersService, 
    private topicService: TopicService,
    private spinner: NgxSpinnerService,
    private hospitalService: HospitalService
    ) { }

  ngOnInit(): void {
    this.spinner.show()

    this.userService.getUsers().subscribe(res => {
      this.totalUsers = res.filter(data => data.userRole === 1);
      this.totalSpecialistsCount = res.filter(data => data.userRole === 2).length;
    });

    this.hospitalService.getHospitals().subscribe(data => {
      this.hospitals = data
    })

    this.topicService.getTopics().subscribe(res => {
      this.totalTopics = res;
    });

    this.spinner.hide()
  }

}
