import { Route, Routes } from 'react-router-dom';
import './App.css';

import Loading from './Componets/Loading/Loading';
import Home from './Componets/Home/Home.jsx';
import Detail from './Componets/Create/Detail';
import NewDog from './Componets/Create/Create';


import { AllDogs, AllTempers } from './Reducer/Actions'

function App() {

  AllDogs();
  AllTempers();

  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Loading />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/Home/:page' element={<Home />} />
        <Route path='/Create' element={<NewDog />} />
        <Route path='/Dog/:id' element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
