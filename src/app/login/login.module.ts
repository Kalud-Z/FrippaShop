import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerLoginComponent } from '../shared/loading-spinner-login/loading-spinner-login.component';
import { LoginComponent } from './login.component';
import { CutLayerDirective } from './_directives/cut-layer.directive';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';


const AppRoutes: Routes = [ 
       {path:'' , component : LoginComponent},
]

@NgModule({
  declarations: [
    LoginComponent,
    CutLayerDirective,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AppRoutes),
    FormsModule,
    HttpClientModule,
    SharedModule
  ]
})
export class LoginModule { }
