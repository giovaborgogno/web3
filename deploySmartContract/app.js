const Web3 = require('web3')
const Tx = require('ethereumjs-tx').Transaction
const Solc = require('solc')
const fs = require('fs')

const web3 = new Web3('https://goerli.infura.io/v3/1784d83ee2144d0aa32a30fb45b64b23')
const address_1 = '0xA51d8450e72E17e7A8027F4EF09cBdD6417141A4'
const address_2 = '0x8379Af5BAEE89BE301934c96E22Ca6038868e4Af'

const address_1_key = new Buffer.from('0f19da2b1c4f91500e28bb6d8dfa9ccd44a94d8ad2124a08a1115967a2a771b4', 'hex')
const address_2_key = new Buffer.from('1a57a639e12def68d2fdc7c49c6f07d0650d6125144ce2a6855a5d07989d91f5', 'hex')

const content = fs.readFileSync('autos.sol').toString()

const objectSolc = {
    language: 'Solidity',
    sources: {
        'autos' : {
            content : content
        }
    },
    settings: {
        outputSelection: {
            '*':{
                '*': ['*']
            }
        }
    }
}

const output = JSON.parse(Solc.compile(JSON.stringify(objectSolc)))

const byteCode = output.contracts.autos.Autos.evm.bytecode.object

web3.eth.getTransactionCount(address_1, (err, txCount) => {

    const TxObject = {
        nonce: web3.utils.toHex(txCount),
        to: null,
        gasPrice: web3.utils.toHex(web3.utils.toWei('57', 'gwei')),
        gasLimit: web3.utils.toHex(1000000),
        data: '0x' + byteCode

    }

    let tx = new Tx(TxObject, {'chain':'goerli'})

    tx.sign(address_1_key)

    let serializedTx = tx.serialize();

    web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', receipt => {
        console.log
        console.log('Contrato subido: ' + receipt.contractAddress)
    });
})
