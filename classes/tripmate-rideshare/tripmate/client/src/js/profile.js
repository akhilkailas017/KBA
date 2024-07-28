window.onload = async () => {
    try {
        const res = await fetch('/api/profile', {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        const user = await res.json();
        if (res.ok) {
            document.getElementById('profile-info').innerHTML = `
                <h2 class="text-2xl font-bold mb-4">${user.username}</h2>
                <p>Email: ${user.email}</p>
                <p>Phone: ${user.phone}</p>
                <button class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded" onclick="logout()">Logout</button>
            `;
        } else {
            alert('Unable to fetch profile information');
        }
    } catch (error) {
        alert('Something went wrong!');
    }
};

const logout = () => {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
};
