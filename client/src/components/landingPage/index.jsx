import {Link} from 'react-router-dom';
import style from './landingPage.module.css';

export default function LandingPage() {
    return <div className={style.landingPage}>
        <Link to="/home">
            <button className={style.btn}>Ingresar</button>
        </Link>
    </div>
};