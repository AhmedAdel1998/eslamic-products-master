import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import {ReactiveFormsModule} from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [PasswordModule,CheckboxModule,RouterModule,ButtonModule,FormsModule,InputTextModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit{
  auth:FormGroup =  new FormGroup({
    userNo: new FormControl(''),
    password: new FormControl('')
  });
  constructor(private service:AuthService,private router:Router,private storage:CookieService){}
  ngOnInit(): void {
  }
  onSubmit(){
    this.service.login(this.auth.value).subscribe(res=>{
      if((res as any).statusCode === 200){
        this.storage.set("x-user",(res as any).result.username);
        this.router.navigate(['/home'])        
      }
    })
  }

}
