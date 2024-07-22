async function fetchWithTimeout(url, timeout) {
    const fetchPromise = fetch(url);
    const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => {
            reject(new Error(`Request timed out after ${timeout}ms`));
        }, timeout)
    );

    try {
        const response = await Promise.race([fetchPromise, timeoutPromise]);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}
fetchWithTimeout('https://api.example.com/data', 5000)
    .then(data => console.log('Fetched data:', data))
    .catch(error => console.error('Error:', error));