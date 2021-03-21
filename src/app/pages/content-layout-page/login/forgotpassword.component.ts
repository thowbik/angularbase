import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NavigationService } from 'services/navigation.service';
import { UserService } from 'services/user.service';
import { AlertService } from 'services/alert.service';


@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {
  forgotForm: FormGroup;
  eventData: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ForgotpasswordComponent>,
    private navigationService: NavigationService,
    private userService: UserService,
    private alertService: AlertService) {
    if (this.data) {
      this.eventData = JSON.stringify(data);
    }
    this.initializeValidators();
  }

  ngOnInit() {
  }
  initializeValidators() {
    this.forgotForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email])
    });
  }

  onSave() {
    if (this.forgotForm.valid) {
      this.userService.forgotpasswordUser(this.forgotForm.value).subscribe(result => {
        if (result) {
          this.navigationService.goToLogin();
          this.alertService.success('Password has send to your mail id');
        }
      });
    } else {
      this.validateFormControl();
    }
  }

  validateFormControl() {
    Object.keys(this.forgotForm.controls).forEach(field => {
      const control = this.forgotForm.get(field);
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
