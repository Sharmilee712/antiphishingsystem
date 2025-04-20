class RoundRobin {
    constructor(timeQuantum) {
        this.timeQuantum = timeQuantum;
        this.queue = [];
    }

    addProcess(process) {
        this.queue.push(process);
    }

    execute() {
        let time = 0;
        while (this.queue.length > 0) {
            const process = this.queue.shift();
            const remainingTime = process.time - this.timeQuantum;

            console.log(`Time: ${time}, Executing ${process.name} for ${this.timeQuantum} units`);

            time += this.timeQuantum;

            if (remainingTime > 0) {
                process.time = remainingTime;
                this.queue.push(process);
            } else {
                console.log(`${process.name} completed at time ${time}`);
            }
        }
    }
}

// Example usage
const rr = new RoundRobin(4); // Time quantum is 4 units
rr.addProcess({ name: "Process 1", time: 6 });
rr.addProcess({ name: "Process 2", time: 4 });
rr.addProcess({ name: "Process 3", time: 8 });
rr.execute();
