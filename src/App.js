import './App.css';
import Card from './Card';
import Cart from './Cart';
import MainHeader from './MainHeader';
import { Route, Routes } from 'react-router-dom';

function App(props) {
  return (
    <div className='app'>
      <MainHeader count={props.handleClick} />
        <Routes>
          <Route
            path='/'
            element={
              <div className='card-row'>
                <Card />
              </div>
            }
          />
          <Route path='/cart' element={<Cart />} />
        </Routes>
    </div>
  );
}

export default App;
