const fs = require('fs');

function decodeValue(base, value) {
    return parseInt(value, base);
}

function lagrangeInterpolation(xValues, yValues) {
    let total = 0;
    const n = xValues.length;

    for (let i = 0; i < n; i++) {
        let term = yValues[i];
        for (let j = 0; j < n; j++) {
            if (i !== j) {
                term *= (0 - xValues[j]) / (xValues[i] - xValues[j]);
            }
        }
        total += term;
    }
    return total;
}

function main() {
    try {
        // Check if the file exists
        if (!fs.existsSync('input.json')) {
            throw new Error("File 'input.json' not found.");
        }

        // Read and parse the JSON file
        const data = JSON.parse(fs.readFileSync('input.json', 'utf8'));

        data.testCases.forEach((testCase, index) => {
            const n = testCase.keys.n;
            const k = testCase.keys.k;

            const xValues = [];
            const yValues = [];

            for (let key in testCase) {
                if (key !== 'keys') {
                    const x = parseInt(key);
                    const base = parseInt(testCase[key].base);
                    const value = testCase[key].value;
                    const y = decodeValue(base, value);

                    xValues.push(x);
                    yValues.push(y);
                }
            }

            const constantTerm = lagrangeInterpolation(
                xValues.slice(0, k),
                yValues.slice(0, k)
            );

            console.log(`The constant term (c) of the polynomial for test case ${index + 1} is: ${Math.round(constantTerm)}`);
        });

    } catch (error) {
        console.error("Error reading or parsing the JSON file:", error);
    }
}

main();
