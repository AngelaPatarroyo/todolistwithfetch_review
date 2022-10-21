import { useState } from 'react';
import './App.css';
import Navbar from './components/navbar';

function App() {
  const [tarea, setTarea] = useState('')///tarea es el valor, setTrea es le valor que t epermite editar el valor de tarea//
  const [listaTareas, setListaTareas] = useState([])

  const submit = (e) => {
    e.preventDefault()//si no ponemos esto se ejecuta la función default, al ponerlo hace lo que le decimos//
    let aux = [...listaTareas]//copia de las tareas, sin los puntos sigue funcionando pero al editar la variable aux estaria editando la variable lista de tareas y podria cambiar todo y no solo la copia //
    aux.push(tarea)//agregamos nuestra tarea al final//
    setListaTareas(aux)//editamos las tareas para el maping. setListaTarea edita el valor de tarea//
    setTarea('')//reinicia el formulario a un string vacio//
  }
  //crear función que reciba el indice del elemento que queremos borrar//
  //en el maping agregar los botones en las ul y el onclick a los botones//

const removeItem = (index)=>{
let aux = [...listaTareas]
let x = aux.filter((element, i)=> i != index)//el filter devuelve un array, el filter remueve el elemento que seleccionamos
setListaTareas(x)
}

  console.log(listaTareas)
  return (
    <div className="App">
      {/* Aquí abajo van mis componentes */}
      <Navbar />
      <form onSubmit={submit}>
        <input value={tarea} type='text' onChange={(e) => setTarea(e.target.value)} />{/* onChange se ejecuta cuando escribimos algo en la caja de texto o cuando interactuamos con la misma e=event e.target.value refleja el valor que escribimos en la caja de texto*/}
      </form>
      <li>
        {listaTareas.map((element, i) => {
          return (

            <ul>
              {element}
              <button type='button' onClick={()=> removeItem(i)}>X</button>
              </ul>)//esto va a mostrar las tareas en la tabla//

        })}
        {/* agregar el boton para borrar por cada maping osea trea agregada */}

      </li>
    </div>
  );
}

export default App;
