// Reference chart:https://www.chartjs.org/docs/latest/getting-started/
// Reference: YouTube tutorial:https://www.youtube.com/watch?v=qkIdgedJgKo&t


// Array to store all movies fetched from the API
let allMovies = [];

// DOM elements
const list = document.getElementById("movie-list"); // Container for movie cards
const genreFilter = document.getElementById("genreFilter"); // Dropdown to filter movies by genre
const ctx = document.getElementById('genreChart').getContext('2d'); // Chart.js context
let genreChart; // Chart instance


function renderMovies(movies) {
  // If there are no movies, show a message and remove the chart
  if (!movies || movies.length === 0) {
    list.innerHTML = "<p>No movies found.</p>";
    if (genreChart) genreChart.destroy(); // Remove previous chart
    return;
  }

  // Render movie cards in the DOM
  list.innerHTML = movies.map(movie => `
    <div class="movie-card genre-${movie.genre.replace(/\s+/g, '')}">
      <h3>${movie.title}</h3>
      <p><strong>Year:</strong> ${movie.year}</p>
      <p><strong>Genre:</strong> ${movie.genre}</p>
      <p>${movie.description}</p>
    </div>
  `).join('');

  // Count the number of movies per genre for the chart
  const genreCounts = {};
  movies.forEach(m => genreCounts[m.genre] = (genreCounts[m.genre] || 0) + 1);

  // Destroy the previous chart if it exists
  if (genreChart) genreChart.destroy();

  // Create a new bar chart using Chart.js
  genreChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(genreCounts), // Genres as labels
      datasets: [{
        label: 'Number of Movies',
        data: Object.values(genreCounts), // Number of movies per genre
        backgroundColor: Object.keys(genreCounts).map(g => 
          `rgba(${Math.floor(Math.random()*200+50)}, ${Math.floor(Math.random()*200+50)}, ${Math.floor(Math.random()*200+50)}, 0.6)`
        ), // Random colors for each bar
        borderColor: 'rgba(255,255,255,0.8)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        title: { display: true, text: 'Movies by Genre', color: '#fff', font: { size: 16 } }
      },
      scales: {
        x: { ticks: { color: '#fff' } },
        y: { ticks: { color: '#fff', stepSize: 1 }, beginAtZero: true }
      }
    }
  });
}

// Fetch movies from the API
fetch("/api/movies")
  .then(res => res.json()) // Parse JSON response
  .then(data => {
    allMovies = data; // Store all movies in a variable
    renderMovies(allMovies); // Render all movies initially
  })
  .catch(err => {
    console.error("Error fetching movies:", err);
    list.innerHTML = "<p>Failed to load movies.</p>";
  });

// Event listener to filter movies by selected genre
genreFilter.addEventListener('change', () => {
  const genre = genreFilter.value;
  if (genre === "All") {
    renderMovies(allMovies); // Show all movies if "All" is selected
  } else {
    renderMovies(allMovies.filter(movie => movie.genre === genre)); // Filter by genre
  }
});

