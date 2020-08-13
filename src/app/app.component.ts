import { Component, OnInit } from '@angular/core';
import { notes } from './mock_notes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit{
  ngOnInit(): void {
    //throw new Error("Method not implemented.");
  }
  constructor(public _router: Router){}

  title = 'Note-Taker';
}
