import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { NavigationService } from 'services/navigation.service';
import { DepartmentService } from 'services/department.service';
import { AlertService } from 'services/alert.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  form: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private navigationService: NavigationService,
    private departmentService: DepartmentService,
    private alertService: AlertService, private router: Router) {
    this.initializeValidators();
  }

  ngOnInit() {
    this.form.controls['isUserNameAs'].setValue(0);
  }

  initializeValidators() {
    // tslint:disable-next-line:no-debugger
    debugger;
    this.form = this.formBuilder.group({
      id: [0, [Validators.required]],
      name: ['', [Validators.required, Validators.pattern('.*\\S.*[a-zA-z ]')]],
      contactNo: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      email: ['', [Validators.required, Validators.email]],
      gSTNo: ['', [Validators.required]],
      billingAddress: ['', [Validators.required]],
      contactPersonName: ['', [Validators.required, Validators.pattern('.*\\S.*[a-zA-z ]')]],
      contactPersonNo: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      contactPersonEmail: ['', [Validators.required, Validators.email]],
      departmentStatusType: [1],
      Role_id: [4],
      isUserNameAs: ['', [Validators.required]],
    });
  }

  onSave() {
    if (this.form.valid) {
      this.departmentService.registerDepartment(this.form.value).subscribe(result => {
        if (result) {
          this.navigationService.goToLogin();
          this.alertService.success('Registered successfully!');
        }
      });
    } else {
      this.validateFormControl();
    }
  }

  onCancel() {
    this.router.navigateByUrl('login');
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
}


