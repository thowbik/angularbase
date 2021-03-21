import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'services/authentication.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material';
import { ForgotpasswordComponent } from './forgotpassword.component';
import { NavigationService } from 'services/navigation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  returnUrl: string;

  constructor(private router: Router,
    private authService: AuthenticationService,
    private route: ActivatedRoute, public dialog: MatDialog, private navigationService: NavigationService) {
    this.router = router;
  }

  ngOnInit() {
    this.authService.logOut();
    this.initializeValidators();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  initializeValidators() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(() => {
        this.router.navigate([this.returnUrl]);
      });
    } else {
      this.validateFormControl();
    }
  }
  onQuestion() {
    this.navigationService.goToWelcome();
  }

  validateFormControl() {
    Object.keys(this.loginForm.controls).forEach(field => {
      const control = this.loginForm.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({
          onlySelf: true
        });
      }
    })
  }


  // On registration link click
  onRegister() {
    this.router.navigate(['/register']);
  }

  openAddFileDialog() {
    const dialogRef = this.dialog.open(ForgotpasswordComponent, {
      width: '25%',
      autoFocus: false

    })
    dialogRef.afterClosed().subscribe(data => {

      if (data) {

      }
    });

  }

}
