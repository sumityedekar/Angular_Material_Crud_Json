import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private userService:UserService, private  dialog: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA)public data:any
    ){

    this.registerForm = this.fb.group({
      department:'',
      name:'',
      mobile:'',
      email:'',
      doj:'',
      gender:'',
      salary:'',
      usercode:'',
      status:''
    })
  }

  ngOnInit(){
    this.registerForm.patchValue(this.data)
  }

  onFormSubmit(){
    if(this.registerForm.valid){
      if(this.data){
        this.userService.updateUser(this.data.id,this.registerForm.value).subscribe(res => {
          alert("User updated successfully");
          this.dialog.close(true);
        })
      }else{
        this.userService.addUser(this.registerForm.value).subscribe(res => {
          alert("User added successfully");
          this.dialog.close(true);
        })
      }
      
    }
  }

}
