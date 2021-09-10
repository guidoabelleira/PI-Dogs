import {Link} from 'react-router-dom';
import style from './nav.module.css';

export default function Nav() {
    return <div className={style.nav}>
        <Link to="/home">
            <div>Home</div>
        </Link>
        <Link to="/addDog">
            <div>New Dog</div>
        </Link>
        <Link to="/about">
            <div>About</div>
        </Link>
    </div>
};