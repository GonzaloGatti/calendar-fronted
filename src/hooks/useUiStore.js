import { useDispatch, useSelector } from "react-redux"
import { onCloseDateModal, onOpenDateModal } from "../store/ui/uiSlice"

export const useUiStore = () => {
  
    const dispatch = useDispatch()

    const { isDateModalOpen } = useSelector( state => state.ui )

    const openDataModalFn = () => {
        dispatch( onOpenDateModal() )
    }

    const closeDataModalFn = () => {
        dispatch( onCloseDateModal() )
    }

    return {
        // Propiedades
        isDateModalOpen,

        // Métodos
        openDataModalFn,
        closeDataModalFn
    }
}
