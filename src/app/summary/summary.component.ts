import { element } from 'protractor';
import { StatusServer, StatusServerList, CountDataStatus, CountCactusNameList, CountUserDataList } from './../interface/my-interface';
import { serverIP, headers } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  constructor(private http: HttpClient,private spinner: NgxSpinnerService) { }
  serverStatus1:boolean
  serverStatus2:boolean
  serverStatus3:boolean
  
  ngOnInit() {

    this.setServerStatus()
    this.setChartALL()
  }

  typeChartCactusName: any;
  dataChartCactusName: any;
  optionsChartCactusName: any;
  typeChartDataStatus: any;
  dataChartDataStatus: any;
  optionsChartDataStatus: any;
  typeChartUserData: any;
  dataChartUserData: any;
  optionsChartUserData: any;
  setChartALL(){
    this.setChartCactusName()
    this.setChartDatastatus()
    this.setChartUserData()
  }

  setChartUserData(){
    this.spinner.show("summary")
    let data:CountUserDataList
    this.http.get(serverIP+'/countUserData/',{headers:headers}).subscribe((resp:CountUserDataList)=>{
        data = resp
    },(error)=>{
      this.spinner.hide("summary")
      alert("ระบบผิดพลาด : "+error.message)

    },()=>{

      let dataSet =[]
      let label =[]
      data.countUserData.forEach(element => {
        dataSet.push(element.count_countUserData)
        let label1
        if(element.EmV==0 ){
          label1="ผู้ใช้งานที่ยังไม่ได้ยืนยันอีเมลล์";
        }else if(element.EmV==1){
          label1="ผู้ใช้งานที่ยืนยันอีเมลล์แล้ว"
  
        }else if (element.EmV == 2){
          label1="ผู้ใช้งานที่ถูกระงับการใช้งาน"
  
        }
      label.push(label1)
      });

      this.typeChartUserData = 'pie';   ////// สามารถกำหนดเป็น 'line','bar','radar','pie','doughnut','polarArea','bubble','scatter'
      this.dataChartUserData = {
        labels: label,
        datasets: [
          { 
            label: "My Stats Chart",
            data: dataSet,
            backgroundColor: ['#1abc9c', '#3498db', '#9b59b6']
          }
        ]
      };
      this.optionsChartUserData = {
        responsive: true,
        maintainAspectRatio: false
      };
      this.spinner.hide("summary")
    }
  
    )
  }

  setChartCactusName(){
    let data:CountCactusNameList
    this.spinner.show("summary")
    this.http.get(serverIP+'/countCactusName/',{headers:headers}).subscribe((resp:CountCactusNameList)=>{
        data = resp
    },(error)=>{
      this.spinner.hide("summary")
      alert("ระบบผิดพลาด : "+error.message)
    },()=>{

      let dataSet =[]
      let label =[]
      data.countCactusName.forEach(element => {
        dataSet.push(element.count_result)
        label.push(element.Result)
      });

      this.typeChartCactusName = 'horizontalBar';   ////// สามารถกำหนดเป็น 'line','bar','radar','pie','doughnut','polarArea','bubble','scatter'
      this.dataChartCactusName = {
        labels: label,
        datasets: [
          {
            barPercentage: 1,
            maxBarThickness: 8,
            minBarLength: 2,    
            label: "My Stats Chart",
            data: dataSet,
          }
        ]
      };
      this.optionsChartCactusName = {
        responsive: true,
        maintainAspectRatio: true
      };
      this.spinner.hide("summary")

    }
  
    )
  
  }

  setChartDatastatus(){
    console.log("dataset")
    let data:CountDataStatus
    this.spinner.show("summary")
    this.http.get(serverIP+'/countDataStatus/',{headers:headers}).subscribe((resp:CountDataStatus)=>{
        data = resp
    },(error)=>{
      this.spinner.hide("summary")
      alert("ระบบผิดพลาด : "+error.message)
    },()=>{
      let dataSet =[]
      let label =[]
      data.countDataStatus.forEach(element => {
        dataSet.push(element.count_datastatus)
        let label1
        if(element.DataStatus=="0" ){
          label1="ข้อมูลที่ผ่านการคัดกรอกและบันทึกลงในชุดข้อมูลแล้ว";
        }else if(element.DataStatus=="1"){
          label1="ข้อมูลที่ยังไม่ผ่านการคัดกรอง"
  
        }else if (element.DataStatus=="2"){
          label1="ข้อมูลที่ผ่านการคัดกรอง"
  
        }else if(element.DataStatus=="3"){
          label1="ข้อมูลที่ไม่ผ่านการคัดกรอง"
  
        }
        label.push(label1)
      });
      this.typeChartDataStatus = 'pie';   ////// สามารถกำหนดเป็น 'line','bar','radar','pie','doughnut','polarArea','bubble','scatter'
      this.dataChartDataStatus = {
        labels: label,
        datasets: [
          {

            data: dataSet,
            backgroundColor: ['#1abc9c', '#3498db', '#9b59b6', '#bdc3c7']
          }
        ]
      };
      this.optionsChartDataStatus = {
        responsive: true,
        maintainAspectRatio: false,      
        pieceLabel: {
          render: 'value',  // สามารถเปลี่ยนการตั้งค่าตามต้องการได้ 'value','label','percentage'
          fontSize: 10,
          fontStyle: 'bold',
          fontColor: '#FFF',
        },
      
      };
      this.spinner.hide("summary")

    }
  
    )
  }

  setServerStatus(){
    let serverStatus:StatusServerList
    this.spinner.show("summary")
    this.http.get(serverIP+"/checkServer/",{headers:headers}).subscribe((resp:StatusServerList)=>{
        serverStatus = resp
    },(error)=>{
      this.serverStatus1 = false;
      this.serverStatus2 = false;
      this.serverStatus3 = false;
      this.spinner.hide("summary")

    },()=>{

      this.serverStatus1 = true;
      serverStatus.status_server.forEach(element => {
         if(element.Name=="preData"){
              if(element.Status == 0){
                this.serverStatus2 =false
              }else{
                  this.serverStatus2=true
              }
         }else if(element.Name=="Training"){
          if(element.Status == 0){
            this.serverStatus3 =false
          }else{
              this.serverStatus3=true
          }
         }
      });
      this.spinner.hide("summary")

    })
  }
}
