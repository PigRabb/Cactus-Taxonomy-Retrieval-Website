import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-Dashboards',
  templateUrl: './Dashboards.component.html',
  styleUrls: ['./Dashboards.component.css']
})
export class DashboardsComponent implements OnInit {

  constructor(private http:HttpClient) { }
  MenuAdmin1: boolean
  MenuAdmin2: boolean
  MenuAdmin3: boolean
  ngOnInit() {
    if (localStorage.getItem('MenuAdmin1') == "true") {
      this.MenuAdmin1 = true
    } else {
      this.MenuAdmin1 = false
    }
    if (localStorage.getItem('MenuAdmin2') == "true") {
      this.MenuAdmin2 = true
    } else {
      this.MenuAdmin2 = false
    }
    if (localStorage.getItem('MenuAdmin3') == "true") {
      this.MenuAdmin3 = true
    } else {
      this.MenuAdmin3 = false
    }
    console.log(this.MenuAdmin1)
  }

  cMennu1() {
    this.MenuAdmin1 = true
    this.MenuAdmin2 = false
    this.MenuAdmin3 = false
    localStorage.setItem('MenuAdmin1', 'true')
    localStorage.setItem('MenuAdmin2', 'false')
    localStorage.setItem('MenuAdmin3', 'false')
    
  }
  cMennu2() {
    this.MenuAdmin1 = false
    this.MenuAdmin2 = true
    this.MenuAdmin3 = false
    localStorage.setItem('MenuAdmin1', 'false')
    localStorage.setItem('MenuAdmin2', 'true')
    localStorage.setItem('MenuAdmin3', 'false')
  }
  cMennu3() {
    this.MenuAdmin1 = false
    this.MenuAdmin2 = false
    this.MenuAdmin3 = true
    localStorage.setItem('MenuAdmin1', 'false')
    localStorage.setItem('MenuAdmin2', 'false')
    localStorage.setItem('MenuAdmin3', 'true')
  }
}
