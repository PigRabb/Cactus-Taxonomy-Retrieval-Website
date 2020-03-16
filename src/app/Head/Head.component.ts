import { from } from 'rxjs';
import { Status } from './../interface/my-interface';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserData } from '../interface/my-interface';
import { serverIP,headers } from 'src/environments/environment';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-Head',
  templateUrl: './Head.component.html',
  styleUrls: ['./Head.component.css']
})


export class HeadComponent implements OnInit {


  constructor(private http: HttpClient, private spinner: NgxSpinnerService) { }
  showName: string

  isLoggedIn: boolean
  ngOnInit() {
    this.spinner.show("head")
    
    localStorage.setItem('isLoggedIn', 'false');
    if (localStorage.getItem('userId')) {

      localStorage.setItem('isLoggedIn', 'true');
      this.showName = localStorage.getItem('name') + "  " + localStorage.getItem("surname")
      this.isLoggedIn = true
      if(localStorage.getItem('role') == 'A')
        this.adminCheck = true

      this.spinner.hide("head")

    } else {

      this.isLoggedIn = false
      this.spinner.hide("head")

    }
    console.log("admin = "+this.adminCheck)
  }
  checkAdmin(){
    let status 
    if(localStorage.getItem('role') == 'A'){
      status = true
    }else{
      status =false
    }
    return status
  }
  emailRegister: String = ''
  passwordRegister: String = ''
  passwordAgainRegister: String = ''
  nameRegister: String = ''
  surnameRegister: String = ''
  emailCheck = false
  passwordCheck = false
  passwordCheckA = false
  nameCheck = false
  surnameCheck = false
  adminCheck=false
  forgot(){
   
    if(this.emailLogin){
      var Status:Status 
      this.spinner.show("head")
      this.http.get(serverIP+'/forgot/?email='+this.emailRegister,{headers:headers}).subscribe((data:Status)=>{
        Status=data
      },(error)=>{
        this.spinner.hide("head")
        alert("ระบบผิดพลาด : " + error.message)
      },()=>{
        if(Status.status == 0){
          alert("ไม่มีอีเมลล์นี้อยู่ในระบบ")
        }else if(Status.status == 1){
          alert("กรุณาเข้าไปที่อีเมลเพื่อเปลี่ยนรหัสผ่าน")
          window.location.reload()
        }else if(Status.status == 2){
          alert("ระบบส่งอีเมลผิดพลาด กรุณาลองใหม่ในภายหลัง")
          window.location.reload()
        }
        this.spinner.hide("head")

      })
    }else{
      this.spinner.hide("head")
      alert('กรุณากรอกอีเมล')
    }
    this.spinner.hide("head")
  }

  setNameCheck() {
    if (this.nameRegister.length >= 2) {
      this.nameCheck = true
    } else {
      this.nameCheck = false
    }

  }
  setSurnameCheck() {
    if (this.surnameRegister.length >= 2) {
      this.surnameCheck = true
    } else {
      this.surnameCheck = false
    }
  }
  setpasswordCheck() {
    if (this.passwordRegister.length >= 6) {
      this.passwordCheck = true
      if (this.passwordRegister == this.passwordAgainRegister) {
        this.passwordCheckA = true
      } else {
        this.passwordCheckA = false
      }
    } else {
      this.passwordCheck = false
    }
  }

  setEmailCheck() {

    var check1 = this.emailRegister.search('@')
    var check2 = this.emailRegister.search('.')
    let status: Status
    if (check1 != -1 && check2 != -1) {
      var data = this.http.get(serverIP+"/checkEmail/?email=" + this.emailRegister, { headers: headers })
      data.subscribe((data: Status) => {

        status = data
      }, (error) => {
        alert("ระบบผิดพลาด : " + error.message)
      }, () => {
        if (status.status == 0) {
          this.emailCheck = true
        } else {
          this.emailCheck = false
        }
      })
    }
  }
  register() {

    if (this.emailCheck && this.passwordCheck && this.passwordCheckA && this.nameCheck && this.surnameCheck) {
      if (this.passwordRegister == this.passwordAgainRegister) {
        this.spinner.show("head")
        var data = this.http.post(serverIP+"/register", {
          "email": this.emailRegister,
          "password": this.passwordRegister,
          "name": this.nameRegister,
          "surname": this.surnameRegister
        }, { headers: headers })
        data.subscribe((data) => {

        }, (error) => {
          this.spinner.hide("head")
          alert("ระบบผิดพลาด : " + error.message)
          window.location.reload()
        }, () => {
          this.spinner.show("head")
        })
        alert("กรุณาเข้าไปที่อีเมลล์ของท่านเพื่อยืนยันก่อนเข้าสู่ระบบ")
        window.location.reload()
      } else {
        alert("การยืนยันรหัสผ่ายไม่ตรงกัน")
      }
    }
    else {
      alert("กรุณาใส่ข้อมูลให้ครบ")
    }
  }

