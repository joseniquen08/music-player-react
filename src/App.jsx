import { Route, Routes } from "react-router-dom";
import TrackContextProvider from "./context/trackContext";
import { Error } from "./pages/Error";
import { Home } from "./pages/Home";

export default function App() {
  return (
    <TrackContextProvider>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="*" element={<Error/>}/>
      </Routes>
    </TrackContextProvider>
  );
}
