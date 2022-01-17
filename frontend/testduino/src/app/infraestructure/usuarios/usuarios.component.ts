import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { ListarUsuarioComponent } from './listar-usuario/listar-usuario.component';
import { io, Socket } from 'socket.io-client';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {
  @ViewChild('refresh', { static: false }) refresh!: ListarUsuarioComponent;
  formTitle = '';
  resultado = '';
  private socket: Socket;
  constructor(public dialog: MatDialog) {
    this.socket = io('http://localhost:3030');
  }

  ngOnInit(): void {
    console.log('usuarios');
  }
  conectar(): void {
    this.socket.emit('test', 'usuario');
    this.socket.emit('board', 'usuario');
  }
  openCrear(): void {
    this.formTitle = 'Crear Usuario';
    this.openDialog();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(CrearUsuarioComponent, {
      data: {
        formTitle: this.formTitle,
        resultado: this.resultado,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.resultado = result;
      this.refresh.cargarTabla();
      console.log(`Dialog result: ${this.resultado}`);
    });
  }
}
