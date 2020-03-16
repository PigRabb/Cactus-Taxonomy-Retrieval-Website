import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor() {}

  
  Menu1:boolean;
  Menu2:boolean;
  Menu3:boolean;
  Menu4:boolean;
  Menu5:boolean;
  MenuAdmin1:boolean;
  MenuAdmin2:boolean;
  MenuAdmin3:boolean;

  checkPage(){
    if(localStorage.getItem("Menu1") && localStorage.getItem("Menu2")&& localStorage.getItem("Menu3")&& localStorage.getItem("Menu4")&& localStorage.getItem("Menu5")) {
      if(localStorage.getItem("Menu1") == 'true'){
        this.Menu1 = true
      }else{
        this.Menu1 = false
      }
      if(localStorage.getItem("Menu2") == 'true'){
        this.Menu2 = true
      }else{
        this.Menu2 = false
      }
      if(localStorage.getItem("Menu3") == 'true'){
        this.Menu3 = true
      }else{
        this.Menu3 = false
      }
      if(localStorage.getItem("Menu4") == 'true'){
        this.Menu4 = true
      }else{
        this.Menu4 = false
      }
      if(localStorage.getItem("Menu5") == 'true'){
        this.Menu5 = true
        localStorage.setItem('MenuAdmin1',"true")
        localStorage.setItem('MenuAdmin2',"false")
        localStorage.setItem('MenuAdmin3',"false")

        if(localStorage.getItem("role"!)!="A"){
          this.Menu5=false
          this.Menu1=true
          localStorage.setItem('MenuAdmin1',"false")
          localStorage.setItem('MenuAdmin2',"false")
          localStorage.setItem('MenuAdmin3',"false")
        }
      }else{
        this.Menu5 = false
        localStorage.setItem('MenuAdmin1',"false")
        localStorage.setItem('MenuAdmin2',"false")
        localStorage.setItem('MenuAdmin3',"false")
      }
    }else{
      localStorage.setItem('Menu1',"true")
      localStorage.setItem("Menu2","false")
      localStorage.setItem("Menu3","false")
      localStorage.setItem("Menu4","false")
      localStorage.setItem("Menu5","false")


      this.Menu1 = true;
      this.Menu2 = false;
      this.Menu3 = false;
      this.Menu4 = false;
      this.Menu5 = false;
    } 
  }
  ngOnInit() {
this.checkPage()
    
}


}
