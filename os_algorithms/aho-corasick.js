const AhoCorasick = require('aho-corasick-node');

// Define your patterns
const keywords = ['phish', 'malware', 'spam'];

// Create instance and build the trie
const ac = new AhoCorasick(keywords);

// Sample input text
const text = 'This email contains malware and is a phishing attempt.';

// Perform pattern matching
try {
    const results = ac.match(text);

    if (results.length > 0) {
        console.log('Matched patterns:', results.map(match => match.keyword));
    } else {
        console.log('No patterns matched.');
    }
} catch (err) {
    console.error('Aho-Corasick error:', err.message);
}


