import "./App.css";
import { BrowserRouter, Route ,Routes} from "react-router-dom";

import UrlShortner from "./components/UrlShortner/UrlShortner";
import Url from "./components/Url/Url";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UrlShortner />} />
          <Route path="/:shortUrl" element={<Url/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
