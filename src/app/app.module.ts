import { from } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {  HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeadComponent } from './Head/Head.component';
import { PredictComponent } from './Predict/Predict.component';
import { FormsModule } from '@angular/forms';
import { MainComponent } from './Main/Main.component';
import { SettingComponent } from './Setting/Setting.component';
import { HistoryComponent } from './History/History.component';
import { NgPipesModule } from 'ngx-pipes'
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule ,NoopAnimationsModule} from '@angular/platform-browser/animations';
import { FooterComponent } from './Footer/Footer.component';
import { History_adminComponent } from './history_admin/history_admin.component';
import { DashboardsComponent } from './Dashboards/Dashboards.component';
import { UserMgComponent } from './user-mg/user-mg.component';
import { SummaryComponent } from './summary/summary.component';
import 'chart.piecelabel.js';
import { ChartModule } from 'angular2-chartjs';
import {DataTablesModule} from 'angular-datatables';


@NgModule({
   declarations: [
      AppComponent,
      HeadComponent,
      PredictComponent,
      MainComponent,
      SettingComponent,
      HistoryComponent,
      FooterComponent,
      History_adminComponent,
      DashboardsComponent,
      UserMgComponent,
      SummaryComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      HttpClientModule,
      NgPipesModule,
      NgbModule,
      NgxSpinnerModule,
      BrowserAnimationsModule,
      NoopAnimationsModule,
      ChartModule,
      DataTablesModule
         ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
