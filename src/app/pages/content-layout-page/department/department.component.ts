import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'services/navigation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageService } from 'services/page.service';
import { Router } from '@angular/router';
import { AlertService } from 'services/alert.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  departmentId: any;
  form: FormGroup;
  deptList: any[];
  dept: any;
  constructor(private navigationService: NavigationService,
    private fb: FormBuilder,
    private pageService: PageService, private router: Router, private alert: AlertService) { }

  ngOnInit() {
    this.deptList = [];
    this.form = this.fb.group({
      dept: ['', Validators.required],
    });
    this.getSampleData();
  }
  getSampleData() {
    this.pageService.getDepartment(true).subscribe((res) => {
      if (res) {
        this.deptList = res;
      }
    });
  }
  getSelectedItem(item) {
    // tslint:disable-next-line: radix
    this.departmentId = parseInt(item);
    this.dept = this.deptList.filter(a => a.key == item)[0].value;
  }
  onSubmit() {
    if (this.form.valid) {
      // tslint:disable-next-line: max-line-length
      this.router.navigate(['/question'], { queryParams: { 'deptId': this.departmentId, 'deptName': this.dept }, skipLocationChange: true });
    } else {
      this.alert.error('Please fill all the required fields!');
    }
  }
}
