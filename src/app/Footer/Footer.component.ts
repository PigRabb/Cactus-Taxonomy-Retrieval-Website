import { networkInterfaces } from 'os';
import { from } from 'rxjs';
import { serverIP, IPServer } from './../../environments/environment';
import {  ModelAccuracy } from './../interface/my-interface';
import { headers } from 'src/environments/environment';
import { Component, OnInit, NgZone ,Input, EventEmitter } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-Footer',
  templateUrl: './Footer.component.html',
  styleUrls: ['./Footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService, private http: HttpClient) { }


  Dataset = serverIP+"/get-dataset/"
  AdminCheck = false
  Accuracy: string
  //http://api.ipify.org/?format=json
  ngOnInit() {
    if(localStorage.getItem('role')){
      if(localStorage.getItem('role')=='A'){
        this.AdminCheck=true
      }
    }

    this.http.get(serverIP + "/Model/Accuracy/", { headers: headers }).subscribe((data: ModelAccuracy) => {
      this.Accuracy = (data.Accuracy * 100).toFixed(2) + " %"
    }, (error) => {
      alert("ระบบผิดพลาด : " + error.message)
    }, () => {

    })

  }


  


}
