import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

// evento ejemplo creado por nosotros
// const tempEvent = {
//     // el id provendrá del backend
//     _id: new Date().getTime(),
//     title: 'Mi cumpleaños',
//     notes: 'Comprar regalo',
//     start: new Date(),
//     end: addHours( new Date(), 2),
//     user: {
//       name: 'Gonzalo'
//     }
// }

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        isLoadingEvents: true,
        events: [],
        activeEvent: null
    },
    reducers: {
        // este reducer establece el evento activo
        setActiveEvent: (state, { payload } ) => {
            state.activeEvent = payload;
        },
        // este reducer guarda el nuevo evento y borra el activo (ya que se cierra el modal al guardarlo)
        addNewEvent: (state, { payload }) => {
            state.events.push(payload)
            state.activeEvent = null
        },
        // este reducer actualiza el evento activo (seleccionado)
        updateEvent: (state, { payload }) => {
            // recorremos todos los eventos, hasta machear con el id, y lo reemplazamos con la nueva informacion (actualizado)
            state.events = state.events.map(event => {
                if ( event.id === payload.id ){
                    return payload
                }
                return event
            })
        },
        loadEvents: (state, { payload = [] }) => {
            state.isLoadingEvents = false,
            // barremos el array de eventos del payload (provenientes del backend)
            payload.forEach(event => {
                // comprobamos si el evento ya existe en el array mediante el id
                const exist = state.events.some(dbEvent => dbEvent.id === event.id)
                // si no existe lo agregamos a dicho array
                if ( !exist ) {
                    state.events.push( event )
                }
            })
        },
        deleteEvent: (state) => {
            if ( state.activeEvent ) {
                state.events = state.events.filter(event => event.id !== state.activeEvent.id)
                state.activeEvent = null
            }
        },
        onLogoutCalendar: (state) => {
            state.isLoadingEvents = true
            state.events = [],
            state.activeEvent = null
        }
    }
});


// Action creators are generated for each case reducer function
export const { setActiveEvent, addNewEvent, updateEvent, loadEvents, deleteEvent, onLogoutCalendar } = calendarSlice.actions;