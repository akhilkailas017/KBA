document.getElementById('admin-login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const res = await fetch('/api/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        if (res.ok) {
            localStorage.setItem('adminToken', data.token);
            window.location.href = 'admin-verify.html';
        } else {
            alert(data.message);
        }
    } catch (error) {
        alert('Something went wrong!');
    }
});
