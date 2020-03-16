import { FtList } from './../../../../WebTest2/src/app/app.component';
import { saveData, CacTusData, Cactu, Image } from './../interface/my-interface';
import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataOfFT, Test, CactusPredict } from '../interface/my-interface';
import { ReversePipe } from 'ngx-pipes';
import { serverIP,headers } from 'src/environments/environment';
import { NgxSpinnerService } from "ngx-spinner";

@Pipe({ name: 'reverse' })

@Component({
  selector: 'app-Predict',
  templateUrl: './Predict.component.html',
  styleUrls: ['./Predict.component.css'],
  providers: [ReversePipe]

})
export class PredictComponent implements OnInit, PipeTransform {

  constructor(private http: HttpClient, private reversePipe: ReversePipe, private spinner: NgxSpinnerService) { }

  transform(value) {
    return value.slice().reverse();
  }

  async setImageCactus(name) {
    this.spinner.show("predict1")
    await this.Cactus.Cactus.forEach(element => {
      if (element.Name == name) {
        this.NameCactus = element.Name
        this.CactusImage = element

      }
    });
    this.spinner.hide("predict1")

  }

  FT = [];

  Data: Test;
  DataFT: DataOfFT;
  Cactus: CacTusData
  CactusImage: Cactu
  NameCactus

  FTSub: FtList

  setFTSub(i, j) {
    this.FTSub = this.DataFT.DataFT[i].FtList[j]
  }

  resultCuctusImage: Cactu

  ngOnInit() {
    this.spinner.show("predict1")
    this.http.get<DataOfFT>('assets/dataFT.json').subscribe((data) => {
      this.DataFT = data;
    }, (error) => {
      alert("ระบบผิดพลาด : " + error.message)
      this.spinner.hide("predict1")
    }, () => {

    });

    this.http.get<CacTusData>('assets/dataCacTus.json').subscribe((data) => {
      this.Cactus = data;
    }, (error) => {
      this.spinner.hide("predict1")
      alert("ระบบผิดพลาด : " + error.message)
    }, () => {
      this.spinner.hide("predict1")
    });
    console.clear()


  }



  setData(data, index) {
    this.FT[index - 1] = data;

  }



  PredictCheck: boolean = false
  AddCheck: boolean = false
  addButtom: string = "เพิ่มเติม"
  cactusData: CactusPredict

  ftData = ''
  
  Predict() {
    if (this.FT.length == 13) {
      this.spinner.show("predict1")
      for (let i = 0; i < 13; i++) {
        this.ftData += this.FT[i]
      }
      var data = this.http.get(serverIP+'/predict?ft=' + this.ftData, { headers: headers })
      data.subscribe((data: CactusPredict) => {
        this.cactusData = data
      }, (error) => {
        this.spinner.hide("predict1")
        alert("ระบบผิดพลาด : " + error.message)

      }, () => {

        this.Cactus.Cactus.forEach(element => {
          if (element.Name == this.cactusData.columns[25]) {
            this.resultCuctusImage = element
          }
        });

        this.PredictCheck = true
        this.spinner.hide("predict1")

      })

    }
    else {
      alert('กรุณาใส่ข้อมูลให้ครบถ้วน')
    }
  }
  savePredict(result) {
    var status: saveData
    this.spinner.show()
    var data = this.http.post(serverIP+'/predict-save/', {
      "memberCode": localStorage.getItem('userId'),
      "ft": this.ftData,
      "result": result
    }, { headers: headers })

    data.subscribe((resp: saveData) => {
      status = resp
    }, (error) => {
      this.spinner.hide("predict1")

      alert("ระบบผิดพลาด : " + error.message)
    }, () => {
      this.spinner.hide("predict1")
      alert('บันทึกข้อมูลสำเร็จ')
      window.location.reload()
    })
  }

  addCheck() {
    if (this.AddCheck == false) {
      this.AddCheck = true
      this.addButtom = "ซ่อน"

    } else {
      this.AddCheck = false
      this.addButtom = "เพิ่มเติม"
    }

  }

}





