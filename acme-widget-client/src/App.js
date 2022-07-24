import './styles/App.css';   
import { Route, Routes,useLocation } from 'react-router-dom';
import Main from './pages/Main';
import Home from './pages/Home';

function App() {

  let location = useLocation();

  return (
       <Routes location={location.pathname}>
        <Route exact path="/" element={<Main />} />
          <Route path="/home/*" element={<Home />} />
      </Routes>
  );
}

export default App;
