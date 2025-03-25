import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Header, Footer } from './Components';
import { OverviewVocabulary } from './Pages';
import DetailVocabulary from './Pages/DetailVocabulary';

function App() {

  return (
    <div className="xl:max-w-[1280px] w-full mx-auto border-gray">
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
