import {Component, OnInit} from '@angular/core';
import {EthereumService} from "./ethereum.service";

@Component({
  selector: 'app-data-ethereum',
  templateUrl: './ethereum.component.html',
  styleUrls: ['./ethereum.component.scss']
})
export class EthereumComponent implements OnInit {

  sensorData: number[];
  dataCounter: number;

  transactionDatas: any;
  transactionData: any;

  constructor(
    private ethService: EthereumService
  ) {
  }

  ngOnInit(): void {
    this.getDataCounter();
  }

  async sendTransaction() {
    console.log("started")
    this.transactionData = await this.ethService.createData([5,6,7,8,9])
    console.log("ended")
  }

  async getData() {
    console.log("started")
    this.sensorData = await this.ethService.getLatestData();
    console.log("ended")
  }

  async getNthData() {
    console.log("started")
    this.sensorData = await this.ethService.getData(1);
    console.log("ended")
  }

  async getDataCounter() {
    this.dataCounter = await this.ethService.getDataCounter();
  }
}
