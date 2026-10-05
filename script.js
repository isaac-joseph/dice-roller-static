// Dice Roller
// Gets all random dice values from the Node.js server.

const NUM_DICE = 5;

// Use localhost while testing.
// Later we will replace this with your Azure Node.js URL.
const API_URL = 'https://dice-roller-ijj-node-b0a6caekg9frarc3.centralus-01.azurewebsites.net';

let rollCount = 0;

/**
 * Calls the Node.js server to wake it up.
 */
async function wakeUpServer() {
    try {
        const response = await fetch(API_URL + '/api/ping');
        const text = await response.text();

        console.log('Server response: ' + text);
    } catch (error) {
        console.error('Unable to wake up server:', error);
    }
}

/**
 * Gets five random dice values from the Node.js server
 * and displays them on the page.
 */
async function rollAllDice() {
    try {
        const response = await fetch(API_URL + '/api/roll-dice');
        const data = await response.json();

        let total = 0;

        for (let i = 0; i < NUM_DICE; i++) {
            const value = data.dice[i];

            const field = document.getElementById('die' + (i + 1));

            if (field) {
                field.value = value;
            }

            total += value;
        }

        const totalField = document.getElementById('total');

        if (totalField) {
            totalField.value = total;
        }

        rollCount++;

        const counter = document.getElementById('rollCount');

        if (counter) {
            counter.textContent = 'Rolls this turn: ' + rollCount;
        }

    } catch (error) {
        console.error('Unable to roll dice:', error);
    }
}

/**
 * Starts the Dice Roller.
 */
async function startApp() {
    await wakeUpServer();
    await rollAllDice();
}