import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/_models';
import { UsuariosService } from '../services/usuarios.service';

//interfaces
export interface DialogData {
  formTitle:'Crear Usuario'|'Editar Usuario';
  result:string;
}



@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss'],
})
export class CrearUsuarioComponent implements OnInit {
  nombre = new FormControl('', [Validators.required]);
  apellido = new FormControl('', [Validators.required]);
  hash = new FormControl('', [Validators.required]);
  nombre_usuario = new FormControl('', [Validators.required]);
  RolID = new FormControl('', [Validators.required]);
  formTitle = this.data.formTitle;

  constructor(
    public dialogRef: MatDialogRef<CrearUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private service: UsuariosService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}
  guardar() {
    let user_data = new User();
    user_data = {
      id: null,
      nombre: this.nombre.value,
      apellido: this.apellido.value,
      hash: this.hash.value,
      nombreUsuario: this.nombre_usuario.value,
      RolID: 1,
    };
    this.data.result = 'Creado';
    this.service.register(user_data).subscribe((data) => {
      console.log(data);
      //notificar creado
      //cerrar dialog
      this.dialogRef.close(this.data.result);

    });
  }
}
