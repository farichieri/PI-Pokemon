import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getTypes, postPokemon } from '../actions';
import { useDispatch, useSelector} from 'react-redux';

function PokemonCreate() {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Llamo a useHistory igual que al useDispatch.
    const types = useSelector((state) => state.types);

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

    function handleChange(e) { // Va a ir cambiando cada vez que modifico mis inputs del formulario.
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
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
        setInput({
            ...input,
            types: [...input.types, e.target.value]
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(input);
        dispatch(postPokemon(input))
        alert('Pokemon created broodiii!!')
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

    useEffect(() => {
        dispatch(getTypes())
    }, []);

  return (
      <div>
          <Link to='/home'><button>Back</button></Link>
          <h1>Create your pokemon!</h1>
          <form onSubmit={(e) => handleSubmit(e)}>
              <div>
                  <label>Name:</label>
                  <input type='text' value={input.name} name='name' onChange={handleChange} />
              </div>
              <div>
                  <label>Hp:</label>
                  <input type='text' value={input.hp} name='hp' onChange={handleChange} />
              </div>
              <div>
                  <label>Attack:</label>
                  <input type='text' value={input.attack} name='attack' onChange={handleChange} />
              </div>
              <div>
                  <label>Defense:</label>
                  <input type='text' value={input.defense} name='defense' onChange={handleChange} />
              </div>
              <div>
                  <label>Speed:</label>
                  <input type='text' value={input.speed} name='speed' onChange={handleChange} />
              </div>
              <div>
                  <label>Height:</label>
                  <input type='text' value={input.height} name='height' onChange={handleChange} />
              </div>
              <div>
                  <label>Weight:</label>
                  <input type='text' value={input.weight} name='weight' onChange={handleChange} />
              </div>
              <div>
                  <label>Image:</label>
                  <input type='text' value={input.img} name='img' onChange={handleChange} />
              </div>
              <div>
                  <select onChange={(e) => handleSelect(e)}>
                      {types.map((t) => (
                          <option value={t.name}>{t.name}</option>
                       ))}
                  </select>
                  <ul><il>{input.types.map(el => el + " ,")}</il></ul> 

                  <button type='submit'>Create Pokemon</button>
              </div>
          </form>
      </div>
  )
}

export default PokemonCreate