export class User {
  id: string|null;
  nombreUsuario: string;
  hash: string;
  nombre: string;
  apellido: string;
  RolID: number;
  token?: string|null;
  constructor(){
    this.id = '';
    this.nombreUsuario = '';
    this.hash = '';
    this.nombre = '';
    this.apellido = '';
    this.RolID = 0;
    this.token = '';
  }
}
