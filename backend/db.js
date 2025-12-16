const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'data');

// Ensure data dir exists
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

const readData = (file) => {
    const filePath = path.join(dataDir, file);
    if (!fs.existsSync(filePath)) {
        return [];
    }
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
};

const writeData = (file, content) => {
    const filePath = path.join(dataDir, file);
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
};

module.exports = { readData, writeData };
