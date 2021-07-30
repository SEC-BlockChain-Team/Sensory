pragma solidity >=0.4.16 <0.9.0;
// "SPDX-License-Identifier: UNLICENSED"

contract MainContract{

    address owner;
    uint256 public dataCounter;
    mapping(uint256=>uint256[]) public dataList; // dataId -> Data

    constructor() public payable{
        owner = msg.sender;
        dataCounter = 0;
    }

    function createData(uint256[] memory _datas) public payable {
        dataList[dataCounter] = _datas;
        dataCounter++;
    }

    function getData(uint256 _dataId) public view returns(uint256[] memory){
        return dataList[_dataId];
    }
    
    function getLatestData() public view returns(uint256[] memory){
        return dataList[dataCounter-1];
    }
    
    function getDataCounter() public view returns(uint256){
        return dataCounter;
    }
    
}