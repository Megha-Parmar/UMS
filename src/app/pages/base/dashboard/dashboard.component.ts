import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [MatCardModule]
})
export class DashboardComponent {

  constructor(private readonly store: Store) {
    // this.store.select<>('login').subscribe(data=>{
    //   console.log("data",data)

    // })
  }

}
