import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// Service
import { CollegeService } from '../../services/college.service';
@Component({
  selector: 'app-college-add',
  templateUrl: './college-add.component.html',
  styleUrls: ['./college-add.component.css']
})
export class CollegeAddComponent implements OnInit {
  registerForm = new FormGroup({
    collegeName : new FormControl('', Validators.required),
    PlacementCordinatorName : new FormControl('', Validators.required),
    placementEmailId : new FormControl('', Validators.required),
    placementNumber : new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  constructor(private collegeService: CollegeService) { }

  ngOnInit() {
  }
  register() {
    if (this.registerForm.invalid) {
      return;
    }
    console.log(this.registerForm.value);
    this.collegeService.createCollege(
      this.registerForm.value.collegeName,
      this.registerForm.value.PlacementCordinatorName,
      this.registerForm.value.placementEmailId,
      this.registerForm.value.placementNumber,
      this.registerForm.value.password
    );
    // this.registerForm.reset();
  }
}
