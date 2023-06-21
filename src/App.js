import './App.css';
import Header from './Header'
import Middle from './Middle'
import Footer from './Footer'

function App() {
  return (
    <div className='background'>
      <div className='main'>
      {Header()}
      {Middle()}
      {Footer()}
      </div>
    </div>
  );
}

export default App;
