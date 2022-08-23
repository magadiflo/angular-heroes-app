import { Pipe, PipeTransform } from '@angular/core';

import { Hero } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen',
  //pure: false,
})
export class ImagenPipe implements PipeTransform {

  /**
   * * El pipe se va a disparar cada vez que su parámetro de entrada cambie,
   * * en nuestro caso el parámetro de entrada es un objeto: heroe.
   * *
   * * Vemos que internamente ese objeto tiene un atributo llamado alt_img.
   * *
   * * Cuando actualicemos la imagen de un heroe, lo que se actualizará será el 
   * * atributo alt_img y el objeto heroe, seguirá siendo el mismo objeto héroe,
   * * es decir el objeto siempre seguirá apuntando al mismo espacio de memoria, 
   * * por esa razón es que el pipe no se dispara cuando actualizamos la imagen 
   * * de un héroe.
   * *
   * * Si quisiéramos que este pipe se ejecute cada vez que el ciclo de detección de Angular se dispare,
   * * entonces debemos usar el atributo:
   * *      pure: false
   * 
   * * Cuando es verdadero, el PIPE es pura, lo que significa que el método transform() 
   * * se invoca solo cuando cambian sus argumentos de entrada. Los PIPES son puras por defecto.
   * 
   * * Si el PIPE tiene un estado interno (es decir, el resultado depende de un estado 
   * * distinto de sus argumentos), establezca puro en falso. En este caso, el PIPE se 
   * * invoca en cada ciclo de detección de cambios, incluso si los argumentos no han cambiado.
   * *
   * * ATENCIÓN:
   * * Solo si es necesario colocar el pure : false, ya que con eso el pipe se estará ejecutando
   * * en cada momento, aunque si bien es cierto, con eso actualizamos la imagen del héroe, eso 
   * * provocaría también que se esté ejecutando demasiadas veces, incluso con solo tratar de 
   * * editar algún otro campo. 
   * *
   * * En mi caso para actualizar la imagen cuando un usuario cambie la url de alt_img, será asignar
   * * al héroe definido en la propiedad con el héroe devuelto luego de la actualización (ver add.components.ts - save())
   */

  transform(hero: Hero): string {
    console.log('Pipe imagen se procesó...');
    return (!hero.id && !hero.alt_img) ? 'assets/no-image.png' : hero.alt_img ? hero.alt_img : `assets/heroes/${hero.id}.jpg`;
  }

}
