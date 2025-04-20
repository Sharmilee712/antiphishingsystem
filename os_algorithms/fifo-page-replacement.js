class FIFOQueue {
    constructor(capacity) {
        this.capacity = capacity;
        this.queue = [];
    }

    addPage(page) {
        if (this.queue.length >= this.capacity) {
            this.queue.shift(); // Remove the oldest page (FIFO)
        }
        this.queue.push(page);
    }

    getPages() {
        return this.queue;
    }
}

// Example usage
const fifo = new FIFOQueue(3);
fifo.addPage("url1");
fifo.addPage("url2");
fifo.addPage("url3");
console.log("FIFO Pages:", fifo.getPages()); // Shows 3 pages

fifo.addPage("url4"); // Should remove url1 (oldest)
console.log("FIFO Pages after adding url4:", fifo.getPages());
