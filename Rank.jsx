import React, { useState } from 'react';

function Rank() {
  const [rating, setRating] = useState(1);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('https://your-backend.repl.co/api/rank', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rating }), // no username now
    });

    const data = await response.json();
    setMessage(data.message);
  };

  return (
    <div>
      <h2>Rate</h2>
      <form onSubmit={handleSubmit}>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Rank;
