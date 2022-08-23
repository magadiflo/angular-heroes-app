import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Hero } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styles: [
    `.container-confirm {
        text-align: center;      
    }`
  ]
})
export class ConfirmComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public hero: Hero) { }

  ngOnInit(): void {
    console.log(this.hero);
  }

  //* Esta respuesta, dentro del close, (true) será recibida en el observable afterClosed(), del método remove() 
  //* de la clase add.component.ts. 
  //* Le podemos mandar cualquier respuesta, en este caso le mandamos un valor booleano. Si no le mandamos nada, como
  //* en el caso del método cancel(), le estaremos mandando un undefined, y eso estaría bien ya que si tocamos fuera
  //* del diálogo, también recibimos un undefined
  delete(): void {
    this.dialogRef.close(true);
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
