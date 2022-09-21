<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to vue-dapp"/>
    <p>您的地址:{{address}}</p>
    <button @click="sign">签名</button>
    <p v-if="signString">您的签名：{{signString}}</p>
    <div>
      <input type="number" v-model="inputs">
      <button @click="transfer">转账</button>
    </div>
    <button @click="findContract">合约查询</button>
    <div>
      <input type="number" v-model="daiInputs">
      <button @click="daiTransfer">代币转账</button>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import upWeb3 from './utils/myWeb3'
// import Web3 from 'web3';
import event from './utils/contractsFun'
export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data(){
    return{
      address:'',
      signString:'',
      inputs:'0.1',
      call:null,
      daiInputs:''
    }
  },
  mounted() {
    // console.log(Web3.version);
    upWeb3.init(addr=>{
      console.log(addr);
      this.address = addr;
    });
  },
  methods: {
    // 签名
    sign(){
      let timestamp=new Date().getTime();
      upWeb3.sign(timestamp,this.address,signString=>{
        this.signString = signString
        console.log(signString);
      })
    },
    // 转账
    transfer(){
      upWeb3.sendTransfer(this.address,this.inputs,err =>{
       console.log(err);
      })
    },
    // 合约查询
    async findContract(){
      // const callContract = async()=>{
        const res = await event.babyDoge.name();
        console.log(res);
      // }  
    },
    // 代币转账
    async daiTransfer(){
      event.transferFromCoin(this.daiInputs,err=>{
        console.log(err);
      })
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
