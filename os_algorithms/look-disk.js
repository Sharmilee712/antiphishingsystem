class LOOKDiskScheduling {
    constructor() {
        this.requests = [];
        this.headPosition = 0;
        this.direction = "left"; // "left" or "right"
    }

    addRequest(request) {
        this.requests.push(request);
    }

    execute() {
        let left = [];
        let right = [];
        let seekCount = 0;

        // Separate requests into left and right of the head position
        for (let request of this.requests) {
            if (request < this.headPosition) {
                left.push(request);
            } else {
                right.push(request);
            }
        }

        // Sort the left and right requests
        left.sort((a, b) => b - a); // Sort descending
        right.sort((a, b) => a - b); // Sort ascending

        // If the direction is left, move left first
        if (this.direction === "left") {
            // Traverse to the left
            for (let i = 0; i < left.length; i++) {
                seekCount += Math.abs(this.headPosition - left[i]);
                this.headPosition = left[i];
            }

            // Then traverse to the right
            for (let i = 0; i < right.length; i++) {
                seekCount += Math.abs(this.headPosition - right[i]);
                this.headPosition = right[i];
            }
        } else {
            // If the direction is right, move right first
            for (let i = 0; i < right.length; i++) {
                seekCount += Math.abs(this.headPosition - right[i]);
                this.headPosition = right[i];
            }

            // Then traverse to the left
            for (let i = 0; i < left.length; i++) {
                seekCount += Math.abs(this.headPosition - left[i]);
                this.headPosition = left[i];
            }
        }

        console.log(`Total Seek Count: ${seekCount}`);
        console.log(`Final Head Position: ${this.headPosition}`);
    }
}

// Example usage
const look = new LOOKDiskScheduling();
look.addRequest(55);
look.addRequest(58);
look.addRequest(39);
look.addRequest(18);
look.addRequest(90);
look.headPosition = 50;  // Initial head position
look.direction = "left"; // Can be "left" or "right"
look.execute();
