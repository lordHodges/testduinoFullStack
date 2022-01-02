import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/_models';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
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
  //disponibiliza la informacion del usuario actual
  public get userValue(): User {
    return this.userSubject.value;
  }
  login(nombreUsuario: string, hash: string) {
    return this.http
      .post<User>(`${environment.apiUrl}/access/login`, {
        nombreUsuario,
        hash,
      })
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('usuario', JSON.stringify(user));
          this.userSubject.next(user);
          return user;
        })
      );
  }
  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('usuario');
    this.userSubject.next(this.user_void);
    this.router.navigate(['/account/login']);
  }
}
