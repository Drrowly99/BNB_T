const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())

//WEB3.0 ASSETS
var Tx = require("ethereumjs-tx").Transaction
const Web3 = require('web3')
var web3 = new Web3('https://bsc-dataseed1.binance.org:443'); // CONNECTING TO BINANCE SMART CHAIN
var web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545'); // CONNECTING TO BINANCE SMART CHAIN


const receiver = '0xE76DD467F7135F040C1E9EBf6B1746E0f9119194'
const sender = '0x1c8b395A6fE651510C88880d27Db90C7cc4BC7DF'

//initiate smart contract call

const contractAddress = '0x75763f42a48fb4c1f5898eecf487d92F7E61F618'  // {{{{{{{{{{{{{GHETO TOKEN (GTO) CONTRACT ADDRESS}}}}}}}}}}}
const contractABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_owner","type":"address"},{"indexed":true,"internalType":"address","name":"_spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"address","name":"_to","type":"address"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]
    
var gheto = new web3.eth.Contract(contractABI, contractAddress, 

)



const router = express.Router()
router.get("/create", (req, res) => {
    let UserAccount = web3.eth.accounts.create()
	address  = UserAccount.address

	res.write(UserAccount.address )
	res.write(UserAccount.privateKey)
	res.end()
    console.log(UserAccount)
	//STORE USER DATABASE IN ADDRESS
	// STORE BALANCE IN DATABASE
})
router.get("/call-wallet", (req, res) => {
    let UserWallet = web3.eth.accounts.wallet.create(5, 'xsbixsuhihu238738372x392y79hue98f9fhudihe8e983f3uh8223823823723873f4')
	
    console.log(UserWallet)
	//STORE USER DATABASE IN ADDRESS
	// STORE BALANCE IN DATABASE
})

// GET THE BNB BALANCE OF AN ADDRESS
router.get('/call-balance/:address', (req, res) =>{
    
    let address  = req.params.address
    
	web3.eth.getBalance(address, (err, wei)=>{
        let userBalance = web3.utils.fromWei(wei, 'ether')
            console.log(userBalance)
            res.write(userBalance)
            res.end()
        })
    
})


// CALL SMART CONTRACT GHETO (GTO) METHOD 2
router.get('/call-balance', (req, res) =>{
  
    gheto.methods.balanceOf('0x309A279E60104A0406E9C56c34E8954D7C254407').call(
        (err, result) =>{ 
            if(err){
                console.log(err)
                res.write(err)
                res.end() 
            }else{
                console.log(result)
                res.write(result)
                res.end() 
            }
        }
    )
 
})


router.get('/call-symbol', (req, res) =>{
    gheto.methods.symbol().call(
        (err, result) =>{ 
            if(err){
                console.log(err)
                res.write(err)
                res.end() 
            }else{
                console.log(result)
                res.write(result)
                res.end() 
            }
        }
    )
 
})

router.get('/call-pastTransfer', (req, res) =>{
    gheto.getPastEvents(
        'Transfer', 
        {   
            filter: {
                to: '0x1c8b395A6fE651510C88880d27Db90C7cc4BC7DF'
            },
            fromBlock: 0,
            toBlock: 'latest'
        }, (error, events) => 
        { 
            console.log(events[0].address)
            var i = 0;
            while(i < events.length){
                
                console.log(events[i].blockHash)
                i++
            }
           
            
        }
    )
 
})

// THIS CONVERTS YOUR PRIVATE KEY
// TO THE PUBLIC ADDRESS
// SENDEY_KEY IS YOUR PRIVATE KEY STORED IN YOUR .ENV FILE
router.get('/call-private', (req, res) =>{
    var acc = web3.eth.accounts.privateKeyToAccount(process.env.SENDER_KEY)
        res.send(acc)
    
})

// THIS CODE WATCHES TRANSACTIONS TO MONITOR FOR YOUR ADDRESS
//  THIS HOWEVER DOES NOT WORK FOR BINANCE SMART CHAIN
// router.get('/call-watch', (req, res) =>{
//     class TransactionChecker {
//         web3;
//         web3ws;
//         account;
//         subscription;
    
//         constructor(projectId, account) {
//             this.web3ws = new Web3(new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws/v3/' + projectId));
//             this.web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/' + projectId));
//             this.account = account;
//         }
    
//         subscribe(topic) {
//             this.subscription = this.web3ws.eth.subscribe(topic, (err, res) => {
//                 if (err) console.error(err);
//             });
//         }
    
//         watchTransactions() {
//             console.log('Watching all pending transactions...');
//             this.subscription.on('data', (txHash) => {
//                 console.log(txHash)
//                 setTimeout(async () => {
//                     try {
//                         let tx = await this.web3.eth.getTransaction(txHash);
//                         if (tx != null) {
//                             if (this.account == tx.to) {
//                                 console.log({address: tx.from, value: this.web3.utils.fromWei(tx.value, 'ether'), timestamp: new Date()});
//                             }
//                         }
//                     } catch (err) {
//                         console.error(err);
//                     }
//                 }, 5000)
//             });
//         }
//     }
    
//     let txChecker = new TransactionChecker(process.env.INFURA_ID, '0xD79C0Bc09bd5d9869d4CB1910486A59d66834028');
//     txChecker.subscribe('pendingTransactions');
//     txChecker.watchTransactions();
// })


router.get('/call-transfer', (req, res) =>{
    
    var receiver_ = '0xE76DD467F7135F040C1E9EBf6B1746E0f9119194'
    var sender_ = '0x1c8b395A6fE651510C88880d27Db90C7cc4BC7DF'
    var third = '0x309A279E60104A0406E9C56c34E8954D7C254407'
    web3;
    gheto;
    var mnemonic = "he is a nice guy"; // SIGNING WITH A PRIVATE KEY
    myData = gheto.methods.transfer(third ,1000).encodeABI()
    const sender__ = Buffer.from(process.env.SENDER_KEY, 'hex')

    web3.eth.sendTransaction({
        from: third,
        to: third,
        value: '1000',
        gas: 5000000,
        gasPrice: 18e9,
        
    }, function(err, transactionHash){
        if(err){
            console.log(err)
        }else{
            res.send(transactionHash)
        }
    })
     
    // web3.eth.getTransactionCount(receiver, (err, txCount)=>{

    //     //BUILDING THE TRANSACTION
    //     const txObject = {
    //         nonce:web3.utils.toHex(txCount),
    //         to: contractAddress,
    //         value: web3.utils.toHex(web3.utils.toWei('1000', 'ether')),
    //         gasLimit: web3.utils.toHex(41000),
    //         gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'Gwei')),
    //         data: myData
    //     }

    //     // //SIGN THE TRANSACTION
    //     const tx = new Tx(txObject, { chain: '0x61' })
    //     tx.sign(sender_)

    //     const serializedTransaction =tx.serialize()
    //     const raw = '0x' + serializedTransaction.toString('hex')
    //     // console.log('raw:', raw)
        
    //     // //BROADCAST TRANSACTION
    //     web3.eth.sendSignedTransaction(raw, (err, txHash)=>{
    //         console.log('err:', err, 'txHash:', txHash)
    //         console.log('txHash:', txHash)

    //     })
    // })

})
module.exports = router;
