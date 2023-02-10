import { Router } from '@angular/router';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'rnc-header',
  templateUrl: './rnc-header.component.html',
  styleUrls: ['./rnc-header.component.css']
})
export class RncHeaderComponent implements OnInit {

  menuIsOpen: boolean = false;
  
  @Output() drawer = new EventEmitter<boolean>();

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    sessionStorage.clear();
    this._router.navigateByUrl('/login');
  }

  menuOpened() {
    this.menuIsOpen = true;
}

menuClosed() {
    this.menuIsOpen = false;
}
}
