import {useState, useEffect} from 'react';
import Error from './error';

function Formulario({pacientes, setPacientes, paciente, setPaciente}) {

  //Es state se declara en la parte superior del componente
  const [nombre, setNombre] = useState('');//-> variable, set modificador valore inicial del estado
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');

  //Revisa cuanso el componente puede cambiar
  useEffect(() => {
    if (Object.keys(paciente).length > 0) {
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(paciente.fecha);  
      setSintomas(paciente.sintomas);
    }
  }, [paciente]);//-> Se ejecuta solo cuando la dependencia cambia(parametro), y ejecuta el rerender

  //Revisa cuando el componene haya cargado
  // useEffect(() => {
  //   console.log('El compinente esta')
  // }, []);//-> Si va vacio revisa por la carga del componente

  const generarID = () =>{
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36);

    return random + fecha;
  };

  const [error, setError] = useState(false); 

  const handleSubmit = e => {
    e.preventDefault();

    //Validacion Formulario
    if([nombre, propietario, email, fecha, sintomas].includes('')){
      setError(true);
      return;
    }

    setError(false);

    //Objeto de Paciente
    const objPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas
    }

    if(paciente.id) {
      //Editando Registro
      objPaciente.id = paciente.id;

      //Recorre hasta encontrar un id igual
      const pacientesActualizados = pacientes.map( pacienteState => 
        pacienteState.id === paciente.id ? objPaciente : pacienteState
      );

      setPacientes(pacientesActualizados);//Actualiza valor
      setPaciente({});//Resetea state

    }else{
      //Nuevo Registro
      objPaciente.id = generarID();
      setPacientes([...pacientes, objPaciente]);
    }

    //Reiniciar el Form
    setNombre('');
    setPropietario('');
    setEmail('');
    setFecha('');
    setSintomas('');
  }

  return (
    <div className='md:w-1/2 lg:w-2/5'>

        <h2 className='font-black text-3xl text-center'>Seguimiento Pacientes</h2>

        <p className='text-lg mt-5 text-center mb-10'>
          Añade pacientes y {''}
          <span className='text-indigo-600 font-bold'>Administralos</span>
        </p>

        <form 
          onSubmit={handleSubmit}
          className='bg-white shadow-md rounded-lg py-10 px-5 mb-10 m-8'
        >

          {error && <Error><p>Todos los campos son obligatorios</p></Error>}

          <div className='mb-5'>
            <label htmlFor='mascota' className='block text-gray-700 uppercase font-bold'>
              Nombre Mascota
            </label>

            <input
              id='mascota'
              type='text' 
              placeholder='Nombre de la mascota'
              className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
              value={nombre}
              onChange={ e => setNombre(e.target.value) }
            />
          </div>

          <div className='mb-5'>
            <label htmlFor='propietario' className='block text-gray-700 uppercase font-bold'>
              Nombre Propietario
            </label>

            <input
              id='propietario'
              type='text' 
              placeholder='Nombre del Propietario'
              className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
              value={propietario}
              onChange={ e => setPropietario(e.target.value) }
            />
          </div>
          
          <div className='mb-5'>
            <label htmlFor='email' className='block text-gray-700 uppercase font-bold'>
              Email
            </label>

            <input
              id='email'
              type='email' 
              placeholder='Tu correo'
              className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
              value={email}
              onChange={ e => setEmail(e.target.value) }
            />
          </div>

          <div className='mb-5'>
            <label htmlFor='alta' className='block text-gray-700 uppercase font-bold'>
              Email
            </label>

            <input
              id='alta'
              type='date'
              className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
              value={fecha}
              onChange={ e => setFecha(e.target.value) }
            />
          </div>

          <div className='mb-5'>
            <label htmlFor='sintomas' className='block text-gray-700 uppercase font-bold'>
              Email
            </label>

            <textarea 
              id="sintomas"
              className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
              placeholder='Decribe los Sintomas'
              value={sintomas}
              onChange={ e => setSintomas(e.target.value) }
            />
          </div>

          <input
            type='submit'
            className='bg-indigo-600 w-full p-3  text-white uppercase 
              hover:bg-indigo-700 cursor-pointer transition-colors font-bold' 
            value={paciente.id ? 'Guardar Cambios' : 'Agregar Paciente'}
          />
        </form>
    </div>
  )
}

export default Formulario