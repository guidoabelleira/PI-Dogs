import {Route} from 'react-router-dom';

import LandingPage from './components/landingPage/index';
import Home from './components/home/home';
import NewDog from './components/newDog/index';
// import CountryDetail from './components/countryDetail/index';
import About from './components/about';
import './App.css';



function App() {
  
  return (
    <div className="App">   
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/newdog' component={NewDog} />
        {/* <Route exact path='/countryDetail/:id' component={CountryDetail} /> */}
        <Route exact path='/about' component={About} />
    </div>
  );
}
export default App;