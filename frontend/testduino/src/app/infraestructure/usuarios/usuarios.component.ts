import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { ListarUsuarioComponent } from './listar-usuario/listar-usuario.component';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {

  @ViewChild('refresh', { static: false }) refresh!: ListarUsuarioComponent ;
  formTitle ='';
  resultado='';
  constructor(public dialog: MatDialog) {

  }

  ngOnInit(): void {
    console.log('usuarios');
  }
  openCrear(): void {
    this.formTitle = 'Crear Usuario';
    this.openDialog();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(CrearUsuarioComponent,{
      data: {
        formTitle: this.formTitle,
        resultado:this.resultado
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.resultado = result;
      this.refresh.cargarTabla();
      console.log(`Dialog result: ${this.resultado}`);

    });
  }
}
