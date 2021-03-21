import { Component, Output, EventEmitter, OnInit, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LayoutService } from '../services/layout.service';
import { ConfigService } from '../services/config.service';
import { AuthenticationService } from 'services/authentication.service';
import { NavigationService } from 'services/navigation.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UserSessionService } from 'services/usersession.service';
import { MatDialog } from '@angular/material';
import { DepartmentService } from 'services/department.service';
import { ChangepasswordComponent } from 'app/pages/content-layout-page/changepassword/changepassword.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit, AfterViewInit {
  currentLang = 'en';
  toggleClass = 'ft-maximize';
  placement = 'bottom-right';

  loggedOnUserName: string;
  loggedOnroleId: number;

  public isCollapsed = true;
  @Output()
  toggleHideSidebar = new EventEmitter<Object>();

  public config: any = {};
  
  constructor(public translate: TranslateService,
    private layoutService: LayoutService,
    private authService: AuthenticationService,
    private navigationService: NavigationService,
    private userSessionService: UserSessionService,
    public dialog: MatDialog,
    private configService: ConfigService,
    private departmentService: DepartmentService,
    public router: Router) {
    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|es|pt|de/) ? browserLang : 'en');
    this.loggedOnUserName = userSessionService.getUserName();
    this.loggedOnroleId = this.userSessionService.roleId();
  }

  ngOnInit() {
    // alert(session.roleId);
    this.config = this.configService.templateConf;
    // this.user_id = this.sessionData.userId;
  }

  ngAfterViewInit() {
    if (this.config.layout.dir) {
      const dir = this.config.layout.dir;
      if (dir === 'rtl') {
        this.placement = 'bottom-left';
      } else if (dir === 'ltr') {
        this.placement = 'bottom-right';
      }
    }
  }

  ChangeLanguage(language: string) {
    this.translate.use(language);
  }

  ToggleClass() {
    if (this.toggleClass === 'ft-maximize') {
      this.toggleClass = 'ft-minimize';
    } else {
      this.toggleClass = 'ft-maximize';
    }
  }

  toggleNotificationSidebar() {
    this.layoutService.emitChange(true);
  }

  toggleSidebar() {
    const appSidebar = document.getElementsByClassName('app-sidebar')[0];
    if (appSidebar.classList.contains('hide-sidebar')) {
      this.toggleHideSidebar.emit(false);
    } else {
      this.toggleHideSidebar.emit(true);
    }
  }
  onLogout() {
    this.authService.logOut();
    this.navigationService.goToLogin();
  }

  confirmtext() {
    swal.fire({
      title: 'Are you sure ?',
      text: 'You want to log out ',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        this.onLogout();
      }
    })
  }
  openChangePasswordDialog() {
    const dialogRef = this.dialog.open(ChangepasswordComponent, {
      width: '30%',
      autoFocus: false
    })
    dialogRef.afterClosed().subscribe(data => {

      if (data) {

      }
    });

  }

  openMyProfile() {
    const myDepartmentId = this.userSessionService.getdepartmentId();
    this.navigationService.goToDepartmentById(myDepartmentId);
  }
}
