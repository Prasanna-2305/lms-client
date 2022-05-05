import './App.css';
import NavbarRoute from './components/navbar/Navbar';
import {ToastContainer} from 'react-toastify'
function App() {
  return (
    <div className="App">
    <NavbarRoute />
    <ToastContainer />
    </div>
  );
}

export default App;
