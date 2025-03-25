import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Header, Footer } from './Components';
import { OverviewVocabulary, DetailVocabulary } from './Pages';

function App() {

  return (
    <div className="xl:max-w-[1480px] w-full mx-auto border-gray bg-gradient-to-b from-[#90CAF9] to-[#E0E0E0]">
      <Router>
        <Header />
          <Routes>
            <Route path="/" element={<OverviewVocabulary />} />
            <Route path="/:id" element={<DetailVocabulary />} />
            <Route path="/edit/:id" element={<DetailVocabulary />} />
          </Routes>
        <Footer />
      </Router>
    </div>
  )

}

export default App
