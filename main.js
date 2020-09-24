
var MOONcontract;
var MOONaddress;
var moonbalance;
var element;
var element2;
var element3;
var myaddress;
var mycontract;
var ercabi;
var myabi;
var address = "0x00000000000000000000000000000000f00dbaBE";
var moonbalance = 0;
var currentwin;
window.onload=function(){
document.getElementById("reset").hidden = true;
document.getElementById("claim").hidden = true;
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);

  } else {
    web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io"));
  }

if (window.ethereum === undefined) {
    document.getElementById("con").hidden=true;
    document.getElementById("status").innerHTML = "Please install Metamask to continue";
} else {
    if (window.ethereum.networkVersion==="4"){
    setInterval(function() {
    update();
    }, 3000);
    ethereum.on('accountsChanged', function(accounts) {
        console.log(accounts[0])
        if (accounts[0] === undefined) {
            document.getElementById("con").hidden=false;
            document.getElementById("reset").hidden = true;
            document.getElementById("claim").hidden = true;
            document.getElementById("status").innerHTML = "Wallet disconnected";
        } else {
            updateBalance(accounts[0]);
        }
    });
    }
    else{
        document.getElementById("con").hidden=true;

        document.getElementById("status").innerHTML = "Wrong network! Please set network to Rinkeby in Metamask";


    }
}
}




function attemptConnect() {
    try {
        ethereum.request({
            method: 'eth_requestAccounts'
        }).then(function(res) {
            updateBalance(res[0]);
            update();
        });
        web3 = new Web3(web3.currentProvider);

    } catch (error) {
        document.getElementById("status").innerHTML = "Connection fail, try again";
    }
}

document.getElementById("con").addEventListener("click", function() {
    console.log("connect attempt");
    attemptConnect();
});
document.getElementById("reset").addEventListener("click", function() {
    document.getElementById("txstatus").innerHTML=""
    if(currentwin !== undefined && currentwin.toUpperCase()!=address.toUpperCase()){
    mycontract.methods.currentPayment().call().then( function(res){ 
        MOONcontract.methods.approve(myaddress, res).send().catch(function (err){txfail()});
        mycontract.methods.resetCounter().send().then().catch(function(err){txfail();});});
    }
    else{
        document.getElementById("txstatus").innerHTML="You are already winning"
    }

    
});
document.getElementById("claim").addEventListener("click", function() {
    document.getElementById("txstatus").innerHTML=""

    mycontract.methods.claimWinnings().send().then().catch(function(err){txfail();});


    
});
function updateBalance(add) {

    address = add;
    document.getElementById("con").hidden = true;
    document.getElementById("status").innerHTML = "Wallet connected: " + add;
    ercabi = JSON.parse(`[
        {
            "constant": true,
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_spender",
                    "type": "address"
                },
                {
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "totalSupply",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_from",
                    "type": "address"
                },
                {
                    "name": "_to",
                    "type": "address"
                },
                {
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "decimals",
            "outputs": [
                {
                    "name": "",
                    "type": "uint8"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_owner",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "name": "balance",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_to",
                    "type": "address"
                },
                {
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "transfer",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_owner",
                    "type": "address"
                },
                {
                    "name": "_spender",
                    "type": "address"
                }
            ],
            "name": "allowance",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "payable": true,
            "stateMutability": "payable",
            "type": "fallback"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "spender",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Approval",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        }
    ]`);
    myabi = JSON.parse(`[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"blocktime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimWinnings","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"currentBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"currentPayment","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"currentWinner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"resetCounter","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]`)
    MOONaddress = "0xDF82c9014F127243CE1305DFE54151647d74B27A";
    myaddress = "0x5e2BE42312F29533cDFEA790cb14b33a91936DC4";
    MOONcontract = new web3.eth.Contract(ercabi, MOONaddress, {
        from: add,
        gasPrice: 3000000000
    });
    mycontract =  new web3.eth.Contract(myabi, myaddress, {
        from: add,
        gasPrice: 3000000000
    });
    MOONcontract.methods.balanceOf(add).call().then(function(res){moonbalance = res; document.getElementById("balance").innerHTML="Your balance: "+web3.utils.fromWei(res)+ " MOON";})

    
    //document.getElementById("balance").innerHTML = web3.fromWei(mycontract.)

}
function txfail(){
    document.getElementById("txstatus").innerHTML="TX failed"
}
 function update(){
    if (address !=="0x00000000000000000000000000000000f00dbaBE" ){
    updateBalance(address);
    MOONcontract.methods.balanceOf(myaddress).call().then(function(res){moonbalance = res; document.getElementById("moonsincontract").innerHTML="MOONs in contract: "+web3.utils.fromWei(res)+ " MOON";})
    mycontract.methods.currentWinner().call().then(function(res){currentwin = res; document.getElementById("currentwinner").innerHTML="Current winner: "+((res.toUpperCase()==address.toUpperCase())?"You":res );})
    
    mycontract.methods.blocktime().call().then( function(blocktime){
        
        mycontract.methods.currentBlock().call().then(function(currentblock){
            
            
            web3.eth.getBlockNumber().then(function(blocknum){
                console.log(parseInt(blocktime))
            console.log(parseInt(currentblock))
            console.log(blocknum)
            console.log(parseInt(currentblock)+parseInt(blocktime) - blocknum)
        if (parseInt(currentblock)+parseInt(blocktime) - blocknum>=0){
            document.getElementById("reset").hidden = false;
            let res  =(parseInt(currentblock)+parseInt(blocktime) - blocknum)
            document.getElementById("timeleft").innerHTML="Time left: "+ res +" blocks or "+res/4+" minutes"
            mycontract.methods.currentPayment().call().then( function(res){ document.getElementById("price").innerHTML="Price of next button press: "+web3.utils.fromWei(res)+ " MOON";})
        }else{
            document.getElementById("price").innerHTML="Game Over"
            document.getElementById("timeleft").innerHTML="Time's up"
            document.getElementById("reset").hidden = true
            mycontract.methods.currentWinner().call().then(function(res){if(res.toUpperCase()===address.toUpperCase()){document.getElementById("claim").hidden =false;}})


        }
    });
    });

    
    });
        
    

}
}





