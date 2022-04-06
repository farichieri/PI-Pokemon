import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getTypes, postPokemon } from '../../actions';
import { useDispatch, useSelector} from 'react-redux';
import styles from './PokemonCreate.module.css'

function validate(input) { // input es mi estado local.
    let errors = {};
    if (!input.name) {
        errors.name = 'Name required'; 
    } else if (!input.hp) {
        errors.hp = 'Hp required';
    }
    return errors;
}

function PokemonCreate() {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Llamo a useHistory igual que al useDispatch.
    const types = useSelector((state) => state.types);
    const [errors, setErrors] = useState({}); // Genero un estado local para los errores (validate(input))

    const [input, setInput] = useState({
        name: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        img: '',
        types: []
    })

    function handleChange(e) { 
        setInput({              // Va a ir cambiando cada vez que modifico mis inputs del formulario.
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({    // Eeteame mi estado errores pasandole la función validate.
            ...input,           // con el estado input
            [e.target.name]: e.target.value // y el e.target.name en el e.target.value.
        }));
        console.log(input);
    }

    // function handleCheck(e) { // Para ejecutar checkboxes
    //     if(e.target.checked) {
    //         setInput({
    //             ...input,
    //             status: e.target.value
    //         })
    //     }
    // }

    function handleSelect(e) {
        console.log(e.target.value)
        setInput({
            ...input,
            types: [...input.types, e.target.value]
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(postPokemon(input))
        alert('Pokemon created!')
        setInput({
            name: '',
            hp: '',
            attack: '',
            defense: '',
            speed: '',
            height: '',
            weight: '',
            img: '',
            types: []
        })
        navigate('/home') // Redirije. Ya se creó el Pk. Llevame al home a ver si está.
    }

    function handleDelete(el) {
        setInput({
            ...input,
            types: input.types.filter(type => type !== el)
        })
    }


    useEffect(() => {
        dispatch(getTypes())
    }, [dispatch]);

return (
    <div className={styles.pokemonCreatePage}>
        <nav className={styles.exitSearchAndCreateNav}>
            <div className={styles.backContainer}>
            <Link to="/home"><h1 className={styles.back}>Home</h1></Link>
            </div>
        </nav>
        
        <div className={styles.pokemonCreateContainer}>
            <div className={styles.pokemonCreate}>
                <h1>Create a new pokemon!</h1>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className={styles.inputContainer}>
                        <label>Name: </label>
                        <input type='text' value={input.name} name='name' onChange={handleChange} className={styles.inputName} />
                        {errors.name && (<p className='error'>{errors.name}</p>)}
                    </div>
                    <div className={styles.inputContainer}>
                        <label>Hp: </label>
                        <input type='text' value={input.hp} name='hp' onChange={handleChange} />
                        <progress max="250" value={input.hp}></progress>
                        {errors.hp && (<p className='error'>{errors.hp}</p>)}
                    </div>
                    <div className={styles.inputContainer}>
                        <label>Attack: </label>
                        <input type='text' value={input.attack} name='attack' onChange={handleChange} />
                        <progress max="250" value={input.attack}></progress>
                    </div>
                    <div className={styles.inputContainer}>
                        <label>Defense: </label>
                        <input type='text' value={input.defense} name='defense' onChange={handleChange} />
                        <progress max="250" value={input.defense}></progress>

                    </div>
                    <div className={styles.inputContainer}>
                        <label>Speed: </label>
                        <input type='text' value={input.speed} name='speed' onChange={handleChange} />
                        <progress max="250" value={input.speed}></progress>
                    </div>
                    <div className={styles.inputContainer}>
                        <label>Height: </label>
                        <input type='text' value={input.height} name='height' onChange={handleChange} />
                        <progress max="250" value={input.height}></progress>
                    </div>
                    <div className={styles.inputContainer}>
                        <label>Weight: </label>
                        <input type='text' value={input.weight} name='weight' onChange={handleChange} />
                        <progress max="250" value={input.weight}></progress>
                    </div>
                    <div className={styles.inputContainer}>
                        <label>Image: </label>
                        <input type='text' value={input.img} name='img' onChange={handleChange} />
                    </div>
                    <div>
                    <div className={styles.inputContainer}>
                        <label>Type:</label>
                        <select onChange={(e) => handleSelect(e)} className={styles.selectTypes} value='disabled'>
                            <option value=''>Select</option>
                            {types.map((t) => (<option key={t.name} value={t.name} className={styles.optionsSelect}>{t.name}</option>))}
                        </select>

                    <div className={styles.typeSelectedContainer}>
                        {input.types.map(el => 
                            <div >
                                <div className={styles.typeSelectedContainerIn}>
                                    <p className={styles.typeSelected}>{el}</p>
                                    <button key={el} className={styles.xButton} onClick={() => handleDelete(el)}>x</button>
                                </div>
                            </div>
                        )}
                    </div>
                    </div>
                        <button className={styles.createButton} type='submit'>Create</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default PokemonCreate