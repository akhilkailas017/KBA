// This file will contain JavaScript for admin functionality, like verifying users
document.addEventListener('DOMContentLoaded', () => {
    const userRequests = document.getElementById('user-requests');

    // Example function to fetch user requests (this would normally involve an API call)
    const fetchUserRequests = async () => {
        // Dummy data for demonstration
        const requests = [
            {
                id: 1,
                name: 'User One',
                username: 'userone',
                phone: '1234567890',
                email: 'userone@example.com'
            },
            {
                id: 2,
                name: 'User Two',
                username: 'usertwo',
                phone: '0987654321',
                email: 'usertwo@example.com'
            }
        ];

        return requests;
    };

    // Load user requests on page load
    fetchUserRequests().then(requests => {
        userRequests.innerHTML = requests.map(request => `
            <div class="border p-4 mb-4">
                <p>Name: ${request.name}</p>
                <p>Username: ${request.username}</p>
                <p>Phone: ${request.phone}</p>
                <p>Email: ${request.email}</p>
                <button class="bg-green-500 text-white py-1 px-3 rounded mr-2">Approve</button>
                <button class="bg-red-500 text-white py-1 px-3 rounded">Reject</button>
            </div>
        `).join('');
    });
});
