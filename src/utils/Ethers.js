/**
 * ethers.js使用方法
 */
import * as ethers from 'ethers';

// 例子：bigNumber类型转成可读字符串
let balanceStr = ethers.utils.formatUnits(balance,18)

export default{
    balanceStr
}