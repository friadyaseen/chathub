import './App.css';
import Header from './Header'
import Middle from './Middle'
import Footer from './Footer'

function App() {
  return (
    <div className='background'>
      {Header()}
      {Middle()}
      {Footer()}
    </div>
  );
}

export default App;
