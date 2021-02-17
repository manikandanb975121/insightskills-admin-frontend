import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatTableModule, MatSort, MatPaginator } from '@angular/material';

// Service
import { CollegeService } from '../../services/college.service';
@Component({
  selector: 'app-college-list',
  templateUrl: './college-list.component.html',
  styleUrls: ['./college-list.component.css']
})
export class CollegeListComponent implements OnInit {

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  collegeData: MatTableDataSource<any>;
  college: any;
  displayedColumns: string[] = ['College Name', 'Email', 'No Of Students', 'Placement Coordinator Name', 'actions'  ];
  constructor(
    private collegeService: CollegeService,
    private router: Router) { }

  ngOnInit() {
    this.collegeService.getCollege();
    this.collegeService.gegUpdatedColleges().subscribe((response) => {
      console.log(response);
      this.college = response;
      this.collegeData = new MatTableDataSource(response);
      this.collegeData.paginator = this.paginator;
    });
  }

  viewProfile(collegeId) {
    console.log(collegeId);
    this.router.navigate(['accounts/college', collegeId]);
  }

  applyFilter(filterValue: string) {
    this.collegeData.filter = filterValue.trim().toLowerCase();
  }
}