  emailLogin: String = ''
  passwordLogin: String = ''

  userData: UserData
  Login() {

    if (this.emailLogin && this.passwordLogin) {
      this.spinner.show("head")
      var data = this.http.post(serverIP+"/login", {
        "email": this.emailLogin,
        "password": this.passwordLogin
      }, { headers: headers })
      data.subscribe((resp: UserData) => {
        this.userData = resp;
      }, (error) => {
        this.spinner.hide("head")
        alert("ระบบผิดพลาด : " + error.message)
      }, () => {
        this.spinner.hide("head")
        if (this.userData.Status == 0) {
          alert('รหัสผ่านไม่ถูกต้อง')
        } else if (this.userData.Status == 1) {
          alert('กรุณายืนยันอีเมลล์ก่อนเข้าสู่ระบบ')
        } else if (this.userData.Status == 2) {
          localStorage.setItem("userId", String(this.userData.Code))
          localStorage.setItem("email", this.userData.Email)
          localStorage.setItem("name", this.userData.Name)
          localStorage.setItem("surname", this.userData.Surname)
          localStorage.setItem("role", this.userData.Role)
          localStorage.setItem("uid", this.userData.Uid)
          alert('ยินดีต้อนรับคุณ' + this.userData.Name + ' ' + this.userData.Surname)
          window.location.reload()
        }else if (this.userData.Status == 3) {
          alert('ไอดีผู้ใช้งานของคุณถูกระงับการใช้งาน')

        }
      })



    } else {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน')
    }

  }

  Logout() {
    localStorage.removeItem("userId")
    localStorage.removeItem("userId")
    localStorage.removeItem("email")
    localStorage.removeItem("name")
    localStorage.removeItem("surname")
    localStorage.removeItem("role")
    localStorage.removeItem("uid")
    this.cMenu1()
    window.location.reload();
  }

  cMenu1() {
    console.log("Cmenu1")
    localStorage.setItem("Menu1", "true")
    localStorage.setItem('Menu2', "false")
    localStorage.setItem('Menu3', "false")
    localStorage.setItem('Menu4', "false")
    localStorage.setItem('Menu5', "false")
    window.location.reload()

  }

  cMenu2() {
    localStorage.setItem('Menu1', "false")
    localStorage.setItem("Menu2", "true")
    localStorage.setItem('Menu3', "false")
    localStorage.setItem('Menu4', "false")
    localStorage.setItem('Menu5', "false")
    window.location.reload()
  }

  cMenu3() {
    localStorage.setItem('Menu1', "false")
    localStorage.setItem("Menu2", "false")
    localStorage.setItem('Menu3', "true")
    localStorage.setItem('Menu4', "false")
    localStorage.setItem('Menu5', "false")
    window.location.reload()
  }

  cMenu4() {

    localStorage.setItem('Menu1', "false")
    localStorage.setItem("Menu2", "false")
    localStorage.setItem('Menu3', "false")
    localStorage.setItem('Menu4', "true")
    localStorage.setItem('Menu5', "false")
    window.location.reload()

  }

  cMenu5() {

    localStorage.setItem('Menu1', "false")
    localStorage.setItem("Menu2", "false")
    localStorage.setItem('Menu3', "false")
    localStorage.setItem('Menu4', "false")
    localStorage.setItem('Menu5', "true")
    window.location.reload()

  }



}



