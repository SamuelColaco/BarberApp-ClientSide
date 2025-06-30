import type { ReactNode } from "react"

type Props = {
    isOpen: boolean
    onClose: () => void
    children: ReactNode
}
export function AddNewBarber({ isOpen, onClose, children }: Props){

    if(!isOpen){
        return null
    }

    return (
        <div>
            <div className="fixed inset-0 bg-gray-400 bg-opacity-70 backdrop-blur-sm z-50" onClick={onClose} />

             <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-50 w-11/12 max-w-md">
                {children}
            </div>
        </div>
    )
}