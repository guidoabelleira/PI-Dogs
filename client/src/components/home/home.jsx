import {useEffect, useState} from 'react';
import Dogs from '../dogs/index';
import Pagination from '../pagination/index';
import {getDogs, getTemperaments, orderAsc, orderWeigth, orderDb} from '../../actions/index';
import {useDispatch, useSelector} from 'react-redux';


import Nav from '../nav/index';
import Search from '../search/index';

import style from './home.module.css';

function Home(props) {
    const dispatch = useDispatch();
    const dogs = useSelector(state => state.dogs);
    const temperaments = useSelector(state => state.temperaments);
    
    const [currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage] = useState(8);
    const [asc, setAsc] = useState();
    const [weigth, setWeigth] = useState();
    const [db, setDb] = useState();

    useEffect(() => {
        async function geters() {
            await dispatch(getDogs());
            await dispatch(getTemperaments());
        };
        geters();
    }, []);

    const indexOfLast = currentPage * dogsPerPage;
    const indexOfFirst = indexOfLast - dogsPerPage;
    const currentDogs = dogs.slice(indexOfFirst, indexOfLast);

    function paginate(pageNumber) {
        setCurrentPage(pageNumber)
    }

    function handleOrdChange(e) {
        e.preventDefault();
        setAsc(e.target.value)
        dispatch(orderAsc(e.target.value));
        setCurrentPage(1);
    }

    function handleOrdChangeWeigth(e){
        e.preventDefault();
        setWeigth(e.target.value);
        dispatch(orderWeigth(e.target.value));
        setCurrentPage(1);
    }

    function handleOrdChangeBd(e){
        e.preventDefault();
        setDb(e.target.value);
        dispatch(orderDb(e.target.value));
        setCurrentPage(1);
    }



    return (
        <div className={style.body}>
            <Nav />
            <Search />
            <div className={style.filters}>
                <div>
                    <p>Orden alfabetico: </p>
                    <select onChange={e => handleOrdChange(e)}> 
                        <option value='up'>Asc</option>
                        <option value='down'>Des</option>
                    </select>
                </div>
                <div>
                    <p>Orden por peso: </p>
                    <select onChange={(e) => handleOrdChangeWeigth(e)}>
                        <option value='none'>Disable</option>
                        <option value='up'>Asc</option>
                        <option value='down'>Des</option>
                    </select>
                </div>
                <div>
                    <p>My dogs: </p>
                    <select onChange={(e) => handleOrdChangeBd(e)}>
                        <option value='all'>All</option>
                        <option value='api'>Api</option>
                        <option value='mydogs'>My dogs</option>
                    </select>
                </div>
            </div>
            <Dogs dogs={currentDogs}/>
            <Pagination 
                dogsPerPage={dogsPerPage} 
                totalDogs={dogs.length} 
                paginate={paginate}
            />
        </div>
    )
};

export default Home;