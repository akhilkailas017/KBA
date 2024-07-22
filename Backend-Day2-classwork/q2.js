const numbers = [1, 2, 3, 4, 5];

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function processNumbers(numbers) {
    for (const number of numbers) {
        await delay(1000); 
        const doubled = number * 2;
        console.log(`Processed ${number} - ${doubled}`);
    }
}

processNumbers(numbers).then(() => {
    console.log('All numbers processed');
}).catch(error => {
    console.error('Error processing numbers:', error);
});
