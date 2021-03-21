import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms'
import { NavigationService } from 'services/navigation.service';
import { UserService } from 'services/user.service';
import { AlertService } from 'services/alert.service';
import { PasswordStrengthValidator } from 'app/shared/validators/password-strength.validators';


@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {
  form: FormGroup;
  eventData: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private navigationService: NavigationService,
    private userService: UserService,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<ChangepasswordComponent>) {
    if (this.data) {
      this.eventData = JSON.stringify(data);
    }
    this.initializeValidators();
  }

  ngOnInit() {
  }
  initializeValidators() {
    this.form = new FormGroup({
      oldpassword: new FormControl('', [Validators.required]),
      newpassword: new FormControl('', [Validators.required, PasswordStrengthValidator]),
      confirmpassword: new FormControl('', [Validators.required])
    });
  }

  // onLogout() {
  //   this.authService.logOut();
  //   this.navigationService.goToLogin();
  // }

  onSave() {
    if (this.form.valid && (this.form.value.newpassword === this.form.value.confirmpassword)) {
      this.userService.changepasswordUser(this.form.value).subscribe(result => {
        if (result) {
          this.navigationService.goToLogin();
          this.alertService.success('Your password has been changed');
          this.dialogRef.close();
        }
      });
    } else {
      this.validateFormControl();
    }
  }
  validateFormControl() {
    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({
          onlySelf: true
        });
      }
    })
  }
  onCancel() {
    this.dialogRef.close();
  }
}
