import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/navbar';

function App() {
  const [tarea, setTarea] = useState('')///tarea es el valor, setTrea es le valor que t epermite editar el valor de tarea//
  const [listaTareas, setListaTareas] = useState([])
  const [refresh, setRefresh] = useState(false)

  const submit = (e) => {
    e.preventDefault()//si no ponemos esto se ejecuta la función default, al ponerlo hace lo que le decimos//
    let aux = [...listaTareas]//copia de las tareas, sin los puntos sigue funcionando pero al editar la variable aux estaria editando la variable lista de tareas y podria cambiar todo y no solo la copia //
    aux.push({label: tarea, done: false})//agregamos nuestra tarea al final//
    updateData(aux)//editamos las tareas para el maping. setListaTarea edita el valor de tarea//
    setTarea('')//reinicia el formulario a un string vacio//
  }
  //crear función que reciba el indice del elemento que queremos borrar//
  //en el maping agregar los botones en las ul y el onclick a los botones//

  const removeItem = (index) => {
    let aux = [...listaTareas]
    let x = aux.filter((element, i) => i != index)//el filter devuelve un array, el filter remueve el elemento que seleccionamos
    updateData(x)
  }

  useEffect(() => {
    fetch("http://assets.breatheco.de/apis/fake/todos/user/angelap86")
      .then((resp) => resp.json())
      .then((data) => setListaTareas(data))// data representa el dato de la respuesta, puede ser cualquier cosa//
  }, [refresh])//cada vez que la variable cambie va a ejecutar el efecto//
  console.log(listaTareas)

  const updateData = (array) => {
    fetch("http://assets.breatheco.de/apis/fake/todos/user/angelap86", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },/* siempre va a ser asi cuando mande un json */
      body: JSON.stringify(array)
    })
      .then((resp) => resp.json())
      .then(() => {
        /* actualizar data */
        setRefresh(prev => !prev)/* negar el valor que tenia antes, prev=refresh */
        /* setRefresh(!refresh)*/
        
      })

  }

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
              {element.label}
              <button type='button' onClick={() => removeItem(i)}>X</button>
            </ul>)//esto va a mostrar las tareas en la tabla//

        })}
        {/* agregar el boton para borrar por cada maping osea trea agregada */}

      </li>
    </div>
  );
}

export default App;
