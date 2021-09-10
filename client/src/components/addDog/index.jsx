import React, { useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addDog, getTemperaments} from '../../actions/index';
import Nav from '../nav/index';

function validate(input) {
    let errors = {};
    if(!input.name) {
        errors.name = 'Name is required';
    } 

    if(!input.height) {
        errors.height = 'Height is required';
    } else if(!/^([0-9])*$/.test(input.height)) {
        errors.height = 'Only numbers'
    }

    if(!input.weight) {
        errors.weight = 'Weight is required';
    } else if(!/^([0-9])*$/.test(input.weight)) {
        errors.weight = 'Only numbers'
    }

    if(!input.life_span) {
        errors.life_span = 'Life span is required';
    } else if(!/^([0-9])*$/.test(input.life_span)) {
        errors.life_span = 'Only numbers'
    }

    if(!input.temperaments){
        errors.temperament = 'Temperament required';
    }
    
    return errors;
}

export default function AddDog() {
    const dispatch = useDispatch();
    const temperaments = useSelector((state) => state.temperaments);
    const [input, setInput] = useState({
        name: '',
        height: '',
        weight: '',
        life_span: '',
        temperament: []
    });
    
    const [error, setErrors] = useState('')

    const handleInputChange = function(e) {
        
        setInput({
            ...input,
            [e.target.name]: e.target
        });
        
        var objError = validate({
            ...input,
            [e.target.name]: e.target.value
        });
        
        setErrors(objError);

    }

    const handleSubmit = function(e) {
        e.preventDefault()
        console.log(input)
        dispatch(addDog(input));
        setInput({
            name: '',
            height: '',
            weight: '',
            life_span: '',
            temperament: []
        })
    }

    const handleSelect = function(e) {
        setInput({
            ...input,
            temperament: [...input.temperament, e.target.value]
        })
    }

    useEffect(() => {
        dispatch(getTemperaments());
    }, []);

    return <div>
        <Nav />
        <div>
            <h1>ADD YOU DOG!!</h1>
            <form  onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Name:</label>
                    <input 
                        type="text"
                        name="name"
                        onChange={handleInputChange}
                        value={input.name}
                    />
                </div>
                <div>
                    <label>Height:</label>
                    <input 
                        type="text"
                        name="height"
                        onChange={handleInputChange}
                        value={input.height}
                    />
                </div>
                <div>
                    <label>Weight:</label>
                    <input 
                        type="text"
                        name="weight"
                        onChange={handleInputChange}
                        value={input.weight}
                    />
                </div>
                <div>
                    <label>Life span:</label>
                    <input 
                        type="text"
                        name="life_span"
                        onChange={handleInputChange}
                        value={input.life_span}
                    />
                </div>
                <div>
                <label>Temperaments:</label>
                <select onChange={(e) => handleSelect(e)}>
                    {temperaments.map((t) =>(
                        <option value={t.name} key={t.id}>{t.name}</option>
                    ))}
                </select>
                </div>
                <button  type='submit'>New Dog!!</button>    
            </form>
        </div>
    </div>
};


// Un formulario controlado con los siguientes campos
// Nombre
// Altura (Diferenciar entre altura mínima y máxima)
// Peso (Diferenciar entre peso mínimo y máximo)
// Años de vida
//  Posibilidad de seleccionar/agregar uno o más temperamentos
//  Botón/Opción para crear una nueva raza de perro