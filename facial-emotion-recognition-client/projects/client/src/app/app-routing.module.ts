import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './pages/course/course.component';
import { DemoComponent } from './pages/demo/demo.component';
import { LoginComponent } from './pages/login/login.component';
import { WatchComponent } from './pages/watch/watch.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent, data: { title: '首页' } },
  { path: 'login', component: LoginComponent, data: { title: '登录' } },
  { path: 'course', component: CourseComponent, data: { title: '所有课程' } },
  { path: 'watch/:id', component: WatchComponent, data: { title: '' } },
  { path: 'demo', component: DemoComponent, data: { title: '测试' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
