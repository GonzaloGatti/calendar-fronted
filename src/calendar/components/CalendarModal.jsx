import { useState, useMemo, useEffect } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';

import Modal from 'react-modal';
import DatePicker, { registerLocale } from "react-datepicker";
import es from 'date-fns/locale/es';
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2';
import { useUiStore } from '../../hooks/useUiStore';
import { useCalendarStore } from '../../hooks/useCalendarStore';

registerLocale('es', es)

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {

    // obtenemos la nota activa del store
    const { activeEvent, onStartSavingEvent } = useCalendarStore()
    const { isDateModalOpen, closeDataModalFn } = useUiStore()
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [formValues, setFormValues] = useState({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours(new Date(), 2)
    })

    // al enviar el form, si no hay titulo se le agrega la clase is-invalid para resaltarlo en rojo y no se envia
    const titleClass = useMemo(() => {
        // si el formulario todavía no se envio (formSubmitted en false), no se le agrega ninguna clase
        if ( !formSubmitted ) return '';
        // si ya se envió y el titulo esta vacío, se le agrega la clase is-invalid, sino no se agrega nada
        return ( formValues.title.length <= 0) 
            ? 'is-invalid'
            : ''
    }, [ formValues.title, formSubmitted])

    // cada vez que cambie la nota activa actualizamos el valor del state (formValues) con la nueva nota activa
    useEffect(() => {
      if( activeEvent !== null){
        setFormValues({ ...activeEvent })
      }
    }, [ activeEvent ])
    

    // esta función llama al método de nuestro custom hook para cerrar el modal
    const onCloseModal = () => {
        closeDataModalFn()
    }

    const onInputChanged = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const onDateChanged = (event, changed) => {
        setFormValues({
            ...formValues,
            [changed]: event
        })
    }

    // función al enviar el formulario
    const onSubmit = async (event) => {

        event.preventDefault()

        setFormSubmitted(true)

        // determina la diferencia entre el fin y el inicio del evento
        const difference = differenceInSeconds(formValues.end, formValues.start);
        // evalúa si la diferencia entre el fin e inicio del evento es valida y sigue con la funcion o lanza un modal error
        if ( isNaN(difference) || difference <= 0 ){
            Swal.fire('Fecha incorrecta', 'Revise las fechas ingresadas', 'error')
            return;
        };

        // evalúa si el título del formulario esta vacio, si lo esta no se envía. Sino, sigue con el curso de la función
        if ( formValues.title.length <= 0 ) return;

        // se comienza a guardar el evento, ya sea si se actualizó uno viejo o si se esta creando uno nuevo
        await onStartSavingEvent(formValues)

        // se cierra el modal
        closeDataModalFn()

        setFormSubmitted(false)
    }

    return (
        <Modal
            // se toma la propiedad de nuestro custom hook (useUiStore), la cual es un valor boleano
            isOpen={ isDateModalOpen }

            onRequestClose={ onCloseModal }

            // estilos y clases
            style={ customStyles }
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={ 200 }
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form className="container" onSubmit={ onSubmit }>

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DatePicker 
                        className='form-control' 
                        selected={ formValues.start }
                        onChange={ (event) => onDateChanged(event, 'start') }
                        minDate={ new Date()}
                        dateFormat='Pp'
                        showTimeSelect
                        locale="es"
                        timeCaption='Hora'
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker 
                        className='form-control' 
                        selected={ formValues.end }
                        onChange={ (event) => onDateChanged(event, 'end') }
                        minDate={ formValues.start }
                        dateFormat='Pp'
                        showTimeSelect
                        locale="es"
                        timeCaption='Hora'
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={`form-control ${titleClass}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={ formValues.title }
                        onChange={ onInputChanged }
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={ formValues.notes }
                        onChange={ onInputChanged }
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
