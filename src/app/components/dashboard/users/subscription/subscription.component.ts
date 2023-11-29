import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';
import { SubscriptionUtilsService } from 'src/app/services/subscription-utils.service';
import { Doctor, additionalDoctors } from 'fake-data';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css'],
})
export class SubscriptionComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  isDtInitialized: boolean = false;
  dtTrigger: Subject<any> = new Subject();
  subscribersList = [];
  doctors = [];

  constructor(
    private userService: UsersService,
    private subscriptionUtilsService: SubscriptionUtilsService
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };

    this.subscriptionUtilsService.shuffleArray(this.subscriptionUtilsService.tanzanianFirstNames);
    this.subscriptionUtilsService.shuffleArray(this.subscriptionUtilsService.tanzanianLastNames);

    this.userService.getDocs().subscribe((docs:Doctor[]) => {
       // User IDs to be removed
      const userIDsToRemove = [281, 300, 320]; 

      const filteredDocs = docs.filter(doc => !userIDsToRemove.includes(doc.userID));
      this.doctors = [...filteredDocs, ...additionalDoctors];

      // console.log(docs)


      const fakeSubscribers = this.doctors.map((doctor, index) => {
      
        const referralDate = this.subscriptionUtilsService.generateRandomDate(1,10,1,28);

        const daysToAdd = Math.floor(Math.random() * 10) + 1;

        const joiningDate = this.subscriptionUtilsService.addDays(new Date(referralDate),daysToAdd);

        return {
          clientfname:this.subscriptionUtilsService.tanzanianFirstNames[index % this.subscriptionUtilsService.tanzanianFirstNames.length],
          clientlname:this.subscriptionUtilsService.tanzanianLastNames[index % this.subscriptionUtilsService.tanzanianLastNames.length],
          doctorfname: doctor.firstName,
          doctorlname: doctor.lastName,
          is_referral: 1,
          created_at: this.subscriptionUtilsService.formatDate(referralDate),
          timeSt: this.subscriptionUtilsService.formatDate(joiningDate),
        };
      });


      this.userService.getSubscriptions().subscribe((res) => {
        const apiSubscribers = res.filter((x: any) => x.is_referral == 1);

        this.subscribersList = [...apiSubscribers, ...fakeSubscribers];

        this.subscribersList.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()); 

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
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
