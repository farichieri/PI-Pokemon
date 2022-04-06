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
                    <div>
                        <label>Name: </label>
                        <input type='text' value={input.name} name='name' onChange={handleChange} />
                        {errors.name && (<p className='error'>{errors.name}</p>)}
                    </div>
                    <div>
                        <label>Hp: </label>
                        <input type='text' value={input.hp} name='hp' onChange={handleChange} />
                        <h3>Hp:</h3><progress max="250" value={input.hp}></progress>
                        {errors.hp && (<p className='error'>{errors.hp}</p>)}
                    </div>
                    <div>
                        <label>Attack: </label>
                        <input type='text' value={input.attack} name='attack' onChange={handleChange} />
                    </div>
                    <div>
                        <label>Defense: </label>
                        <input type='text' value={input.defense} name='defense' onChange={handleChange} />
                    </div>
                    <div>
                        <label>Speed: </label>
                        <input type='text' value={input.speed} name='speed' onChange={handleChange} />
                    </div>
                    <div>
                        <label>Height: </label>
                        <input type='text' value={input.height} name='height' onChange={handleChange} />
                    </div>
                    <div>
                        <label>Weight: </label>
                        <input type='text' value={input.weight} name='weight' onChange={handleChange} />
                    </div>
                    <div>
                        <label>Image: </label>
                        <input type='text' value={input.img} name='img' onChange={handleChange} />
                    </div>
                    <div>
                        <select onChange={(e) => handleSelect(e)}>
                            {types.map((t) => (
                                <option key={t.name} value={t.name}>{t.name}</option>
                            ))}
                        </select>
                        {/* <ul><li>{input.types.map(el => el + " ,")}</li></ul>  */}

                        <button type='submit'>Create Pokemon</button>
                    </div>
                </form>
            </div>
            {input.types.map(el => 
            <div>
                <p>{el}</p>
                <button key={el} className='buttonX' onClick={() => handleDelete(el)}>x</button>
            </div>)}
        </div>
    </div>
  )
}

export default PokemonCreate