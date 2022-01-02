import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/_models';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  private user_void = new User();
  constructor(private router: Router, private http: HttpClient) {
    let usuario_stored = JSON.parse(localStorage.getItem('usuario') || '0');
    if (usuario_stored !== 0) {
      this.userSubject = new BehaviorSubject<User>(usuario_stored);
      this.user = this.userSubject.asObservable();
    } else {
      this.userSubject = new BehaviorSubject<User>(this.user_void);
      this.user = this.userSubject.asObservable();
    }
  }
  public get userValue(): User {
    return this.userSubject.value;
  }
  register(user: User) {
    return this.http.post(`${environment.apiUrl}/usuario/crearUsuario`, user);
  }

  getAll() {
    return this.http.get<User[]>(
      `${environment.apiUrl}/usuario/obtenerUsuarios`
    );
  }

  getById(id: string) {
    return this.http.get<User>(`${environment.apiUrl}/usuario/${id}`);
  }

  update(id: string, params: any) {
    return this.http.put(`${environment.apiUrl}/usuario/${id}`, params).pipe(
      map((x) => {
        // update stored user if the logged in user updated their own record
        if (id == this.userValue.id) {
          // update local storage
          const user = { ...this.userValue, ...params };
          localStorage.setItem('user', JSON.stringify(user));

          // publish updated user to subscribers
          this.userSubject.next(user);
        }

        return x;
      })
    );
  }

  delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/usuarios/${id}`).pipe(
      map((x) => {
        // auto logout if the logged in user deleted their own record
        if (id == this.userValue.id) {

        }
        return x;
      })
    );
  }
}
