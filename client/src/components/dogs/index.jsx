import Dog from '../dog/index'
import style from './dogs.module.css';

export default function Dogs({dogs}) {
    console.log(dogs)
    return (
    <div className={style.cards}>
        {
            dogs.map((dog) => {
                
                return <Dog 
                key={dog.id}
                id={dog.id}
                image={dog.image} 
                name={dog.name} 
                temperament={!dog.createdAt ? dog.temperament : dog.Temperaments[0].name}
                weight_min={dog.weight_min}
                weight_max={dog.weight_max}
                />
            })
        }
    </div>
    )
};
