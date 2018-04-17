import { Component, OnInit, Input } from "@angular/core";
import { UsersService } from "../../services/users.service"
import { User } from '../../user';
import { id } from "@swimlane/ngx-charts/release/utils";
import { element } from "protractor";
import { Router, RouterModule, RouterLink } from '@angular/router';
import { Ticket } from "../../Ticket";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  @Input() user: User
  userList: User[] = [];;
  userListItem: any[] = [];
  selectedUser: User;
  done: boolean = false; // flag to say data fetch is done
  clicked: boolean = false;

  view: any[] = [700, 400];
  view1: any[] = [200, 400];
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'ProductName';
  showYAxisLabel = true;
  yAxisLabel = 'total';


  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  colorScheme1 = {
    domain: ['#555454', '#A1CC8', '#C7859C', '#AA2222']
  };

  constructor(public users: UsersService, private router: Router) {
    this.selectedUser = JSON.parse(localStorage.getItem(`selectedUser`));
  }
  getUsers(): void {
    this.users.getUserById('e3ce2fdf-6d5b-4d8e-81ae-680b23a1fef8',333).subscribe(tickets => {
      console.log(tickets);

      tickets.forEach(element => {
        console.log(element);
        this.userListItem.push({ "name" : element.productName, "value": element.total });
      });

      this.done = true;
      console.log(this.userListItem);
    })
  }

  ngOnInit() {
    this.getUsers();
  }

  onSelecting(user: User): void {

    this.selectedUser = user;
    //console.log(user.name);
    this.clicked = true;
    this.users.getUserById('e3ce2fdf-6d5b-4d8e-81ae-680b23a1fef8', 333)
    console.log(this.selectedUser.productName);
    // this.router.navigate(['/userdetails',user.id]);
    //this.userListItem.push({"name" :this.selectedUser.name, "value":this.selectedUser.value,"id":this.selectedUser.id})
    //this.router.navigate(['userdetails'],{ queryParams: {Id:user.id} }) ;

    //this.getUserById(user.id);

  }

}
class GUID {
  private str: string;

  constructor(str?: string) {
    this.str = str || GUID.getNewGUIDString();
  }

  toString() {
    return this.str;
  }

  private static getNewGUIDString() {
    // your favourite guid generation function could go here
    // ex: http://stackoverflow.com/a/8809472/188246
    let d = new Date().getTime();
    if (window.performance && typeof window.performance.now === "function") {
      d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      let r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }
}