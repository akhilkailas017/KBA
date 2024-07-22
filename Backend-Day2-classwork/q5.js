const axios = require('axios');

async function fetchData(url, retries = 3) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            if (attempt === retries) {
                throw new Error(`Failed after ${retries} attempts: ${error.message}`);
            }
            console.log(`Attempt ${attempt} failed. Retrying...`);
        }
    }
}

(async () => {
    const url = 'https://jsonplaceholder.typicode.com/posts/1';
    try {
        const data = await fetchData(url);
        console.log('Data fetched successfully:', data);
    } catch (error) {
        console.error(error.message);
    }
})();
