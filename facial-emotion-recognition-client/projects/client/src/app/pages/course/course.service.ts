import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private _courses$ = new BehaviorSubject<Course[]>([])
  public courses$ = this._courses$.asObservable()

  updateCourses() {
    const courses = []
    for (let i = 0; i < Math.round(Math.random() * 10) + 15; i++) {
      courses.push({ id: i, name: getItem(names, i), icon:  getItem(icons, i) })
    }
    this._courses$.next(courses)
  }

}

interface Course {
  id: number
  name: string
  icon: string
}

// https://fonts.google.com/icons?selected=Material+Icons
const icons = ['lightbulb', 'title', 'functions', 'data_object', 'account_tree', 'computer', 'device_unknown', 'gps_fixed', 'dvr', 'data_usage']
const names = ['线性代数', '微积分', '大学英语', 'C语言程序设计', '计算机组成原理', '操作系统', '计算机网络', '数据结构与算法', '数据库系统应用']
function getItem(list: string[], i: number): string {
  const len = list.length
  if (i < len) {
    return list[i]
  } else {
    return getItem(list, i - len)
  }
}
