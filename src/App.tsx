import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import { Events } from './pages/Events'
import { GemMajor } from './pages/GemMajor'
import { GetInvolved } from './pages/GetInvolved'
import { Home } from './pages/Home'
import { Partners } from './pages/Partners'
import { Team } from './pages/Team'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/about/team" element={<Team />} />
          <Route path="/gem-major" element={<GemMajor />} />
          <Route path="/events" element={<Events />} />
          <Route path="/get-involved" element={<GetInvolved />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
