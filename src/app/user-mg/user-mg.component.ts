import { serverIP, headers } from 'src/environments/environment';
import { UserQall, Status } from './../interface/my-interface';
import { from } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";
import { stat } from 'fs';

@Component({
  selector: 'app-user-mg',
  templateUrl: './user-mg.component.html',
  styleUrls: ['./user-mg.component.css']
})
export class UserMgComponent implements OnInit {

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) { }
  userData: UserQall
  userTime = []
  emailC: string
  NameC: string
  SurnameC: string
  name = ''
  userId: number
  ngOnInit() {
    this.spinner.show("user_mg")
    this.http.get(serverIP + '/userAll/', { headers: headers }).subscribe((resp: UserQall) => {
      this.userData = resp
    }, (error) => {
      this.spinner.hide("user_mg")
      alert("ระบบผิดพลาด : " + error.message)
    }, () => {
      this.unixTimeToDate()
      this.pageList = []
      this.setListPage()
      this.statusCheck = true;
      this.spinner.hide("user_mg")

    })

  }

  banAccount() {
    this.spinner.show("user_mg")
    this.http.get(serverIP + "/ban/account/?id=" + this.userId, { headers: headers }).subscribe((data: Status) => {

    }, (error) => {
      this.spinner.hide("user_mg")
      alert("ระบบผิดพลาด : " + error.message)
    }, () => {
      this.spinner.hide("user_mg")
      alert("การแบนสำเร็จแล้ว")
      window.location.reload()
    })
  }
  unbanAccount() {
    this.spinner.show("user_mg")
    this.http.get(serverIP + "/unban/account/?id=" + this.userId, { headers: headers }).subscribe((data: Status) => {

    }, (error) => {
      this.spinner.hide("user_mg")
      alert("ระบบผิดพลาด : " + error.message)
    }, () => {
      this.spinner.hide("user_mg")
      alert("การปลดแบนสำเร็จแล้ว")
      window.location.reload()
    })
  }
  setName(name: string, surname: string, code: number) {
    this.name = name + "  " + surname;
    this.userId = code
  }
  checkBaned(i) {
    let status
    if (i == 2) {
      status = true
    } else {
      status = false
    }
    return status
  }
  searchEmail() {

    if (this.emailC != undefined) {
      this.spinner.show("user_mg")
      this.http.get(serverIP + '/userAll/search/Email?email=' + this.emailC, { headers: headers }).subscribe((resp: UserQall) => {
        this.userData = resp
      }, (error) => {
        this.spinner.hide("user_mg")
        alert("ระบบผิดพลาด : " + error.message)
      }, () => {
        this.unixTimeToDate()
        this.spinner.hide("user_mg")

      })
    } else {
      alert("กรุณากรอgข้อมูล")
    }


  }
  searchName() {
    if (this.NameC != undefined) {
      this.spinner.show("user_mg")
      this.http.get(serverIP + '/userAll/search/Name?name=' + this.NameC, { headers: headers }).subscribe((resp: UserQall) => {
        this.userData = resp
      }, (error) => {
        this.spinner.hide("user_mg")
        alert("ระบบผิดพลาด : " + error.message)
      }, () => {
        this.unixTimeToDate()
        this.spinner.hide("user_mg")

      })
    } else {
      alert("กรุณากรอกข้อมูล")
    }
  }
  searchSurname() {
    if (this.SurnameC != undefined) {
      this.spinner.show("user_mg")
      this.http.get(serverIP + '/userAll/search/Surname?surname=' + this.SurnameC, { headers: headers }).subscribe((resp: UserQall) => {
        this.userData = resp
      }, (error) => {
        this.spinner.hide("user_mg")
        alert("ระบบผิดพลาด : " + error.message)
      }, () => {
        this.unixTimeToDate()
        this.spinner.hide("user_mg")

      })
    } else {
      alert("กรุณากรอกข้อมูล")
    }
  }
  unixTimeToDate() {
    this.spinner.show("user_mg")
    this.userTime = []
    for (let i = 0; i < this.userData.user.length; i++) {

      var date = new Date(Number(this.userData.user[i].isLogin) * 1000)
      console.log(this.userData.user[i].isLogin)
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
      this.userTime.push(dateTime)
    }
    console.log(this.userTime[1])
    this.spinner.hide("user_mg")

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
        this.end = this.userData.user.length
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
      this.end = this.userData.user.length


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

    if (this.userData.user.length <= 20) {
      this.pageList.push('active')
      this.Previous = 'disabled'
      this.Next = 'disabled'
      this.start = 0
      this.end = this.userData.user.length
      this.pageCurrent = 0
    } else {
      let total = Math.ceil(this.userData.user.length / 20)
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
