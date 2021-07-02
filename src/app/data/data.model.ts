export interface Data {
  data: number[];
}

export class DataModel {
  public data: Data;
  constructor(
    public temperature: number[],
    public humidity: number[]
  ) {
    this.data = { data: [...temperature, ...humidity]};
  }
}

export class EthereumTxnModel {
  constructor(
    public data: Data[],
    public accountAddress: string,
    public contractAddress: string,
  ) {}
}
export class VechainTxnModel {
  chainTag = 0x27;
  nonce: 0x11;
  constructor(
    public data: Data[],
    public accountAddress: string,
    public contractAddress: string,
  ) {}
}
