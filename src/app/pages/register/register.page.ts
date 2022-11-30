import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  formReg: FormGroup;

  constructor(private userService: UserService,
    private router: Router) { 
    this.formReg = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  ngOnInit() {
  }

  onSubmit(){
    this.userService.register(this.formReg.value).then(res => {
      console.log(res);
      this.router.navigate(['/login']);
    }).catch(err => {
      console.log(err);
    });
  }


}
