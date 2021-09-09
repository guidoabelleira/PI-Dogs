import Dog from '../dog/index'
import style from './dogs.module.css';

export default function Dogs({dogs}) {
    return (
    <div className={style.cards}>
        {
            dogs.map((dog) => {
                
                return <Dog 
                key={dog.id}
                id={dog.id}
                image={dog.image} 
                name={dog.name} 
                temperament={dog.temperament}
                weight={dog.weight}
                />
            })
        }
    </div>
    )
};