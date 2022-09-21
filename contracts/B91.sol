pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract B91 is ERC20{
    address owner; //合约所有者
    uint256 balance; //记录b91合约地址的eth数量
    mapping(address=> uint) balanceMap; // 用balanceMap对象记录谁在这儿存了多少个eth
    mapping(address=> uint) timeMap; //用timeMap对象记录地址投注时间

    // 发行一个erc20，b91代币
    constructor(uint256 initialSupply) ERC20('B91','B91'){
        owner = msg.sender;
        _mint(msg.sender,initialSupply);
    }
    // 接收意外的eth转账
    fallback() external payable{}
    // 接收意外的eth转账
    receive() external payable{}
    // 定义一个onluOwner 修饰器
    modifier onlyOwner{
        require(msg.sender == owner,'not owner');
        _;
    }
    // 接收别人eth存储，储蓄
    function deposit() public payable returns (bool) {
        // 更新别人存储在这儿的eth余额
        balanceMap[msg.sender] = msg.value;
        // 更新数量
        balance += msg.value;
        // 更新时间
        timeMap[msg.sender] = block.timestamp;
        return true;
    }
    // 奖励函数,计算获取奖励的数量
    function getAowardCount() public view returns(uint256){
        // 使用block.timestamp减去timeMap 在加100，给奖励
        return block.timestamp - timeMap[msg.sender] + 10000;
    }
    // 获取奖励
    function getFoward() public payable {
        if(timeMap[msg.sender] + 10 days >= block.timestamp){
            transfer(msg.sender,getAowardCount());
        }
    }
    // 获取eth余额
    function getBalance() public view returns (uint256){
        return balance;
    }
}