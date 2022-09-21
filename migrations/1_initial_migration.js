const B91 = artifacts.require('B91');
const web3 = require('web3');

module.exports = function (deployer) {
    deployer.deploy(B91,web3.utils.toWei('10000000','ether'));
}