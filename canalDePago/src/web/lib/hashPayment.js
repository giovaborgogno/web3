const ABI = require('ethereumjs-abi')
const keys = require('./keys')

let hashPayment = async (req, res, next) => {
    const {recipient, amount, nonce, defaultAccount} = req.body
    // console.log(recipient, amount, nonce, defaultAccount)
    const contractAddress = keys.contractAddress

    let hash = "0x" + ABI.soliditySHA3(
        ["address", "uint256", "uint256", "address"],[recipient, amount, nonce, contractAddress]
    ).toString("hex")

    req.body.hash = hash
    req.body.contractAddress = contractAddress
    return next()
}

module.exports = hashPayment
// export {hashPayment}