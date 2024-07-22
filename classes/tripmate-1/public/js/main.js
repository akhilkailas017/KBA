document.addEventListener('DOMContentLoaded', () => {
    const rideResults = document.getElementById('ride-results');

    const searchRides = async (source, destination, seats, date) => {
        try {
            const response = await fetch(`/api/rides/search-rides?source=${source}&destination=${destination}&date=${date}`);
            const rides = await response.json();
            return rides;
        } catch (error) {
            console.error(error);
        }
    };

    document.querySelector('form[action="/search-ride"]').addEventListener('submit', async (event) => {
        event.preventDefault();

        const source = event.target.source.value;
        const destination = event.target.destination.value;
        const seats = event.target.seats.value;
        const date = event.target.date.value;

        const results = await searchRides(source, destination, seats, date);

        rideResults.innerHTML = results.map(ride => `
            <div class="border p-4 mb-4">
                <p>Source: ${ride.source}</p>
                <p>Destination: ${ride.destination}</p>
                <p>Date: ${ride.date}</p>
                <p>Seats available: ${ride.seatsAvailable}</p>
                <button class="bg-green-500 text-white py-1 px-3 rounded">Book</button>
            </div>
        `).join('');
    });
});
