import {useEffect, useState} from 'react';
import Dogs from '../dogs/index';
import Pagination from '../pagination/index';
import {getDogs} from '../../actions/index';
import {useDispatch, useSelector} from 'react-redux';


import Nav from '../nav/index';
import Search from '../search/index';

function Home(props) {
    const dispatch = useDispatch();
    const dogs = useSelector(state => state.dogs);
    const asc = useSelector(state => state.setOrderAsc);
    
    // const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage] = useState(8);

    useEffect(async () => {
        await dispatch(getDogs());
        // setLoading(false);
    }, [asc]);

    const indexOfLast = currentPage * dogsPerPage;
    const indexOfFirst = indexOfLast - dogsPerPage;
    const currentDogs = sorted(dogs).slice(indexOfFirst, indexOfLast);

    function sorted(c) {
        if(asc === false) {
            return c.sort(function (a, b) {
                if(a.name > b.name){
                    return 1;
                }
                if(a.name < b.name){
                    return -1;
                }
                return 0;
            });
        }
        return c;
    }
    

    function paginate(pageNumber) {
        setCurrentPage(pageNumber)
    }

    return (
    <div>
        <Nav />
        <Search />
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