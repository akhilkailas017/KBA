document.getElementById('offer-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const departure = document.getElementById('departure').value;
    const arrival = document.getElementById('arrival').value;
    const route = document.getElementById('route').value;
    const stops = document.getElementById('stops').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const capacity = document.getElementById('capacity').value;

    try {
        const res = await fetch('/api/rides', {
            method: 'POST',
            headers: { 
                'Authorization': `Bearer ${localStorage.getItem('token')}`, 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ departure, arrival, route, stops, date, time, capacity })
        });
        const data = await res.json();
        if (res.ok) {
            window.location.href = 'dashboard.html';
        } else {
            alert(data.message);
        }
    } catch (error) {
        alert('Something went wrong!');
    }
});
