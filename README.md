# vue-dapp

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 搭建一个vue+truffle 的dapp
1、使用vue create 项目名字
2、npm i web3 --save 下载web3 库
在main.js库引入web3
import Web3 from 'web3'
Vue.prototype.Wbe3 = Web3

3、npm i ether.js --save 下载ether.js库
4、npm i @truffle/contract 下载truffle 环境
5、truffle init 生成truffle环境 还要 (npm i  @openzeppelin/contracts -save )
   truffle更新迭代部署上链需要下载 npm install truffle truffle-hdwallet-provider
6、在contracts 里面编写.sol文件
7、在migrations 里面编写1_initial_migration.js
8、执行truffle develop
9、执行truffle compile 编译合约
10、执行truffle migrate 部署合约
11、执行galache 启动本地模拟区块链环境
12、如果要truffle+galache开发，{
    1、启动galache 启动本地模拟区块链环境
    2、执行truffle compile 编译合约
    3、执行truffle migrate 部署合约
}

