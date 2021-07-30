import {Injectable} from '@angular/core';

import {Transaction, cry} from 'thor-devkit';
import Web3 from "web3";
import {thorify} from "thorify";
import {VECHAIN_ABI} from "../contract/vechain.abi";

@Injectable({
  providedIn: 'root'
})
export class VechainService {
  private web3: any;
  private words = [
    "erode", "offer", "phrase", "six",
    "often", "toilet", "kiss", "fog",
    "keep", "notable", "call", "wolf"
  ];
  private contractAddress: any = "0x87834f70Bcd44753303a4bD7488B9694288Aca13";
  private node: any;
  private privateKey: any;
  private prKey: any;
  private wallet: any;
  private account: any;
  private contract: any;

  constructor() {
    this.web3 = thorify(new Web3(), "https://testnet.veblocks.net");
    this.node = cry.HDNode.fromMnemonic(this.words);
    this.privateKey = this.node.derive(0).privateKey.toString('hex');
    this.prKey = this.node.derive(0).privateKey;
    this.account = this.web3.eth.accounts.privateKeyToAccount(this.privateKey);
    this.wallet = this.web3.eth.accounts.wallet;
    this.wallet.add(this.account);
    this.contract = new this.web3.eth.Contract(VECHAIN_ABI, this.contractAddress);
    this.contract.defaultAccount = this.wallet[0].address;
  }

  async createData(_time, arr) {
    const transactionData = await this.createTransaction(_time, arr);
    return await this.web3.eth.sendSignedTransaction('0x' + await transactionData);
  }

  async createTransaction(_time, arr) {
    const data = this.contract.methods.createData(_time, arr).encodeABI();
    const clauses = [{
      'to': this.contractAddress,
      'value': '0x0',
      'data': data
    }];
    const gas = Transaction.intrinsicGas(clauses) * 100;
    const blockRef = await this.web3.eth.getBlock("latest")
      .then(res => {
        return res.id.substr(0, 18);
      })
    const body = {
      chainTag: 0x27,
      blockRef: blockRef,
      expiration: 32,
      clauses: clauses,
      gasPriceCoef: 128,
      gas: gas,
      dependsOn: null,
      nonce: '0x11'
    };
    const tx = new Transaction(body);
    const signingHash = tx.signingHash();
    tx.signature = cry.secp256k1.sign(signingHash, this.prKey);
    const rawTx = tx.encode();
    return rawTx.toString('hex');
  }
  async getData(_dataId) {
    return await this.contract.methods.getData(_dataId).call();
  }
  async getLatestData() {
    return await this.contract.methods.getLatestData().call();
  }
}
