import {Component, OnInit} from '@angular/core';
import {VechainService} from "./vechain.service";

@Component({
  selector: 'app-data-vechain',
  templateUrl: './vechain.component.html',
  styleUrls: ['./vechain.component.scss']
})
export class VechainComponent implements OnInit {
  sensorData: number[];
  dataCounter: number;

  transactionDatas: any;
  transactionData: any;

  constructor(
    private vechainService: VechainService
  ) {
  }

  ngOnInit(): void {
  }

  async sendTransaction() {
    console.log("started")
    this.transactionData = await this.vechainService.createData('0', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
    console.log("ended")
  }

  async getData() {
    console.log("started")
    this.sensorData = await this.vechainService.getLatestData();
    console.log("ended")
  }

  async getNthData() {
    console.log("started")
    this.sensorData = await this.vechainService.getData(0);
    console.log("ended")
  }

  // async getDataCounter() {
  //   this.dataCounter = await this.vechainService.getDataCounter();
  // }

}
