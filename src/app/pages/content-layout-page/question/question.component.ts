import { Component, OnInit, Input } from '@angular/core';
import { PageService } from 'services/page.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatStepperNext, MatStepper } from '@angular/material';
import * as _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'services/alert.service';
import swal from 'sweetalert2';
import { AuthenticationService } from 'services/authentication.service';
import { NavigationService } from 'services/navigation.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { HelpComponent } from '../help/help.component';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  groupList: any[];
  form: FormGroup;
  groupResult: any = [];
  seqNo: number;
  title: any;
  routeParams: any;
  progressValue: number;
  titleIcon: any;
  groupId: number;
  departmentId: any;
  departmentName: any;
  helpContent: any;
  constructor(private pageService: PageService, private route: ActivatedRoute,
    private formBuilder: FormBuilder, private alert: AlertService,
    private router: Router, private authService: AuthenticationService,
    private navigationService: NavigationService,
    private dialog: MatDialog) {
    this.routeParams = route.snapshot.queryParams;
    this.departmentId = this.routeParams.deptId;
    this.departmentName = this.routeParams.deptName;
  }

  ngOnInit() {
    this.getGroupListByDeptId();
  }

  getGroupListByDeptId() {
    this.pageService.getGroupListByDeptId(1, false).subscribe((res) => {
      if (res && res.group && res.group.length > 0) {
        this.groupResult = res.group;
        this.groupList = _.sortBy(res.group[0].groupField, o => o.sequenceNo);
        // this.groupList = res.group[0].groupField;
        this.seqNo = res.group[0].sequenceNo;
        this.title = res.group[0].title;
        this.titleIcon = res.group[0].icon;
        this.groupId = res.group[0].id;
        this.helpContent = res.group[0].helpContent;
        this.progressValue = (this.seqNo / this.groupResult.length) * 100;
        const formField = {};
        this.groupList.forEach(que => {
          formField[que.formControlName] = ['', que.isMandatory ? Validators.required : ''];
        });
        this.form = this.formBuilder.group(formField);
      }
    });
  }

  onSelectedChange(item, id) {
    const selecteDs = this.groupList.filter(a => a.id === id)[0];
    if (selecteDs) {
      selecteDs.fieldDataSource.forEach(element => {
        element.groupField.forEach(el => {
          this.groupList.forEach(que => {
            if (que.id == el) {
              que.isChild = true;
            } else {
              que.isChild = false;
            }
          });
        });
      });
      const result = selecteDs.fieldDataSource.filter(a => a.id == item)[0];
      if (result) {
        result.groupField.forEach(element => {
          this.groupList.forEach(que => {
            if (que.id == element) {
              que.isChild = false;
            }
          });
        });
      }
    }
  }

  onRadioChange(item, id) {
    const selecteDs = this.groupList.filter(a => a.id === id)[0];
    if (selecteDs) {
      selecteDs.fieldDataSource.forEach(element => {
        element.groupField.forEach(el => {
          this.groupList.forEach(que => {
            if (que.id == el) {
              que.isChild = true;
            }
          });
        });
      });
      const result = selecteDs.fieldDataSource.filter(a => a.id == item)[0];
      if (result) {
        result.groupField.forEach(element => {
          this.groupList.forEach(que => {
            if (que.id == element) {
              que.isChild = false;
            }
          });
        });
      }
    }
    this.groupList = _.sortBy(this.groupList, o => o.sequenceNo);
  }

  onNext() {
    if (this.form.valid) {
      this.saveForm();
    } else {
      this.alert.error('Please fill all the required fields!');
    }
  }

  onBack() {
    this.seqNo = this.seqNo - 1;
    const result = this.groupResult.filter(a => a.sequenceNo == this.seqNo)[0];
    if (result) {
      this.title = result.title;
      this.titleIcon = result.icon;
      this.groupId = result.id;
      this.helpContent = result.helpContent;
      this.progressValue = (this.seqNo / this.groupResult.length) * 100;
      this.groupList = _.sortBy(result.groupField, o => o.sequenceNo);
      // this.groupList = result.groupField;
      const formField = {};
      this.groupList.forEach(que => {
        formField[que.formControlName] = ['', que.isMandatory ? Validators.required : ''];
      });
      this.form = this.formBuilder.group(formField);
    } else {
      this.seqNo = 1;
    }
  }

  saveForm() {
    const formFieldData = [];
    Object.keys(this.form.value).forEach(key => {
      const queId = key;
      const val = this.form.controls[key].value
      // tslint:disable-next-line: radix
      formFieldData.push({ id: parseInt(queId), value: val, fieldDataSource_Id: null });
    });
    const saveForm: any = {};
    saveForm.id = 0;
    // tslint:disable-next-line: radix
    saveForm.Department_Id = parseInt(this.departmentId);
    saveForm.group_Id = this.groupId;
    saveForm.groupField = formFieldData;
    this.pageService.saveAssessment(saveForm).subscribe((res) => {
      if (res) {
        if (this.seqNo == this.groupResult.length) {
          swal.fire({
            title: 'Assessment',
            text: 'Saved Successfully',
            type: 'success',
            showCancelButton: false,
            confirmButtonColor: '#0BAF71',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok',
            cancelButtonText: 'No',
          }).then((result) => {
            if (result.value) {
              this.authService.logOut();
              this.navigationService.goToLogin();
            }
          })
          // tslint:disable-next-line: radix
          // this.router.navigate(['/reports'], { queryParams: { 'deptId': parseInt(this.departmentId) }, skipLocationChange: true });
        } else {
          this.seqNo = this.seqNo + 1;
          const result = this.groupResult.filter(a => a.sequenceNo == this.seqNo)[0];
          if (result) {
            this.title = result.title;
            this.titleIcon = result.icon;
            this.helpContent = result.helpContent;
            this.groupId = result.id;
            this.progressValue = (this.seqNo / this.groupResult.length) * 100;
            this.groupList = _.sortBy(result.groupField, o => o.sequenceNo);
            // this.groupList = result.groupField;
            const formField = {};
            this.groupList.forEach(que => {
              formField[que.formControlName] = ['', que.isMandatory ? Validators.required : ''];
            });
            this.form = this.formBuilder.group(formField);
          } else {
            this.seqNo = this.groupResult.length;
          }
        }
      }
    });
  }

  onHelp() {
    if (this.groupId > 0) {
      const content = { deptName: this.departmentName, groupName: this.title, helpContent: this.helpContent }
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '60%';
      dialogConfig.height = '70%';
      dialogConfig.data = { helpDetails: content }
      const dialogRef = this.dialog.open(HelpComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(
        data => {
          console.log('Dialog output:', data)
        }
      );
    }
  }
}
