import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  noOfPlayers: number = 2522550;
  noOfGames: number=21420;
  ngOnInit(){
  //   setInterval(() => {
  // this.noOfGames = fetch ;
  //   }, 1000);
  }
}
