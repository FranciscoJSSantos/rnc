import { Component, OnInit } from '@angular/core';
import { environment } from './../../../../../../environments/environment'

@Component({
  selector: 'app-rnc-about-us',
  templateUrl: './rnc-about-us.component.html',
  styleUrls: ['./rnc-about-us.component.css']
})
export class RncAboutUsComponent implements OnInit {

  projectName = environment.title;
  
  constructor() { }

  ngOnInit(): void {
  }

}
