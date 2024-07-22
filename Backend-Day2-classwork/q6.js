const axios = require('axios');

async function fetchAndFilterPosts() {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        const posts = response.data;
        const filteredPosts = posts.filter(post => post.userId === 1);
        const titles = filteredPosts.map(post => post.title);
        console.log('Titles of posts with userId 1:');
        titles.forEach(title => console.log(title));
    } catch (error) {
        console.error('Error fetching posts:', error.message);
    }
}


fetchAndFilterPosts();
