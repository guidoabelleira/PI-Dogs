import Link from 'react-router-dom';
import style from './dog.module.css';

export default function Dog({id, image, name, temperament, weight}) {
    return (
    <div className={style.card}> 
        <img src={image} alt="Err img" />
        <div>
            <h4>{name}</h4>
            <p>{weight}</p>
            <p>{temperament}</p>
        </div>
    </div>
    //
    // <div className={style.card}>
    //     <img src={flag} className={style.img} alt="Err img" />
    //     <div className={style.body}>
    //         <h5 className={style.h5}>{name}</h5>
    //         <p className={style.p}>{region}</p>
    //     </div>
    //     <div className={style.body}>
    //         <link to={`/countries/${key}`}>More..</link>
    //     </div>
    // </div>
    )
    
};