import {Route} from 'react-router-dom';

import LandingPage from './components/landingPage/index';
import Home from './components/home/home';
import AddDog from './components/addDog/index';
import DogDetail from './components/dogDetail/index';
import About from './components/about';
import './App.css';



function App() {
  
  return (
    <div className="App">   
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/addDog' component={AddDog} />
        <Route exact path='/home/:id' component={DogDetail} />
        <Route exact path='/about' component={About} />
    </div>
  );
}
export default App;