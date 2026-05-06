import { HashRouter, Routes, Route } from "react-router-dom"
import ComfortZonePage from "./pages/ComfortZonePage"
import ViewDataPage from "./pages/ViewDataPage"
import MainPage from "./pages/MainPage"

function App() {
  return (
    <HashRouter>
        <Routes>
          <Route path="" element={<MainPage />} />
          <Route path="comfort-zone/:roomId" element={<ComfortZonePage />} />
          <Route path="view-data/:roomId" element={<ViewDataPage />} />
        </Routes>
      </HashRouter>
  )
}

export default App;