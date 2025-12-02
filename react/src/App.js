import './App.css';
import './components/outlet.css'
import './features/products/products.css'
import './features/basket/basket.css'
// import './index.css'
// import './flag.css'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Layout from './components/Layout';
import Products from './features/products/Products';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import Basket from './features/basket/Basket';

import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
        
import "primereact/resources/themes/lara-light-pink/theme.css";


function App() {
  return (
    // <PrimeReactProvider>
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Layout></Layout>}>
            <Route path='/' element={<Products></Products>}></Route>
            <Route path='/login' element={<Login></Login>}></Route>
            <Route path='/register' element={<Register></Register>}></Route>
            <Route path='/basket' element={<Basket></Basket>}></Route>
          </Route>
        </Routes>
      </Router>
    </div>
    //  </PrimeReactProvider>
  );
}

export default App;
