import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getDogById} from '../../actions/index';
import Nav from '../nav/index';

import style from './dogDetail.module.css';

export default function DogDetail(props) {
    let aux = props.match.params.id;
    const dog = useSelector((state) => state.byId);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getDogById(aux));
    }, [dispatch]);

    
    // console.log("dog id: ", dog.weight.length)
    return (
        <div>
            <Nav />
            <div className={style.card}> 
                <img src={dog.image} alt="Err img" />
                <div>
                    <h4>Name: "{dog.name}"</h4>
                    <p>Weight: {dog.weight.slice(0, -4)} min ~ {dog.weight.slice(5)} max Kg. </p>
                    <p>Height: {dog.height.slice(0, -4)} min ~ {dog.height.slice(5)} max Cm. </p>
                    <p>Life Span: {dog.life_span}</p>
                    <p>Temperaments: {dog.temperament}.</p>
                </div>
            </div>
        </div>
    );
}