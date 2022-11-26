const Web3 = require('web3');
const web3 = new Web3();

const string = web3.utils.sha3(Math.random(0, 1000000).toString(16) + web3.utils.randomHex(32));
console.log(string);

// crear wallet
const wallet = web3.eth.accounts.create(string);
console.log(wallet);

// encriptar privateKey
const password = '12345';
const privateKeyEncrypted = web3.eth.accounts.encrypt(wallet.privateKey, password);
console.log(privateKeyEncrypted);

// desencriptar privateKey
const privateKey = web3.eth.accounts.decrypt(privateKeyEncrypted, password);
console.log(privateKey);

// crear multiples wallets
const fourWallets = web3.eth.accounts.wallet.create(4, string);
console.log(fourWallets);
