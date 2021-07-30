import {Injectable} from '@angular/core';
import Web3 from "web3";

const Tx = require('ethereumjs-tx').Transaction;

import {Data} from "../data.model";
import {ETHEREUM_ABI} from "../contract/ethreum.abi";
import {Buffer} from "buffer";

// const privateKey: string = '';

@Injectable({
  providedIn: 'root'
})
export class EthereumService {

  private web3: any;
  private contract: any;
  public accountAddress = '0x65C2f74a732b2825fF9B244361E2C6dd3aD40dC0';
  public contractAddress = '0xa23Ec8bBc85d10567D0eD618D88cBD7418A5b166';
  private privateKey = Buffer.from('34f66b315ec66dcc140a693f1c8508de4f23eb5876b829500f4b2f5b0d534155', 'hex');


  constructor() {
    this.web3 = new Web3(
      new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/cbd9d5f7455940279cb13adf10ad5e77'
      )
    );
    this.contract = new this.web3.eth.Contract(
      ETHEREUM_ABI,
      this.contractAddress,
      {from: this.accountAddress}
    )
  }

  getLatestBlock() {
    return this.web3.eth.getBlock('latest');
  }

  async createData(sensorData: number[]) {
    const transactionData = await this.createTransaction(sensorData);
    return await this.web3.eth
      .sendSignedTransaction('0x' + transactionData);
  }

  async getData(dataId: number) {
    return await this.contract.methods.getData(dataId).call();
  }

  async getLatestData() {
    return await this.contract.methods.getLatestData().call();
  }

  async getDataCounter() {
    return await this.contract.methods.getDataCounter().call();
  }

  async createTransaction(sensorData: number[]) {
    const nonce = await this.web3.eth.getTransactionCount(this.accountAddress);
    console.log(nonce)
    const data = this.contract.methods.createData(sensorData).encodeABI();

    let gasPrice = await this.web3.eth.getGasPrice();
    console.log(gasPrice);
    gasPrice = this.web3.utils.toHex(gasPrice*5);
    let gasPriceLimit = await this.web3.eth.estimateGas({
      'from': this.accountAddress,
      'nonce': nonce,
      'to': this.contractAddress,
      'data': data,
    })
    console.log(gasPriceLimit);
    gasPriceLimit = this.web3.utils.toHex(gasPriceLimit);

    const rawTx = {
      'from': this.accountAddress,
      'to': this.contractAddress,
      'nonce': nonce,
      'data': data,
      'gasPrice': gasPrice,
      'gasPriceLimit': gasPriceLimit,
      'value': '0x00'
    }
    const tx = new Tx(rawTx, {'chain': 'rinkeby'});
    tx.sign(this.privateKey);
    return tx.serialize().toString('hex');
  }
}
