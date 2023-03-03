import { addHours } from "date-fns"
import { useSelector } from "react-redux"
import { useCalendarStore, useUiStore } from "../../hooks"

export const FabAddNew = () => {

    const { user } = useSelector( state => state.auth)

    const { openDataModalFn } = useUiStore()
    const { onSetActiveEvent } = useCalendarStore()

    const handleNewEvent = () => {
        // establece el nuevo evento activo (el que se ve en el modal)
        onSetActiveEvent({         
            title: '',
            notes: '',
            start: new Date(),
            end: addHours( new Date(), 2),
            user: {
                name: user.name,
                uid: user.id
            }
        })
        // abre el modal con la información de arriba (modal vacio, nuevo, sin info)
        openDataModalFn()
    }

    return (
        <button
            className="btn btn-primary fab"
            onClick={ handleNewEvent }
        >
            <i className="fas fa-plus"></i>
        </button>
    )
}
