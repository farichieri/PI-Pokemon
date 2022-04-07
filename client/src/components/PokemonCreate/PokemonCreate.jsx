import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getPokemons, getTypes, postPokemon } from '../../actions';
import { useDispatch, useSelector} from 'react-redux';
import styles from './PokemonCreate.module.css'

function validate(input) { // input es mi estado local.
    let errors = {};
    if (!input.name || !/^[a-zA-Z]+$/.test(input.name)) {
        errors.name = 'Name required and only letters are accepted'; 
    } if (!input.hp || !/^0*([0-9]|[1-8][0-9]|9[0-9]|1[0-9]{2}|2[0-4][0-9]|250)$/.test(input.hp)) {
        errors.hp = 'Hp required (250 max)';
    } if (!input.attack || !/^0*([0-9]|[1-8][0-9]|9[0-9]|1[0-9]{2}|2[0-4][0-9]|250)$/.test(input.attack)) {
        errors.attack = 'Attack required (250 max)';
    } if (!input.defense || !/^0*([0-9]|[1-8][0-9]|9[0-9]|1[0-9]{2}|2[0-4][0-9]|250)$/.test(input.defense)) {
        errors.defense = 'Defense required (250 max)';
    } if (!input.speed || !/^0*([0-9]|[1-8][0-9]|9[0-9]|1[0-9]{2}|2[0-4][0-9]|250)$/.test(input.speed)) {
        errors.speed = 'Speed required (250 max)';
    } if (!input.height || !/^0*([0-9]|[1-8][0-9]|9[0-9]|1[0-9]{2}|2[0-4][0-9]|250)$/.test(input.height)) {
        errors.height = 'Height required (250 max)';
    } if (!input.weight || !/^0*([0-9]|[1-8][0-9]|9[0-9]|1[0-9]{2}|2[0-4][0-9]|250)$/.test(input.weight)) {
        errors.weight = 'Weight required (250 max)';
    } if (!input.img || !/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(input.img)) {
        errors.img = 'Link Image required';
    } if (input.types.length === 0 || input.types.length > 2) {
        errors.types = 'Type required and must be max 2';
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
        setErrors(validate({    // Seteame mi estado errores pasandole la función validate.
            ...input,           // con el estado input
            [e.target.name]: e.target.value // y el e.target.name en el e.target.value.
        }));
    }

    function handleSelect(e) {
        setErrors(validate({    
            ...input,          
            types: [...input.types, e.target.value ]
        }));
        if (input.types.length < 2) {
            setInput({
                ...input,
                types: [...input.types, e.target.value]
            })
        }
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
        // dispatch(getPokemons()) // evita duplicacion de pokemons
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
                        <input type='text' value={input.name} name='name' placeholder='Name' onChange={handleChange} className={styles.inputName} required />
                        <span>{errors.name && (<p className='error'>{errors.name}</p>)}</span>
                    </div>
                    <div className={styles.inputContainer}>
                        <label>Hp: </label>
                        <input type='number' value={input.hp} name='hp' placeholder='Hp'max="250" min="0" onChange={handleChange} />
                        <progress max="250" value={input.hp}></progress>
                        <span>{errors.hp && (<p className='error'>{errors.hp}</p>)}</span>
                    </div>
                    <div className={styles.inputContainer}>
                        <label>Attack: </label>
                        <input type='number' value={input.attack} name='attack' placeholder='Attack' max="250" min="0" onChange={handleChange} />
                        <progress max="250" value={input.attack}></progress>
                        <span>{errors.attack && (<p className='error'>{errors.attack}</p>)}</span>
                    </div>
                    <div className={styles.inputContainer}>
                        <label>Defense: </label>
                        <input type='number' value={input.defense} name='defense' placeholder='Defense' max="250" min="0" onChange={handleChange} />
                        <progress max="250" value={input.defense} ></progress>
                        <span>{errors.defense && (<p className='error'>{errors.defense}</p>)}</span>
                    </div>
                    <div className={styles.inputContainer}>
                        <label>Speed: </label>
                        <input type='number' value={input.speed} name='speed' placeholder='Speed' max="250" min="0" onChange={handleChange} />
                        <progress max="250" value={input.speed}></progress>
                        <span>{errors.speed && (<p className='error'>{errors.speed}</p>)}</span>
                    </div>
                    <div className={styles.inputContainer}>
                        <label>Height: </label>
                        <input type='number' value={input.height} name='height' placeholder='Height' max="250" min="0" onChange={handleChange} />
                        <progress max="250" value={input.height}></progress>
                        <span>{errors.height && (<p className='error'>{errors.height}</p>)}</span>
                    </div>
                    <div className={styles.inputContainer}>
                        <label>Weight: </label>
                        <input type='number' value={input.weight} name='weight'  placeholder='Weight'  max="250" min="0" onChange={handleChange} />
                        <progress max="250" value={input.weight}></progress>
                        <span>{errors.weight && (<p className='error'>{errors.weight}</p>)}</span>
                    </div>
                    <div className={styles.inputContainer}>
                        <label>Type:</label>
                        <select onChange={(e) => handleSelect(e)} className={styles.selectTypes} value='disabled'>
                            <option value=''>Select</option>
                            {types.map((t) => (<option key={t.name} value={t.name} className={styles.optionsSelect}>{t.name}</option>))}
                        </select>
                        <span>{errors.types && (<p className='error'>{errors.types}</p>)}</span>

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
                    <div className={styles.inputContainer}>
                        <label>Image: </label>
                        <input type='text' value={input.img} name='img' placeholder='Link' onChange={handleChange} oninput="pic.src=window.URL.createObjectURL(this.files[0])"/>
                        <img src={input.img} />
                        <span>{errors.img && (<p className='error'>{errors.img}</p>)}</span>
                    </div>
                        <button className={styles.createButton} type='submit' disabled={errors.name || errors.hp || errors.attack || errors.defense || errors.speed || errors.height || errors.weight || errors.img || errors.types || input.name === '' ? true : false } >Create</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default PokemonCreate