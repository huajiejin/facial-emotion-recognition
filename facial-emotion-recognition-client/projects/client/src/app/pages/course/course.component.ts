import { Component, OnInit } from '@angular/core';
import { CourseService } from './course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  public courses$ = this.cs.courses$

  constructor(private cs: CourseService) { }

  ngOnInit(): void {
    this.cs.updateCourses()
  }

}
