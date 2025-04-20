class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
    }

    get(key) {
        if (!this.cache.has(key)) {
            return -1;
        }
        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
    }

    put(key, value) {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        }
        if (this.cache.size === this.capacity) {
            const oldestKey = this.cache.keys().next().value;
            this.cache.delete(oldestKey);
        }
        this.cache.set(key, value);
    }

    display() {
        console.log("Current LRU Cache:", [...this.cache.entries()]);
    }
}

// Example usage
const lru = new LRUCache(3);
lru.put("url1", "phishing");
lru.put("url2", "safe");
lru.put("url3", "phishing");
lru.display(); // Shows 3 entries

lru.get("url1"); // Access url1 to make it recently used
lru.put("url4", "safe"); // Evicts least recently used (url2)
lru.display(); // Should not include url2
