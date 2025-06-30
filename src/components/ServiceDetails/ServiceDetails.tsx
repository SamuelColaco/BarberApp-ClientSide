

import { AxiosError } from "axios"
import deleteSvg from "../../assets/delete.svg"
import api from "../../services/api"

type Props = {
    id: string
    name: string
    price: number
}

export function ServiceDetails({ name, price, id }: Props){

    async function deleteService(id: string){
        try {
            if(confirm("Delete this service?")){
            await api.delete(`/service/${id}`)
        }
            
        } catch (error) {
            console.log(error)

            if(error instanceof AxiosError){
                return { message: "Don't possible delete service"}
            }

            return { message: "Don't possible delete service" }
        }
     
    }
    return (
      <div className="grid grid-cols-3 text-gray-400 p-3 rounded-lg">
            <p> {name} </p>
            <p> {price} </p>

            <button className="flex items-center justify-center w-10 rounded-lg bg-red-800 text-white hover:scale-110 transition ease-linear cursor-pointer"onClick={() => deleteService(id)}><img className="w-5 h-10" src={deleteSvg} alt="logo de delete"/></button>
        </div>
    )
}