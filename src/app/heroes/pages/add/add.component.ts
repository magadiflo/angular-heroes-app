import { Component, OnInit } from '@angular/core';

import { Hero, Publisher } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [
  ]
})
export class AddComponent implements OnInit {

  publishers: Publisher[] = [Publisher.DCComics, Publisher.MarvelComics];
  hero!: Hero;


  constructor() { }

  ngOnInit(): void {
  }

}
