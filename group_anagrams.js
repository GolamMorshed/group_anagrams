const fs = require('fs');
const Table = require('cli-table');

// Function to group anagrams
function groupAnagrams(words) {
    const anagramWordGroups = new Map();

    words.forEach(word => {
        // Split each word to array of its indivitual characters. 
        // Use sort method to convert the characters alphabatically. 
        // Use join method to join the characters to make a single string
        const sortedWord = word.split('').sort().join('');
        // Use the sorted word as a key for the anagram group
        if (!anagramWordGroups.has(sortedWord)) {
            anagramWordGroups.set(sortedWord, []);
        }
        anagramWordGroups.get(sortedWord).push(word);
    });

    return anagramWordGroups;
}

// Function to read file and process words
function processFile(filename) {
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading file: ${err}`);
            return;
        }
        const words = data.split('\n').map(word => word.trim()).filter(word => word.length > 0);
        const anagramWordGroups = groupAnagrams(words);
        displayAnagramGroups(anagramWordGroups);
    });
}

// Function to format and display anagram groups
function displayAnagramGroups(anagramWordGroups) {
    const table = new Table({
        head: ['Anagram Group']
    });

    anagramWordGroups.forEach(group => {
        table.push([group.join(', ')]);
    });

    console.log(table.toString());
}

// Get the filename from command line arguments
const filename = process.argv[2];
if (!filename) {
    console.error('Please provide a file to process.');
    process.exit(1);
}

// Process the provided file
processFile(filename);






