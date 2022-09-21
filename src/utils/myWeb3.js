import Web3 from "web3";
// 只能合约地址
const contractAddress = '0xB477dE1Eae2a58ecb05d57146EcaD43307c9355E';
// 只能合约abi
const contractAbi = [];
// 智能合约
var contract = null;
let web3 = new Web3(window.web3.currentProvider)

// 初始化获取钱包地址
function init (callback){
    // console.log(Web3.version);
 //判断用户是否安装MetaMask钱包插件
 if (typeof window.ethereum === "undefined") {
    //没安装MetaMask钱包进行弹框提示
    alert("Looks like you need a Dapp browser to get started.");
    alert("Consider installing MetaMask!");
} else {
    //如果用户安装了MetaMask，你可以要求他们授权应用登录并获取其账号
    ethereum.enable()
    .catch(function (reason) {
        //如果用户拒绝了登录请求
        if (reason === "User rejected provider access") {
            // 用户拒绝登录后执行语句；
        } else {
            // 本不该执行到这里，但是真到这里了，说明发生了意外
            alert("There was an issue signing you in.");
        }
        }).then(function (accounts) {
            //如果用户同意了登录请求，你就可以拿到用户的账号
            var currentProvider = web3.currentProvider;
            // var Web3 = web3.getWeb3();
            // web3 = new Web3();
            web3.setProvider(currentProvider);
            contract = new web3.eth.Contract(contractAbi, contractAddress);
            // console.log('地址列表', accounts)
            //这里返回用户钱包地址
            callback(accounts[0]);
        });
}
};
// 钱包签名
function  sign(dataToSign,address,callback) {
    web3.eth.personal.sign(dataToSign.toString(), address, null).then(res=>{
        console.log(res);
           return callback(res)
        });
 
};
// 转账
function sendTransfer(address,values,callback,errCallBack){
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
} 

export default{
    init,
    sign,
    sendTransfer
}