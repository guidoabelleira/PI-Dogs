import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getDogByName } from '../../actions/index';
import style from './search.module.css';


export default function Search() {

    const dispatch = useDispatch();
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

    return (
    <div className={style.search}>
        <div className={style.searchBar}>
            <input type="text" placeholder="Search..." onChange={handleInputChange} value={byName}/>
            <button className={style.btn} type='submit' onClick={handleSubmit} >Search</button>
        </div>
    </div>
    )
};