import { DataFT, DataOfFT } from './../../../../WebTest2/src/app/app.component';

import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-Main',
  templateUrl: './Main.component.html',
  styleUrls: ['./Main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService,private http: HttpClient) { }
  AdminCheck=false
  DataFT: DataOfFT;
  Accuracy:number
  FTcheck:boolean=false
  idClass1=[]
  idClass2=[]

  ngOnInit() {
    this.spinner.show("main")
    this.http.get<DataOfFT>('assets/dataFT.json').subscribe((data) => {
      this.DataFT = data;
    }, (error) => {
      this.spinner.hide("main")
      alert("ระบบผิดพลาด : " + error.message)

    }, () => {
      for(let i=0;i<13;i++){
        this.idClass1.push("carouselExampleCaptions"+i)
        this.idClass2.push("#carouselExampleCaptions"+i)

      }
      this.FTcheck = true
      this.spinner.hide("main")

    });
  }
  

}
