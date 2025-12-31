import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function ViewSongs() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/retrieve-songs`)
      .then((res) => res.json())
      .then((data) => {
        console.log("SONGS:", data);
        setSongs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>⏳ Caricamento...</p>;

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h1>🎵 Canzoni Richieste</h1>

      {songs.length === 0 ? (
        <p>Nessuna canzone trovata</p>
      ) : (
        songs.map((song) => (
          <div
            key={song.id}
            className="flex items-center gap-4 mb-6 pb-4 border-b"
          >
            {/* COVER */}
            {song.cover && (
              <img
                src={song.cover}
                alt={song.title || song.titoloCanzone}
                className="w-20"
              />
            )}

            {/* INFO */}
            <div className="flex gap-2">
              <h3 style={{ margin: 0 }}>{song.title || song.titoloCanzone}</h3>

              <p>
                {song.artista}
                {song.album && ` — ${song.album}`}
              </p>

              {song.created_at && (
                <small className="flex items-center">
                  🕒 {new Date(song.created_at).toLocaleString()}
                </small>
              )}
            </div>

            <a href={song.spotifyUrl} target="_blank" rel="noopener noreferrer">
              🎵 Ascolta
            </a>
          </div>
        ))
      )}
    </div>
  );
}
