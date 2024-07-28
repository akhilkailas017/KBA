window.onload = async () => {
    try {
        const res = await fetch('/api/admin/verification-requests', {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
        });
        const users = await res.json();
        if (res.ok) {
            const verificationRequests = document.getElementById('verification-requests');
            verificationRequests.innerHTML = users.map(user => `
                <div class="bg-gray-100 p-4 rounded-md shadow-md">
                    <h3 class="text-lg font-bold">${user.username}</h3>
                    <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onclick="verifyUser('${user._id}')">Verify</button>
                </div>
            `).join('');
        } else {
            alert('Unable to fetch verification requests');
        }
    } catch (error) {
        alert('Something went wrong!');
    }
};

const verifyUser = async (userId) => {
    try {
        const res = await fetch(`/api/admin/verify/${userId}`, {
            method: 'POST',
            headers: { 
                'Authorization': `Bearer ${localStorage.getItem('adminToken')}`, 
                'Content-Type': 'application/json'
            }
        });
        const data = await res.json();
        if (res.ok) {
            alert('User verified successfully!');
            window.location.reload();
        } else {
            alert(data.message);
        }
    } catch (error) {
        alert('Something went wrong!');
    }
};
