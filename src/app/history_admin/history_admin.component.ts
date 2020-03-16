import { DataOfFT } from './../../../../WebTest2/src/app/app.component';
import { Predict } from './../interface/my-interface';
import { predictData, CacTusData, Cactu } from '../interface/my-interface';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { serverIP, headers } from 'src/environments/environment';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-history_admin',
  templateUrl: './history_admin.component.html',
  styleUrls: ['./history_admin.component.css']
})
export class History_adminComponent implements OnInit {

  Predict: Predict

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) { }

  historyData: predictData
  DataFT: DataOfFT;

  FT: string[]
  DataType="time"
  Sort="asc"
  CactusName
  memberId: number = 0
  Cactus: CacTusData
  CactusImage: Cactu
  NameCactus
  search

  checkHistory() {
    if (!this.historyData) {
      alert('ไม่พบข้อมูล')
      window.location.reload()
    }
  }

  setDataStatus(){
    for(let i=0;i<this.historyData.predict.length;i++){
      if(this.historyData.predict[i].DataStatus=="0" ){
        this.historyData.predict[i].DataStatus="ข้อมูลที่ผ่านการคัดกรอกและบันทึกลงในชุดข้อมูลแล้ว";
      }else if(this.historyData.predict[i].DataStatus=="1"){
        this.historyData.predict[i].DataStatus="ข้อมูลที่ยังไม่ผ่านการคัดกรอง"

      }else if (this.historyData.predict[i].DataStatus=="2"){
        this.historyData.predict[i].DataStatus="ข้อมูลที่ผ่านการคัดกรอง"

      }else if(this.historyData.predict[i].DataStatus=="3"){
        this.historyData.predict[i].DataStatus="ข้อมูลที่ไม่ผ่านการคัดกรอง"

      }
    }
  }

  searchHistory() {
    let Data: predictData
    this.spinner.show("history_admin")
    if (this.memberId > 0) {
      if (this.CactusName) {
        if (this.Sort && this.DataFT) {
          this.http.post(serverIP + "/history/all/", {

            id: this.memberId,
            sort: this.Sort,
            sortBy: this.DataType,
            CactusName: this.CactusName

          }, { headers: headers }).subscribe((data: predictData) => {
            if (data.predict.length == 0) {
              alert('ไม่พบข้อมูล')
              window.location.reload()
            }
            Data = data
          }, (error) => {
            this.spinner.hide("history_admin")
            alert("ระบบผิดพลาด : " + error.message)
          }, () => {
            this.historyData = Data;
            this.checkHistory()
            this.unixTimeToDate()
            this.pageList=[]
            this.setListPage()
            this.statusCheck=true;
            this.spinner.hide("history_admin")
          })
        } else {
          if (this.Sort) {
            this.http.post(serverIP + "/history/all/", {

              id: this.memberId,
              sort: this.Sort,
              sortBy: "id",
              CactusName: this.CactusName

            }, { headers: headers }).subscribe((data: predictData) => {
              if (data.predict.length == 0) {
                alert('ไม่พบข้อมูล')
                window.location.reload()
              }
              Data = data
            }, (error) => {
              this.spinner.hide("history_admin")
              alert("ระบบผิดพลาด : " + error.message)
            }, () => {
              this.historyData = Data;
              this.checkHistory()
              this.unixTimeToDate()
              this.pageList=[]
              this.setListPage()
              this.statusCheck=true;
              this.spinner.hide("history_admin")

            })
          } else if (this.DataType) {
            this.http.post(serverIP + "/history/all/", {

              id: this.memberId,
              sort: "asc",
              sortBy: this.DataType,
              CactusName: this.CactusName

            }, { headers: headers }).subscribe((data: predictData) => {
              if (data.predict.length == 0) {
                alert('ไม่พบข้อมูล')
                window.location.reload()
              }
              Data = data

            }, (error) => {
              this.spinner.hide("history_admin")
              alert("ระบบผิดพลาด : " + error.message)
            }, () => {
              this.historyData = Data;
              this.checkHistory()
              this.unixTimeToDate()
              this.pageList=[]
              this.setListPage()
              this.statusCheck=true;
              this.spinner.hide("history_admin")
            })
          } else {
            this.http.post(serverIP + "/history/all/", {

              id: this.memberId,
              sort: "asc",
              sortBy: "id",
              CactusName: this.CactusName

            }, { headers: headers }).subscribe((data: predictData) => {

              if (data.predict.length == 0) {
                alert('ไม่พบข้อมูล')
                window.location.reload()
              }
              Data = data

            }, (error) => {
              this.spinner.hide("history_admin")
              alert("ระบบผิดพลาด : " + error.message)
            }, () => {
              this.historyData = Data;
              this.checkHistory()
              this.unixTimeToDate()
              this.pageList=[]
              this.setListPage()
              this.statusCheck=true;
              this.spinner.hide("history_admin")
            })
          }
        }
      } else {
        if (this.Sort && this.DataFT) {
          this.http.post(serverIP + "/history/all/", {
            id: this.memberId,
            sort: this.Sort,
            sortBy: this.DataType,
            CactusName: "null"

          }, { headers: headers }).subscribe((data: predictData) => {
            Data = data
          }, (error) => {
            this.spinner.hide("history_admin")

            alert("ระบบผิดพลาด : " + error.message)
          }, () => {
            this.historyData = Data;
            this.checkHistory()
            this.unixTimeToDate()
            this.pageList=[]
            this.setListPage()
            this.statusCheck=true;
            this.spinner.hide("history_admin")
          })
        } else {
          if (this.Sort) {
            this.http.post(serverIP + "/history/all/", {

              id: this.memberId,
              sort: this.Sort,
              sortBy: "id",
              CactusName: "null"

            }, { headers: headers }).subscribe((data: predictData) => {
              Data = data
            }, (error) => {
              this.spinner.hide("history_admin")
              alert("ระบบผิดพลาด : " + error.message)
            }, () => {
              this.historyData = Data;
              this.checkHistory()
              this.unixTimeToDate()
              this.pageList=[]
              this.setListPage()
              this.statusCheck=true;
              this.spinner.hide("history_admin")

            })
          } else if (this.DataType) {
            this.http.post(serverIP + "/history/all/", {

              id: this.memberId,
              sort: "asc",
              sortBy: this.DataType,
              CactusName: "null"

            }, { headers: headers }).subscribe((data: predictData) => {
              Data = data
            }, (error) => {
              this.spinner.hide("history_admin")
              alert("ระบบผิดพลาด : " + error.message)
            }, () => {
              this.historyData = Data;
              this.checkHistory()
              this.unixTimeToDate()
              this.pageList=[]
              this.setListPage()
              this.statusCheck=true;
              this.spinner.hide("history_admin")
            })
          }
        }
      }
    }else{
      if (this.CactusName) {
        if (this.Sort && this.DataFT) {
          this.http.post(serverIP + "/history/all/", {

            id: -1,
            sort: this.Sort,
            sortBy: this.DataType,
            CactusName: this.CactusName

          }, { headers: headers }).subscribe((data: predictData) => {
            if (data.predict.length == 0) {
              alert('ไม่พบข้อมูล')
              window.location.reload()
            }
            Data = data
          }, (error) => {
            this.spinner.hide("history_admin")
            alert("ระบบผิดพลาด : " + error.message)
          }, () => {
            this.historyData = Data;
            this.checkHistory()
            this.unixTimeToDate()
            this.pageList=[]
            this.setListPage()
            this.statusCheck=true;
            this.spinner.hide("history_admin")
          })
        } else {
          if (this.Sort) {
            this.http.post(serverIP + "/history/all/", {

              id: -1,
              sort: this.Sort,
              sortBy: "id",
              CactusName: this.CactusName

            }, { headers: headers }).subscribe((data: predictData) => {
              if (data.predict.length == 0) {
                alert('ไม่พบข้อมูล')
                window.location.reload()
              }
              Data = data
            }, (error) => {
              this.spinner.hide("history_admin")
              alert("ระบบผิดพลาด : " + error.message)
            }, () => {
              this.historyData = Data;
              this.checkHistory()
              this.unixTimeToDate()
              this.pageList=[]
              this.setListPage()
              this.statusCheck=true;
              this.spinner.hide("history_admin")

            })
          } else if (this.DataType) {
            this.http.post(serverIP + "/history/all/", {

              id: -1,
              sort: "asc",
              sortBy: this.DataType,
              CactusName: this.CactusName

            }, { headers: headers }).subscribe((data: predictData) => {
              if (data.predict.length == 0) {
                alert('ไม่พบข้อมูล')
                window.location.reload()
              }
              Data = data

            }, (error) => {
              this.spinner.hide("history_admin")
              alert("ระบบผิดพลาด : " + error.message)
            }, () => {
              this.historyData = Data;
              this.checkHistory()
              this.unixTimeToDate()
              this.pageList=[]
              this.setListPage()
              this.statusCheck=true;
              this.spinner.hide("history_admin")
            })
          } else {
            this.http.post(serverIP + "/history/all/", {

              id: -1,
              sort: "asc",
              sortBy: "id",
              CactusName: this.CactusName

            }, { headers: headers }).subscribe((data: predictData) => {

              if (data.predict.length == 0) {
                alert('ไม่พบข้อมูล')
                window.location.reload()
              }
              Data = data

            }, (error) => {
              this.spinner.hide("history_admin")
              alert("ระบบผิดพลาด : " + error.message)
            }, () => {
              this.historyData = Data;
              this.checkHistory()
              this.unixTimeToDate()
              this.pageList=[]
              this.setListPage()
              this.statusCheck=true;
              this.spinner.hide("history_admin")
            })
          }
        }
      } else {
        if (this.Sort && this.DataFT) {
          this.http.post(serverIP + "/history/all/", {

            id: -1,
            sort: this.Sort,
            sortBy: this.DataType,
            CactusName: "null"

          }, { headers: headers }).subscribe((data: predictData) => {
            Data = data
          }, (error) => {
            this.spinner.hide("history_admin")

            alert("ระบบผิดพลาด : " + error.message)
          }, () => {
            this.historyData = Data;
            this.checkHistory()
            this.unixTimeToDate()
            this.pageList=[]
            this.setListPage()
            this.statusCheck=true;
            this.spinner.hide("history_admin")
          })
        } else {
          if (this.Sort) {
            this.http.post(serverIP + "/history/all/", {

              id: -1,
              sort: this.Sort,
              sortBy: "id",
              CactusName: "null"

            }, { headers: headers }).subscribe((data: predictData) => {
              Data = data
            }, (error) => {
              this.spinner.hide("history_admin")
              alert("ระบบผิดพลาด : " + error.message)
            }, () => {
              this.historyData = Data;
              this.checkHistory()
              this.unixTimeToDate()
              this.pageList=[]
              this.setListPage()
              this.statusCheck=true;
              this.spinner.hide("history_admin")

            })
          } else if (this.DataType) {
            this.http.post(serverIP + "/history/all/", {

              id: -1,
              sort: "asc",
              sortBy: this.DataType,
              CactusName: "null"

            }, { headers: headers }).subscribe((data: predictData) => {
              Data = data
            }, (error) => {
              this.spinner.hide("history_admin")
              alert("ระบบผิดพลาด : " + error.message)
            }, () => {
              this.historyData = Data;
              this.checkHistory()
              this.unixTimeToDate()
              this.pageList=[]
              this.setListPage()
              this.statusCheck=true;
              this.spinner.hide("history_admin")
            })
          }
        }
      }
    }
      
  }

  async setImageCactus(name) {
    await this.Cactus.Cactus.forEach(element => {
      if (element.Name == name) {
        let main = document.getElementsByClassName("sli_main")

        this.NameCactus = element.Name
        this.CactusImage = element
      }
    });
  }


  ngOnInit() {
    this.spinner.show("history_admin")
    this.http.get<DataOfFT>('assets/dataFT.json').subscribe((data) => {
      this.spinner.show("history_admin")
      this.DataFT = data;
      this.http.get<CacTusData>('assets/dataCacTus.json').subscribe((data) => {
        this.Cactus = data;
      }, (error) => {
        this.spinner.hide("history_admin")
        alert("ระบบผิดพลาด : " + error.message)
      }, () => {
        this.spinner.hide("history_admin")
      });
    });

    var data = this.http.post("http://127.0.0.1:5000/history/all/", {

      id: this.memberId,
      sort: "asc",
      sortBy: "id",
      CactusName: "null"

    }, { headers: headers })
    data.subscribe((data: predictData) => {
      this.historyData = data

    }, (error) => {
      this.spinner.hide("history_admin")
      alert("ระบบผิดพลาด : " + error.message)

    }, () => {

      this.unixTimeToDate()
      this.pageList=[]
      this.setListPage()
      this.statusCheck=true;
      this.spinner.hide("history_admin")
      this.indexFT = 0

      if (!this.historyData) {
        localStorage.setItem("Menu1", "true")
        localStorage.setItem('Menu2', "false")
        localStorage.setItem('Menu3', "false")
        localStorage.setItem('Menu4', "false")
        alert("ไม่พบประวัติการใช้งาน")
        window.location.reload()
      }
    })
    this.spinner.hide("history_admin")


  }

  unixTimeToDate() {
    for (let i = 0; i < this.historyData.predict.length; i++) {
      var date = new Date(Number(this.historyData.predict[i].Timestamp) * 1000)
      var year = date.getFullYear()
      let month, day, hours, minutes
      if (date.getMonth() < 9) {
        month = "0" + (date.getMonth() + 1)
      } else {
        month = date.getMonth() + 1
      }
      if (date.getDate() < 10) {
        day = "0" + date.getDate()
      }
      else {
        day = date.getDate()
      }
      if (date.getHours() < 10) {
        hours = "0" + date.getHours()
      } else {
        hours = date.getHours()
      }
      if (date.getMinutes() < 10) {
        minutes = "0" + date.getMinutes()

      } else {
        minutes = date.getMinutes()

      }
      let time = hours + ":" + minutes
      let dateTime = day + "-" + month + "-" + year + " " + time
      this.historyData.predict[i].Timestamp = dateTime

    }
    this.setDataStatus()
    this.spinner.hide("history_admin")

  }

  indexFT: number
  setIndexFT(i) {
    this.indexFT = (this.pageCurrent*this.totalPage)+i;
  }
  
  totalPage=20
  start: number
  end: number
  pageCurrent :number
  pageList = []
  Previous = ''
  Next = ''
  statusCheck:boolean=false

  setIndexPage(){

    if (this.pageCurrent == 0) {
      this.Previous = 'disabled'
      this.Next = ''
      this.start=0
      if(this.pageList.length==1){
        this.end = this.historyData.predict.length
      }else{
        this.end=20
      }
    }else if(this.pageCurrent < this.pageList.length-1){    
        this.Previous=''
        this.Next=''
        this.start = ((this.pageCurrent)*20)
        this.end = (this.pageCurrent+1)*20
    }else if(this.pageCurrent ==this.pageList.length-1){

      this.Previous=''
      this.Next='disabled'
      this.start = ((this.pageCurrent)*20)
      this.end = this.historyData.predict.length


    }
    
  }
  
  previousPage() {
    this.pageCurrent--;
    if (this.pageCurrent >=0) {
      this.pageList[this.pageCurrent+1]=''
      this.pageList[this.pageCurrent]='active'
      this.setIndexPage()
    } else {
      this.pageCurrent++;
      
    }
    this.statusCheck = false
    this.statusCheck = true
  }
  
  
  setPage(i){
      this.pageList[this.pageCurrent] = ''
      this.pageList[i]='active'
      this.pageCurrent=i
      this.setIndexPage()
      this.statusCheck = false
      this.statusCheck = true
  }
  nextPage() {

      this.pageCurrent++
      if(this.pageCurrent<=this.pageList.length){
        this.pageList[this.pageCurrent-1]=''
        this.pageList[this.pageCurrent]='active'
          this.setIndexPage()
      }else{
        this.pageCurrent--
      }
      this.statusCheck = false
      this.statusCheck = true
  }

  setListPage() {
    
    if (this.historyData.predict.length <= 20) {
      this.pageList.push('active')
      this.Previous = 'disabled'
      this.Next = 'disabled'
      this.start = 0
      this.end = this.historyData.predict.length
      this.pageCurrent = 0
    } else {
      let total = Math.ceil(this.historyData.predict.length / 20)
      this.Previous = 'disabled'
      this.pageCurrent = 0
      this.start = 0
      this.end = 20
      this.pageList.push('active')
      for (let i = 1; i < total; i++) {
        this.pageList.push('')
      }

    }

  }




}
