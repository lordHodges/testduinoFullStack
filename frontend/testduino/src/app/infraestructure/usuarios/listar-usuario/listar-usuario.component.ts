import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models';
import { UsuariosService } from '../services/usuarios.service';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.scss'],
})
export class ListarUsuarioComponent implements OnInit {
  Users: User[] = [];
  columns = [
    {
      columnDef: 'position',
      header: 'ID',
      cell: (element: User) => `${element.id}`,
    },
    {
      columnDef: 'nombre',
      header: 'Nombre',
      cell: (element: User) => `${element.nombre}`,
    },
    {
      columnDef: 'apellido',
      header: 'Apellido',
      cell: (element: User) => `${element.apellido}`,
    },
    {
      columnDef: 'nombreUsuario',
      header: 'Nombre Usuario',
      cell: (element: User) => `${element.nombreUsuario}`,
    },
  ];
  dataSource: User[]=[];
  displayedColumns = this.columns.map((c) => c.columnDef);
  constructor(private service: UsuariosService) {}

  ngOnInit(): void {
    this.cargarTabla();
  }
  cargarTabla(){
    this.service.getAll().subscribe((data) => {
      this.dataSource = data;
    });
  }
}
