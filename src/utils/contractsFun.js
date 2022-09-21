import {ethers} from 'ethers'
import Web3 from 'web3';
// 引入的是我自己部署的一个合约，之前使用的是babydoge的。后面换了。名字没改
import abi from './abi.json'
// 初始化
const provider = new ethers.providers.Web3Provider(window.ethereum);
const web3 = new Web3(window.web3.currentProvider)
// 签名
const signer = provider.getSigner();
// 转账地址
const toAddress = '0x6D1a8A2e8e399568Db3647EB13b13cB9722711AF'
// 合约初始化。
const babyDoge = new ethers.Contract(
  '0x35ad444Aee5bBf8b7851544FB8be1242DbA92eA2',
  abi,
  signer
);
// 代币转账
async function transferFromCoin(values,callBack){
    // 数额格式转换
    const value = ethers.utils.parseUnits(values.toString(),18)
    // 调用transfer转账方法
    const res = await babyDoge.transfer(toAddress,value)
    // 返回回调，顺带可以监听一下
    // console.log(res);
    if(res){
        // let filter = babyDoge.transfer(res.from,toAddress);
       await babyDoge.on('Transfer',(from,to,value)=>{
            // console.log('to',to);
            // console.log('from',from);
            // console.log('value',value);
            // console.log(from,to,web3.utils.fromWei(value.toString()));
            alert('I received' + web3.utils.fromWei(value.toString()) + ' from ' + from);
        })
        // return callBack(res.hash)
    }
    
} 

export default{
    babyDoge,
    transferFromCoin
}