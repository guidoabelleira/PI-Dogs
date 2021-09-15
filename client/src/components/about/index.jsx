import Nav from '../nav/index';
import style from './about.module.css'


export default function About() {
    return (
    <div className={style.body}>
    <Nav />
        <div className={style.box}>
            <h3 className={style.h3}>Thanks for visiting My Dog App!!!</h3>
            <p>App made as an individual project based on the knowledge acquired in the bootcamp "Soy Henry".</p>
            <h4>Used technology:</h4>
            <p>React, React-Redux, Express Js, Node Js, PostgreSQL,</p>
        </div> 
        <div className={style.box2}>
            <h4 className={style.h4}>Visit the app in <a href="https://github.com/guidoabelleira/PI-Dogs">GitHub!</a></h4>
            <p>By: Guido Andres Abelleira Greco</p>
        </div>   
    </div>)
};

