import { MusicPlayer } from "./components/MusicPlayer";
import { Navbar } from "./components/Navbar";
import { AllSongs } from "./components/AllSongs";
import { Playlists } from "./components/Playlists";

import { BrowserRouter, Routes, Route } from "react-router";
import { MusicProvider } from "./contexts/MusicContext";

function App() {
  return (
    <BrowserRouter>
      <MusicProvider>
        <div className="app">
          <Navbar />
          <div className="app-main">
            <div className="player-section">
              <MusicPlayer />
            </div>
            <div className="content-section">
              <Routes>
                <Route path="/" element={<AllSongs />} />
                <Route path="/playlists" element={<Playlists />} />
              </Routes>
            </div>
          </div>
        </div>
      </MusicProvider>
    </BrowserRouter>
  );
}

export default App;
