import { Pipe, PipeTransform } from '@angular/core';

import { Hero } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(hero: Hero): string {
    return (!hero.id && !hero.alt_img) ? 'assets/no-image.png' : hero.alt_img ? hero.alt_img : `assets/heroes/${hero.id}.jpg`;
  }

}
