import { useEffect, useState } from 'react'

import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { useUiStore, useCalendarStore, useAuthStore } from '../../hooks'

import { getMessagesES, localizer } from '../../helpers'
import { Navbar, CalendarEventBox, CalendarModal, FabAddNew, FabDelete } from "../components"

export const CalendarPage = () => {
  
  const { user } = useAuthStore()
  const { openDataModalFn } = useUiStore()
  const { events, onSetActiveEvent, onStartLoadingEvents } = useCalendarStore()

  // extraemos el valor del view del localStorage y lo almacenamos en el state para enviarselo al calendar (defaultView)
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')
  
  const eventStyleGetter = ( event, start, end, isSelected ) => {

    const isMyEvent = ( user.uid === event.user._id ) || ( user.uid === event.user.uid)

    const style = {
      backgroundColor: isMyEvent ? '#347CF7' : '#465660',
      borderRadius: '5px',
      color: 'white'
    }
    return {
      style
    }
  }

  // esta funcion llama al método de nuestro custom hook (useUiStore) para abrir el modal
  const onDobleClickEvent = () => {
    openDataModalFn()
  }
  
  const onSelectEvent = ( activeEv ) => {
    onSetActiveEvent(activeEv)
  }
  
  // esta funcion se ejecutará cada vez que cambien el view (mes, semana, dia o agenda)
  const onViewEvent = ( event ) => {
    // almacenamos en el localStorage el valor actual del view 
    localStorage.setItem('lastView', event);
    setLastView( event )
  }

  useEffect(() => {
    onStartLoadingEvents()
  }, [])
  
  return (
    <>
      <Navbar/>

      <Calendar
        // Calendario en español
        culture='es'
        messages={getMessagesES()}
        
        localizer={ localizer }
        events={ events }
        defaultView={ lastView }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)', padding: 10 }}
        components= {{
          event: CalendarEventBox
        }}
        // Eventos
        eventPropGetter={ eventStyleGetter }
        onDoubleClickEvent={ onDobleClickEvent }
        onSelectEvent={ onSelectEvent }
        onView={ onViewEvent }
      />

      <CalendarModal />

      <FabAddNew />
      <FabDelete />
      
    </>
  )
}
