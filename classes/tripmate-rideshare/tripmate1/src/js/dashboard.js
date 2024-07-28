document.getElementById('search-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const departure = document.getElementById('departure').value;
    const arrival = document.getElementById('arrival').value;
    const date = document.getElementById('date').value;

    try {
        const res = await fetch(`/api/rides/search?departure=${departure}&arrival=${arrival}&date=${date}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        const rides = await res.json();
        const rideList = document.getElementById('ride-list');
        rideList.innerHTML = rides.map(ride => `
            <div class="bg-gray-100 p-4 rounded-md shadow-md">
                <h3 class="text-lg font-bold">${ride.departure} to ${ride.arrival}</h3>
                <p>Date: ${ride.date}</p>
                <p>Capacity: ${ride.capacity}</p>
                <button class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded" onclick="bookRide('${ride._id}')">Book</button>
            </div>
        `).join('');
    } catch (error) {
        alert('Something went wrong!');
    }
});

const bookRide = async (rideId) => {
    try {
        const res = await fetch(`/api/rides/${rideId}/book`, {
            method: 'POST',
            headers: { 
                'Authorization': `Bearer ${localStorage.getItem('token')}`, 
                'Content-Type': 'application/json'
            }
        });
        const data = await res.json();
        if (res.ok) {
            alert('Ride booked successfully!');
        } else {
            alert(data.message);
        }
    } catch (error) {
        alert('Something went wrong!');
    }
};
