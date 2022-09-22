import Web3 from "web3";
// 只能合约地址
const contractAddress = '0xB477dE1Eae2a58ecb05d57146EcaD43307c9355E';
// 只能合约abi
const contractAbi = [];
// 智能合约
var contract = null;
let web3 = new Web3(window.ethereum);

// 初始化获取钱包地址
export function init (callback){
    if(window.ethereum){
        window.ethereum.request({method:'eth_requestAccounts'}).then((res)=>{
            console.log(res);
            return callback(res[0])
        })
    }else{
        alert('请安装metaMask钱包');
    }
};
// 钱包签名
export function  sign(dataToSign,address,callback) {
    web3.eth.personal.sign(dataToSign.toString(), address, null).then(res=>{
        console.log(res);
           return callback(res)
        });
 
};
// 转账
export function sendTransfer(address,values,callback,errCallBack){
    /*
        value:转账数量，
        from：转账地址
        to：收款地址
        gasPrice ：gas费价格
        gas:总量
        callback:返回hash
        errCallBack:错误返回
     
    */
   let value = web3.utils.toWei(values.toString(),'ether');
   console.log(values,'传过来的values');
//    let value = web3.utils.fromWei(value1,'ether')
    const params = {
        from:address,
        to:contractAddress,
        // data:data,
        value:value
    }
    web3.eth.sendTransaction(params,(err,res)=>{
        // console.log(res);
        // console.log(err);
        if(err){
            console.log(err.message);
        }
        if(res){
            console.log(res);
        }
    })
};
