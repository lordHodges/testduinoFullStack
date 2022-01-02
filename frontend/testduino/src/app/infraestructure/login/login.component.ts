import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  //data form
  nombre_usuario = new FormControl('', [Validators.required]);
  contrasena = new FormControl('', [Validators.required]);
  returnUrl: string;
  constructor(
    private service: LoginService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  ngOnInit(): void {
    console.log('ngOnInit: login');
    if (this.service.userValue.token !== '') {
      this.router.navigate(['/usuarios']);
    }
  }
  entrar() {
    console.log('entrar: login');
    this.service
      .login(this.nombre_usuario.value, this.contrasena.value)
      .subscribe((user) => {
        console.log('login: ', user);
        this.router.navigate([this.returnUrl]);
      });
  }
}
