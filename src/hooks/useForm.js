import { useState } from "react"



export const useForm = (initialForm) => {       // Recibimos como parametro el objeto con los datos a usar en el form

    const [formState, setFormState] = useState(initialForm)   // Establecemos el estado con el valor inicial del initialForm


    const onInputChange = ({target}) =>{        
        const {name, value} = target       // Se utiliza esta desestructuracion para poder mandarle el nuevo valor a la propiedad     
        setFormState({                  // Actualizamos el valor del formState dependiendo lo que escribamos   
            ...formState,               // en el input
            [name]: value       // Se le actualiza el valor a la propiedad objetivo
        })
    }

    const onResetForm = () =>{
        setFormState(initialForm)
    }



  return {  
    ...formState,       // Crea las propiedades del formulario para ya poder desestructurarlas en nuestro componente y ahorrarnos el paso           
    formState,          // Devolvemos el nuevo objeto con los valores actualizados
    onInputChange,       // Enviamos la funcion para poder actualiza las propiedades
    onResetForm
  }
}