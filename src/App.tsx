import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import './App.css';

function App() {
  return (
    <div className='bg-gray-950 h-screen pt-0 mt-0'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
