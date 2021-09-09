import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { orderAsc, getDogByName } from '../../actions/index';
import style from './search.module.css';


export default function Search() {

    const dispatch = useDispatch();
    const [asc, setAsc] = useState();
    const [byName, setByName] = useState('');

    function handleInputChange(e){
        e.preventDefault();
        setByName(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        if(byName !== ''){
            dispatch(getDogByName(byName));
            setByName('')
        }
    }

    function handleOrdChange(e) {
        e.preventDefault();
        console.log("ord", e.target.value);
        dispatch(orderAsc(e.target.value));
        setAsc(e.target.value)
    }

    return (
    <div className={style.search}>
        <div className={style.searchBar}>
            <input type="text" placeholder="Search..." onChange={handleInputChange} value={byName}/>
            <button className={style.btn} type='submit' onClick={handleSubmit} >Search</button>
        </div>
        <div className={style.filter}>
            <p>Orden alfabetico: </p>
            <select onChange={e => handleOrdChange(e)}>
                {/* <option value={false}>Disable</option> */}
                <option value='true'>Asc</option>
                <option value='false'>Des</option>
            </select>
        </div>
        <div className={style.filter}>
            <p>Orden por peso: </p>
            <select onChange={(e) => handleOrdChange(e)}>
                <option value={false}>Disable</option>
                <option value={true}>Asc</option>
                <option value={true}>Des</option>
            </select>
        </div>
    </div>
    )
};