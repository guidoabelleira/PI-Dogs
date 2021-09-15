import React, { useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addDog, getTemperaments} from '../../actions/index';

import Nav from '../nav/index';

import style from './addDog.module.css';

export default function AddDog() {
    const dispatch = useDispatch();
    const temperaments = useSelector((state) => state.temperaments);
    
    const [input, setInput] = useState({
        name: "",
        heightMin: "",
        heightMax: "",
        weightMin: "",
        weightMax: "",
        life_span: "",
        temperament: []
    });
    
    const [errors, setErrors] = useState('');

    function validate(input) {
        let errors = {};
        
        if(!input.name && input.name.length < 2) {
            errors.name = 'Name is required';
        } 
    
        if(!input.heightMin) {
            errors.heightMin = 'Height(min) is required';
        } else if(!/^([0-9])*$/.test(input.heightMin)) {
            errors.heightMin = 'Only numbers';
        } 
    
        if(!input.heightMax) {
            errors.heightMax = 'Height(max) is required';
        } else if(!/^([0-9])*$/.test(input.heightMax)) {
            errors.heightMax = 'Only numbers';
        } else if(input.heightMax < input.heightMin) {
            errors.heightMax = 'Must be greater than value min'
        }

        if(!input.weightMin) {
            errors.weightMin = 'Weight(min) is required';
        } else if(!/^([0-9])*$/.test(input.weightMin)) {
            errors.weightMin = 'Only numbers';
        } 
    
        if(!input.weightMax) {
            errors.weightMax = 'Weight(max) is required';
        } else if(!/^([0-9])*$/.test(input.weightMax)) {
            errors.weightMax = 'Only numbers';
        } else if(input.weightMax < input.weightMin) {
            errors.weightMax = 'Must be greater than value min'
        }
    
        if(!input.life_span) {
            errors.life_span = 'Life span is required';
        } else if(!/^([0-9])*$/.test(input.life_span)) {
            errors.life_span = 'Only numbers';
        } 

        if(input.temperament.length < 1) {
            errors.temperament = 'Temperament is required';
        }
        
        return errors;
    }

    const handleInputChange = function(e) {
        e.preventDefault();
        
        
        var objError = validate({
            ...input,
            [e.target.name]: e.target.value
        });
        
        setErrors(objError);

        setInput({
            ...input,
            [e.target.name]: e.target.value
        });

    }

    const handleSubmit = function(e) {
        e.preventDefault();
        if(input.name !== '' && input.heightMin !== '' && input.heightMax !== '' && input.weightMin !== '' && input.weightMax !== '' && input.life_span !== '' && input.temperament.length !== 0) {
            dispatch(addDog(input));
            setInput({
                name: '',
                heightMin: '',
                heightMax: '',
                weightMin: '',
                weightMax: '',
                life_span: '',
                temperament: []
            })
            alert("Congratulations, your dog was created.")
        } else {
            alert("Error, something went wrong! Please, check the data entered.")
        }
        
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
                        className={errors.name && style.danger}
                        type="text"
                        name="name"
                        onChange={handleInputChange}
                        value={input.name}
                    />
                    {errors.name && (
                        <p className={style.danger}>{errors.name}</p>
                    )}
                </div>
                <div>
                    <label>Height (cm):</label>
                    <input 
                        className={errors.heightMin && style.danger}
                        type="number"
                        min="1"
                        name="heightMin"
                        placeholder="min"
                        onChange={handleInputChange}
                        value={input.heightMin}
                    />
                    {errors.heightMin && (
                        <p className={style.danger}>{errors.heightMin}</p>
                    )}
                    <input 
                        className={errors.heightMax && style.danger}
                        type="number"
                        min="1"
                        name="heightMax"
                        placeholder="max"
                        onChange={handleInputChange}
                        value={input.heightMax}
                    />
                    {errors.heightMax && (
                        <p className={style.danger}>{errors.heightMax}</p>
                    )}
                </div>
                <div>
                    <label>Weight:</label>
                    <input 
                        className={errors.weightMin && style.danger}
                        type="number"
                        min="1"
                        name="weightMin"
                        placeholder="min"
                        onChange={handleInputChange}
                        value={input.weightMin}
                    />
                    {errors.weightMin && (
                        <p className={style.danger}>{errors.weightMin}</p>
                    )}
                    <input 
                        className={errors.weightMax && style.danger}
                        type="number"
                        min="1"
                        maxlength="3"
                        name="weightMax"
                        placeholder="max"
                        onChange={handleInputChange}
                        value={input.weightMax}
                    />
                    {errors.weightMax && (
                        <p className={style.danger}>{errors.weightMax}</p>
                    )}
                </div>
                <div>
                    <label>Life span:</label>
                    <input 
                        className={errors.life_span && style.danger}
                        autoComplete="off"
                        type="number"
                        min="1"
                        maxlength="2"
                        name="life_span"
                        onChange={handleInputChange}
                        value={input.life_span}
                    />
                    {errors.life_span && (
                        <p className={style.danger}>{errors.life_span}</p>
                    )}
                </div>
                <div>
                <label >Temperaments:</label>
                <select 
                    onChange={(e) => handleSelect(e)}>
                    {temperaments.map((t) =>(
                        <option value={t.name} key={t.id}>{t.name}</option>
                    ))}
                </select>
                    
                <p>{input.temperament.map((e) => (
                    <p>{e}</p>
                ))}</p>
                {errors.temperament && (
                        <p className={style.danger}>{errors.temperament}</p>
                    )}
                </div>
                <button  type='submit'>New Dog!!</button>
            </form>
        </div>
    </div>
};