
import { AxiosError } from "axios"
import deleteSvg from "../../assets/delete.svg" 
import api from "../../services/api"

type Props = {
    id: string
    name: string
    email: string
    role: string
}

export function BarberDetails({ name, email, role, id }: Props){

    async function deleteBarber(id: string){

        try {

            if(confirm("Delete this user?")){
                await api.delete(`/user/${id}`)
            }
            
        } catch (error) {
            console.log(error)

            if(error instanceof AxiosError){
                return { message: "Don't be possible delete user" }
            }

            return { message: "Don't be possible delete user" }
        }

    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 text-gray-400 p-3 rounded-lg text-sm sm:text-base">
            <p> {name} </p>
            <p> {email} </p>

            <p> {role} </p>
            
            <button className="flex items-center justify-center w-10 rounded-lg bg-red-800 text-white hover:scale-110 transition ease-linear cursor-pointer"onClick={() => deleteBarber(id)}><img className="w-5 h-10" src={deleteSvg} alt="logo de delete"/></button>
        </div>
    )
}