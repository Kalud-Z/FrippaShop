import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerLoginComponent } from './loading-spinner-login/loading-spinner-login.component';
import { LoginComponent } from './login.component';
import { CutLayerDirective } from './cut-layer.directive';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


const AppRoutes: Routes = [ 
       {path:'' , component : LoginComponent},
]

@NgModule({
  declarations: [
    LoadingSpinnerLoginComponent,
    LoginComponent,
    CutLayerDirective,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AppRoutes),
    FormsModule,
    HttpClientModule,
  ]
})
export class LoginModule { }
