const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Track submitted ratings by username
const userRatings = {}; // { username: rating }

app.post('/api/rank', (req, res) => {
  const { username, rating } = req.body;

  // Check if data is provided
  if (!username || typeof rating !== 'number') {
    return res.status(400).json({ message: 'Username and rating are required' });
  }

  // Check if rating is valid
  if (rating < 1 || rating > 10) {
    return res.status(400).json({ message: 'Rating must be between 1 and 10' });
  }

  // Check if user already submitted a rating
  if (userRatings[username]) {
    return res.status(403).json({ message: 'You have already submitted a rating' });
  }

  // Save the rating
  userRatings[username] = rating;
  console.log(`User ${username} rated: ${rating}`);

  res.status(200).json({ message: 'Rating received. Thank you!', yourRating: rating });
});

const PORT = 3001;

app.get('/', (req, res) => {
  res.send('🎉 Welcome to the rating system. Please submit your rank.');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
