import {ethers} from 'ethers'
import Web3 from 'web3';
// 引入的是我自己部署的一个合约，之前使用的是babydoge的。后面换了。名字没改
import abi from './b91.json'
    // 初始化
if(window.ethereum){
    var provider = new ethers.providers.Web3Provider(window.ethereum);
    var signer = provider.getSigner();
}
const web3 = new Web3(window.ethereum)
// 转账地址
const toAddress = '0xf5927a5b93E91EDc5D9bb3Ca0Ced6319BB23FB5E'
// 合约初始化。
 const babyDoge = new ethers.Contract(
  '0xc0f3057F6BA56BB6f3AcbcC3AB26679eb270d821',
  abi,
  signer
);
// 代币转账
 async function transferFromCoin(values,callBack){
    // 数额格式转换
    // const value = ethers.utils.parseUnits(values.toString(),18)
    const value = web3.utils.toWei(values.toString(),'ether');
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
    
};

export default {
    babyDoge,
    transferFromCoin
}
