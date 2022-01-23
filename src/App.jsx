import { Route, Routes } from "react-router-dom";
import TrackContextProvider from "./context/trackContext";
import { Home } from "./pages/Home";

export default function App() {
  return (
    <TrackContextProvider>
      <Routes>
        <Route path="/" element={<Home />}/>
      </Routes>
    </TrackContextProvider>
  );
}
