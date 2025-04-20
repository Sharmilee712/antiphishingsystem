// os-algorithms/semaphore.js

class Semaphore {
    constructor(maxConcurrency) {
      this.tasks = [];
      this.maxConcurrency = maxConcurrency;
      this.current = 0;
    }
  
    async acquire(task) {
      if (this.current < this.maxConcurrency) {
        this.current++;
        await task();
        this.current--;
        this.next();
      } else {
        this.tasks.push(task);
      }
    }
  
    next() {
      if (this.tasks.length > 0 && this.current < this.maxConcurrency) {
        const nextTask = this.tasks.shift();
        this.acquire(nextTask);
      }
    }
  }
  
  // Example usage
  const semaphore = new Semaphore(2); // Max 2 tasks at a time
  
  function simulatePhishingCheck(url, delay) {
    return () => new Promise((resolve) => {
      console.log(`🔍 Checking URL: ${url}`);
      setTimeout(() => {
        console.log(`✅ Done with: ${url}`);
        resolve();
      }, delay);
    });
  }
  
  const urls = [
    simulatePhishingCheck("http://malicious1.com", 2000),
    simulatePhishingCheck("http://phishingsite2.net", 1000),
    simulatePhishingCheck("http://suspicious3.org", 1500),
    simulatePhishingCheck("http://legit4.com", 800),
  ];
  
  urls.forEach(task => semaphore.acquire(task));
  