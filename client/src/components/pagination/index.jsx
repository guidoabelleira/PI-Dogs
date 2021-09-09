import React from 'react';
import style from './pagination.module.css';

export default function Pagination({dogsPerPage, totalDogs, paginate}) {
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalDogs / dogsPerPage); i++) {
        pageNumbers.push(i);
    }
    
    return (
        <nav className={style.nav}>
            <ul className={style.ul}>
                {pageNumbers.map(number => {
                    return <button className={style.bt} onClick={() => paginate(number)} key={number}>{number}</button>;
                })}
            </ul>
        </nav>
    )
}