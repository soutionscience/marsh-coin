const AES = require("crypto-js/aes");
const SHA256 = require("crypto-js/sha256");

class Block{
    constructor(index, timestamp, data, previousHash =''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nounce =0;

    }
    calculateHash(){ //use above properties and create hash with it
  return SHA256(this.index+ this.timestamp + this.previousHash+ JSON.stringify(this.data)+ this.nounce).toString();
    }
    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty+1).join('0')){
            this.nounce++
            this.hash = this.calculateHash()

        }
        console.log('mined block is ', this.hash)

    }
}

class BlockChain{
constructor(){
    this.chain =[this.createGenesis()]
    this.difficulty =4
}
createGenesis(){
    return new Block(0, '18/4/2018', 'New Block-chain genesis', '0')
}
getLatestBlock(){
    return this.chain[this.chain.length - 1]

}
addBlock(newBlock){
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.difficulty)
    this.chain.push(newBlock)

}

isValid(){
    for(var i= 1; i<this.chain.length; i++){
        const currentBlock = this.chain[i];
        const previousBlock = this.chain[i-1];
        if(currentBlock.hash != currentBlock.calculateHash()){
            return false
        }
        if(previousBlock.hash != currentBlock.previousHash){
            return false;
        }

    }
    return true;
}
}

let marshCoin = new BlockChain();
console.log('mining block 1.....')
marshCoin.addBlock(new Block(1, '19/4/2018', {amount: 4}));
console.log('mining block 2.....')
marshCoin.addBlock(new Block(2, '20/4/2018', {amount: 10}));

// console.log('is marsh coin valid? ', marshCoin.isValid())
// marshCoin.chain[1].data={amount: 200};
// marshCoin.chain[1].hash = marshCoin.chain[1].calculateHash();
// console.log('is marsh coin valid? ', marshCoin.isValid())

// console.log(JSON.stringify( marshCoin, null, 3))

// console.log('test ', SHA256("Message"));