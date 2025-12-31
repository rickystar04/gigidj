import { useState, useEffect } from "react";

import "./App.css";
const API_URL = import.meta.env.VITE_API_URL;

function App() {
  useEffect(() => {
    document.title = "GigiDj 🎧 - Richiedi una canzone";
  }, []);
  // canzone selezionata da Spotify
  const [selectedTrack, setSelectedTrack] = useState(null);

  // crea checkout quando una canzone viene selezionata
  const createCheckout = async (track) => {
    const res = await fetch(`${API_URL}/create-checkout-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: track.name,
        artist: track.artists.map((a) => a.name).join(", "),
        album: track.album.name,
        cover: track.album.images[0]?.url,
        spotifyUrl: track.external_urls.spotify,
      }),
    });

    const data = await res.json();
    window.location.href = data.url;
  };

  return (
    <div>
      <h1>🎶 Richiedi una canzone</h1>
      <SpotifySearch onSelect={createCheckout} />
    </div>
  );
}

function SpotifySearch({ onSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const search = async () => {
    if (!query) return;

    const res = await fetch(
      `${API_URL}/api/spotify/search?q=${encodeURIComponent(query)}`
    );
    const data = await res.json();
    console.log(data);

    setResults(data);
  };

  return (
    <div>
      <h2>🔍 Cerca su Spotify</h2>

      <input
        type="text"
        placeholder="Cerca una canzone..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={search}>Cerca</button>

      <div style={{ marginTop: "1rem" }}>
        {results.map((track) => (
          <div
            key={track.id}
            style={{
              display: "flex",
              gap: "1rem",
              marginBottom: "1.5rem",
              borderBottom: "1px solid #ddd",
              paddingBottom: "1rem",
            }}
          >
            {/* Cover */}
            {track.album.images[0] && (
              <img
                src={track.album.images[0].url}
                alt={track.name}
                style={{ width: "100px", height: "100px" }}
              />
            )}

            {/* Info */}
            <div>
              <h3>{track.name}</h3>
              <p>
                {track.artists.map((a) => a.name).join(", ")} —{" "}
                {track.album.name}
              </p>

              <button onClick={() => onSelect(track)}>
                🎧 Richiedi questa canzone (1€)
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
