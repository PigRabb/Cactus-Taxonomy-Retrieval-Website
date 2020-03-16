import { Status } from './../interface/my-interface';
import { serverIP,headers } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-Setting',
  templateUrl: './Setting.component.html',
  styleUrls: ['./Setting.component.css']
})
export class SettingComponent implements OnInit {

  constructor(private http: HttpClient,private spinner: NgxSpinnerService) { }

  
    NameU
    emailU
    SurnameU
    userIdU
  
  ngOnInit() {
      this.NameU = localStorage.getItem("name")
      this.SurnameU = localStorage.getItem("surname")
      this.emailU = localStorage.getItem("email")
      this.userIdU = localStorage.getItem("userId")
      console.clear()

  }

  Name:string
  Surname:string

  editName() {
    if (this.Name) {
      this.spinner.show("profile")
      this.http.post(serverIP+'/edit/name', {
        "nameOld": localStorage.getItem('name'),
        "nameNew": this.Name,
        "userId": localStorage.getItem('userId'),

      }, { headers: headers }).subscribe((data) => {
      }, (error) => { 
        this.spinner.hide("profile")
        alert("ระบบผิดพลาด : "+error.message)
      }, () => {
          this.spinner.hide("profile")
          alert("บันทึกข้อมูลสำเร็จ")
          localStorage.setItem('name',this.Name)
          window.location.reload()
          
      })
    }else{
      alert('กรุณากรอกข้อมูล')
    }
  }
  
  editSurname() {
    if (this.Surname) {
      this.spinner.show("profile")
      this.http.post(serverIP+'/edit/surname', {
        "surnameOld": localStorage.getItem('name'),
        "surnameNew": this.Surname,
        "userId": localStorage.getItem('userId'),

      }, { headers: headers }).subscribe((data) => {
      }, (error) => { 
        this.spinner.hide("profile")
        alert("ระบบผิดพลาด : "+error.message)
      }, () => {
          this.spinner.hide("profile")
          alert("บันทึกข้อมูลสำเร็จ")
          localStorage.setItem('surname',this.Surname)
          window.location.reload()
      })
    }else{
      alert('กรุณากรอกข้อมูล')
    }
  }



  oldPassword:string
  newPassword:string
  newPasswordA:string

  changePassword(){
    var status:Status
    if(this.oldPassword && this.newPassword && this.newPasswordA){
        if(this.newPassword  == this.newPasswordA){
          this.spinner.show("profile")
          this.http.post(serverIP+'/changePassword',{
            "userId": localStorage.getItem('userId'),
            "oldPassword" : this.oldPassword,
            "newPassword" : this.newPassword
          }).subscribe((data:Status)=>{
                status = data
          },(error)=>{
            this.spinner.hide("profile")
            alert("ระบบผิดพลาด : "+error.message)
          },()=>{
            this.spinner.hide("profile")
            if(status.status == 1){
              alert("เปลี่ยนรหัสผ่านสำเร็จ")
              window.location.reload()
            }else{
              alert("รหัสผ่านเก่าไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง")
            }
          })
        }else{
          alert('กรุณายืนยันรหัสผ่านใหม่ให้ตรงกัน')
        }
    }else{
      alert('กรุณากรอกข้อมูลให้ครบถ้วน')
    }
  }
}
