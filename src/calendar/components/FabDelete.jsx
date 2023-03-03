import { useCalendarStore, useUiStore } from "../../hooks"

export const FabDelete = () => {

    const { onStartDeletingEvent, hasEventSelected } = useCalendarStore()
    const { isDateModalOpen } = useUiStore()

    const handleDelete = () => {
        onStartDeletingEvent()
    }

    return (
        <button
            className="btn btn-danger fab-delete"
            onClick={ handleDelete }
            style={{
                // si hay un evento seleccionado y el modal esta cerrado, se muestra el boton
                display: (hasEventSelected)   
                    ? (isDateModalOpen)
                        ? 'none'
                        : ''
                    : 'none'
            }}
        >
            <i className="fas fa-trash-alt"></i>
        </button>
    )
}
