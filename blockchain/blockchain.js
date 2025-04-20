const crypto = require('crypto');

class Block {
  constructor(index, timestamp, url, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.url = url;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return crypto.createHash('sha256').update(this.index + this.timestamp + this.url + this.previousHash).digest('hex');
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, Date.now().toString(), 'Genesis Block', '0');
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newUrl) {
    const newBlock = new Block(this.chain.length, Date.now().toString(), newUrl, this.getLatestBlock().hash);
    this.chain.push(newBlock);
  }

  isPhishing(urlToCheck) {
    return this.chain.some(block => block.url === urlToCheck);
  }
}

module.exports = Blockchain;
