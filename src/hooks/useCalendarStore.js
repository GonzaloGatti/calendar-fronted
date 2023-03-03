import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2"
import { calendarAPI } from "../api"
import { convertEventsToDate } from "../helpers"
import { addNewEvent, deleteEvent, loadEvents, setActiveEvent, updateEvent } from "../store"

export const useCalendarStore = () => {
  
    const dispatch = useDispatch()
    const { events, activeEvent } = useSelector( state => state.calendar )
    const { user } = useSelector( state => state.auth)

    // despacha la action del calendarSlice enviandole el active event, que puede ser uno nuevo, o uno ya creado (para actualizar)
    const onSetActiveEvent = (activeEv) => {
        dispatch(setActiveEvent(activeEv))
    }

    // esta funcion comienza a guardar el evento activo
    const onStartSavingEvent = async (newEvent) => {

        try {
            // si el id del evento existe, significa que dicho evento ya existe y queremos actualizarlo
            if ( newEvent.id ){
                // actualizar
                await calendarAPI.put(`/events/${newEvent.id}`, newEvent)           
                dispatch(updateEvent({...newEvent, user}))
                return
            } else {
                // si el id no existe, estamos creado un nuevo evento, por lo que debemos agregarle su id. Luego, despachamos
                // la action que lo agrega al array de eventos
                const { data } = await calendarAPI.post('/events', newEvent)
                dispatch(addNewEvent({ ...newEvent, id: data.evento.id, user }))
            }
        } catch (error) {
            Swal.fire('Error al guardar', error.response.data.msg, 'error')
        }
    }

    const onStartLoadingEvents = async () =>{
        try {   
            // obtenemos los eventos del backend
            const { data } = await calendarAPI.get('/events')
            // usamos este helper para transformar las fechas a formato ISO
            const eventsWithCorrrectDate = convertEventsToDate(data.eventos)
            //
            dispatch(loadEvents(eventsWithCorrrectDate));
        } catch (error) {
            console.log('Error al cargar eventos');
        }
    }

    const onStartDeletingEvent = async () => {

        try {
            await calendarAPI.delete(`/events/${activeEvent.id}`)
            dispatch(deleteEvent())
        } catch (error) {
            Swal.fire('Error al eliminar', error.response.data.msg, 'error')
        }
    }

    return {
        // propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        // métodos
        onSetActiveEvent,
        onStartSavingEvent,
        onStartLoadingEvents,
        onStartDeletingEvent
    }

}
