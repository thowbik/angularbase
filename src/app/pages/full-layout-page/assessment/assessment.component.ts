import { Component, OnInit } from '@angular/core';
import { PageService } from 'services/page.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.scss']
})
export class AssessmentComponent implements OnInit {
  assList: any = [];
  constructor(private pageService: PageService,private router:Router) { }

  ngOnInit() {
    this.getAssessment();
  }

  getAssessment() {
    this.pageService.getAssessment(true).subscribe((res) => {
      if (res) {
        this.assList = res;
      }
    });
  }
  onViewClick(value) {
    this.router.navigate(['/reports'], { queryParams: { 'deptId': parseInt(value) }, skipLocationChange: true });
   }

}
