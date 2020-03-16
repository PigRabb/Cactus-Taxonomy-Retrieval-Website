import { DataOfFT } from './../../../../WebTest2/src/app/app.component';
import { Predict } from './../interface/my-interface';
import { predictData, CacTusData, Cactu } from '../interface/my-interface';
import { Component, OnInit, ViewChild, AfterViewInit, VERSION, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { serverIP, headers } from 'src/environments/environment';
import { NgxSpinnerService } from "ngx-spinner";
import { DataTableDirective } from 'angular-datatables';

import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
declare let $: any;

@Component({
  selector: 'app-History',
  templateUrl: './History.component.html',
  styleUrls: ['./History.component.css']
})

export class HistoryComponent implements OnInit {


  Predict: Predict



  constructor(private http: HttpClient, private spinner: NgxSpinnerService) { }

  historyData: predictData
  DataFT: DataOfFT;

  FT: string[]
  DataType = 'time'
  Sort = 'asc'
  CactusName = ''

  Cactus: CacTusData
  CactusImage: Cactu
  NameCactus
  search



  checkHistory() {
    if (this.historyData.predict[0].Result == 'undefined') {
      alert('ไม่พบข้อมูล')
      window.location.reload()
    }
  }

  searchHistory() {
    let Data: predictData
    this.spinner.show("history")
    if (this.CactusName) {
      if (this.Sort && this.DataFT) {
        this.http.post(serverIP + "/history/", {

          id: localStorage.getItem("userId"),
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
          this.spinner.hide("history")
          alert("ระบบผิดพลาด : " + error.message)
        }, () => {
          this.historyData = Data;
          this.checkHistory()
          this.unixTimeToDate()
          this.pageList = []
          this.setListPage()
          this.statusCheck = true;
          this.spinner.hide("history")
        })
      } else {
        if (this.Sort) {
          this.http.post(serverIP + "/history/", {

            id: localStorage.getItem("userId"),
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
            this.spinner.hide("history")
            alert("ระบบผิดพลาด : " + error.message)
          }, () => {
            this.historyData = Data;
            this.checkHistory
            this.unixTimeToDate()
            this.pageList = []
            this.setListPage()
            this.statusCheck = true;
            this.spinner.hide("history")

          })
        } else if (this.DataType) {
          this.http.post(serverIP + "/history/", {

            id: localStorage.getItem("userId"),
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
            this.spinner.hide("history")
            alert("ระบบผิดพลาด : " + error.message)
          }, () => {
            this.historyData = Data;
            this.checkHistory
            this.unixTimeToDate()
            this.pageList = []
            this.setListPage()
            this.statusCheck = true;
            this.spinner.hide("history")
          })
        } else {
          this.http.post(serverIP + "/history/", {

            id: localStorage.getItem("userId"),
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
            this.spinner.hide("history")
            alert("ระบบผิดพลาด : " + error.message)
          }, () => {
            this.historyData = Data;
            this.unixTimeToDate()
            this.pageList = []
            this.setListPage()
            this.statusCheck = true;
            this.spinner.hide("history")
          })
        }
      }
    } else {
      if (this.Sort && this.DataFT) {
        this.http.post(serverIP + "/history/", {

          id: localStorage.getItem("userId"),
          sort: this.Sort,
          sortBy: this.DataType,
          CactusName: "null"

        }, { headers: headers }).subscribe((data: predictData) => {
          Data = data
        }, (error) => {
          this.spinner.hide("history")

          alert("ระบบผิดพลาด : " + error.message)
        }, () => {
          this.historyData = Data;
          this.unixTimeToDate()
          this.pageList = []
          this.setListPage()
          this.statusCheck = true;
          this.spinner.hide("history")
        })
      } else {
        if (this.Sort) {
          this.http.post(serverIP + "/history/", {

            id: localStorage.getItem("userId"),
            sort: this.Sort,
            sortBy: "id",
            CactusName: "null"

          }, { headers: headers }).subscribe((data: predictData) => {
            Data = data
          }, (error) => {
            this.spinner.hide("history")
            alert("ระบบผิดพลาด : " + error.message)
          }, () => {
            this.historyData = Data;
            this.unixTimeToDate()
            this.pageList = []
            this.setListPage()
            this.statusCheck = true;
            this.spinner.hide("history")

          })
        } else if (this.DataType) {
          this.http.post(serverIP + "/history/", {

            id: localStorage.getItem("userId"),
            sort: "asc",
            sortBy: this.DataType,
            CactusName: "null"

          }, { headers: headers }).subscribe((data: predictData) => {
            Data = data
          }, (error) => {
            this.spinner.hide("history")
            alert("ระบบผิดพลาด : " + error.message)
          }, () => {
            this.historyData = Data;
            this.unixTimeToDate()
            this.pageList = []
            this.setListPage()
            this.statusCheck = true;
            this.spinner.hide("history")
          })
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
    this.spinner.show("history")
    this.http.get<DataOfFT>('assets/dataFT.json').subscribe((data) => {
      this.DataFT = data;
      this.http.get<CacTusData>('assets/dataCacTus.json').subscribe((data) => {
        this.Cactus = data;
      }, (error) => {
        this.spinner.hide("history")
        alert("ระบบผิดพลาด : " + error.message)
      }, () => {
      });
    });

    var data = this.http.post("http://127.0.0.1:5000/history/", {

      id: localStorage.getItem("userId"),
      sort: "asc",
      sortBy: "id",
      CactusName: "null"

    }, { headers: headers })
    data.subscribe((data: predictData) => {
      this.historyData = data

    }, (error) => {
      this.spinner.hide("history")
      alert("ระบบผิดพลาด : " + error.message)

    }, () => {

      this.unixTimeToDate()
      this.pageList = []
      this.setListPage()
      this.statusCheck = true;
      this.spinner.hide("history")
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

  }

  indexFT: number
  setIndexFT(i) {
    this.indexFT = (this.pageCurrent * this.totalPage) + i;
  }

  totalPage = 20
  start: number
  end: number
  pageCurrent: number
  pageList = []
  Previous = ''
  Next = ''
  statusCheck: boolean = false

  setIndexPage() {
    if (this.pageCurrent == 0) {
      this.Previous = 'disabled'
      this.Next = ''
      this.start = 0
      if (this.pageList.length == 1) {
        this.end = this.historyData.predict.length
      } else {
        this.end = 20
      }
    } else if (this.pageCurrent < this.pageList.length - 1) {
      this.Previous = ''
      this.Next = ''
      this.start = ((this.pageCurrent) * 20)
      this.end = (this.pageCurrent + 1) * 20
    } else if (this.pageCurrent == this.pageList.length - 1) {
      this.Previous = ''
      this.Next = 'disabled'
      this.start = ((this.pageCurrent) * 20)
      this.end = this.historyData.predict.length
    }

  }

  previousPage() {
    this.pageCurrent--;
    if (this.pageCurrent >= 0) {
      this.pageList[this.pageCurrent + 1] = ''
      this.pageList[this.pageCurrent] = 'active'
      this.setIndexPage()
    } else {
      this.pageCurrent++;

    }
    this.statusCheck = false
    this.statusCheck = true
  }


  setPage(i) {
    this.pageList[this.pageCurrent] = ''
    this.pageList[i] = 'active'
    this.pageCurrent = i
    this.setIndexPage()
    this.statusCheck = false
    this.statusCheck = true
  }
  nextPage() {

    this.pageCurrent++
    if (this.pageCurrent <= this.pageList.length) {
      this.pageList[this.pageCurrent - 1] = ''
      this.pageList[this.pageCurrent] = 'active'
      this.setIndexPage()
    } else {
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


