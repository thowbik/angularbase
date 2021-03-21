import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'services/navigation.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(private navigationService: NavigationService) { }

  ngOnInit() {
  }
  goToQuestion() {
    this.navigationService.goToDepartments();
  }
}
