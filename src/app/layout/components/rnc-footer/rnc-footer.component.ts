import { Component, OnInit } from '@angular/core';
import { environment } from './../../../../environments/environment';

@Component({
  selector: 'rnc-footer',
  templateUrl: './rnc-footer.component.html',
  styleUrls: ['./rnc-footer.component.css']
})
export class RncFooterComponent implements OnInit {
  
  projectName = environment.title;

  constructor() { }

  ngOnInit(): void {
  }

}
