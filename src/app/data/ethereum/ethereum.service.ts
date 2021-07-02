import {Injectable} from '@angular/core';
import Web3 from "web3";
// const Tx = require('@ethereumjs/tx').Transaction;

@Injectable({
  providedIn: 'root'
})
export class EthereumService {

  private web3: any;
  private contract: any;

  constructor() {
    this.web3 = new Web3(
      new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/cbd9d5f7455940279cb13adf10ad5e77'
      )
    )
  }

  getLatestBlock(){
    return this.web3.eth.getBlock('latest');
  }
}
