import {NavLink} from 'react-router-dom';
import style from './dog.module.css';

export default function Dog({id, image, name, temperament, weight_min, weight_max}) {
    return (
    <div className={style.card}> 
        <img src={image} alt="Err img" />
        <div>
            <h4>{name}</h4>
            <p>Weight (cm): {weight_min} min ~ {weight_max} max </p>
            <p>Temperaments: {temperament}</p>
            <NavLink to={`/home/${id}`}>
            <p>Detail</p>
            </NavLink>
        </div>
    </div>
    )
};