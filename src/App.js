import './App.css';
import Card from './Card';
import Cart from './Cart';
import MainHeader from './MainHeader';
import Form from './Form'; // Import the Form component
import { Route, Routes } from 'react-router-dom';

function App(props) {
  return (
    <div className='app'>
      <MainHeader count={props.handleClick} />
      <Routes>
        <Route
          path='/'
          element={
            <div className='container mx-auto p-4'>
              <Card />
            </div>
          }
        />
        <Route path='/cart' element={<Cart />} />
        <Route path='/form' element={<Form />} /> {/* Add the Form route */}
      </Routes>
    </div>
  );
}

export default App;
