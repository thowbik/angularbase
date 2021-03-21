import { Component, OnInit } from '@angular/core';
import { PageService } from 'services/page.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'services/alert.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  groupList: any[];
  form: FormGroup;
  groupResult: any = [];
  sections: any = [];
  group: any = [];
  groupField: any = [];
  seqNo: number;
  title: any;
  routeParams: any;
  progressValue: number;
  titleIcon: any;
  departmentId: number;
  departmentName: any;
  constructor(private pageService: PageService, private route: ActivatedRoute,
    private formBuilder: FormBuilder, private alert: AlertService) {
    this.routeParams = route.snapshot.queryParams;
     this.departmentId = parseInt(this.routeParams.deptId);
  }

  ngOnInit() {
    this.getGroupListByDeptId();
  }
  getGroupListByDeptId() {
    this.pageService.getGroupListReportByDeptId(22, false).subscribe((res) => {
      if (res) {
        debugger;
        this.departmentName = res.departmentName;
        this.sections = res.section;
        this.titleIcon = res.section[0].group[0].icon;
        debugger;
//         this.sections.forEach(element => {
// this.group.push(element);
      
//         });
//         this.group.forEach(element => {
//           this.groupField.push(element);
                
//                   });
        console.log(this.group);
        // this.groupResult = res.group;
        // this.groupList = res.group[0].groupField;
        // this.seqNo = res.group[0].sequenceNo;
        // this.title = res.group[0].title;
        // this.titleIcon = res.group[0].icon;
        // this.progressValue = (this.seqNo / this.groupResult.length) * 100;
        // const formField = {};
        // this.groupList.forEach(que => {
        //   formField[que.formControlName] = ['', que.isMandatory ? Validators.required : ''];
        // });
        // this.form = this.formBuilder.group(formField);
      }
    });
  }
  onNext() {
      this.seqNo = this.seqNo + 1;
      const result = this.groupResult.filter(a => a.sequenceNo == this.seqNo)[0];
      if (result) {
        this.title = result.title;
        this.titleIcon = result.icon;
        this.progressValue = (this.seqNo / this.groupResult.length) * 100;
        this.groupList = result.groupField;
        const formField = {};
        this.groupList.forEach(que => {
          formField[que.formControlName] = ['', que.isMandatory ? Validators.required : ''];
        });
        this.form = this.formBuilder.group(formField);
      } else {
        this.seqNo = this.groupResult.length;
        // this.seqNo = this.groupResult.length - 1;
      }
      // Object.keys(this.form.value).forEach(key => {
      //   let formControl = this.form.controls[key];
      // });
  }

}
