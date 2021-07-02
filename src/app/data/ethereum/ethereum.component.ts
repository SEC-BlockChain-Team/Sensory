import { Component, OnInit } from '@angular/core';
import {EthereumService} from "./ethereum.service";

@Component({
  selector: 'app-data-ethereum',
  templateUrl: './ethereum.component.html',
  styleUrls: ['./ethereum.component.scss']
})
export class EthereumComponent implements OnInit {

  blockData: any;

  constructor(
    private ethService: EthereumService
  ) { }

  ngOnInit(): void {
    this.blockData = this.ethService.getLatestBlock();
  }

}
