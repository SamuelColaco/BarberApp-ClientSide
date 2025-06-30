import { useEffect, useState } from "react";
import { ClientDetails } from "../ClientDetails/ClientDetails";
import { AxiosError } from "axios";
import api from "../../services/api";

interface Client{
    id: string
    name: string
    email: string
    role: "client"
}
export function ClientView(){

    const [client, setClient] = useState<Client[]>([])

    useEffect(() => {
        async function axiosClient(){
            try {
                
                const response = await api.get("/user")

                const filteredClient = response.data.message.filter((client: Client) => client.role === "client" )

                setClient(filteredClient)

            } catch (error) {
                console.log(error)

                if(error instanceof AxiosError){
                    return { message: "Don't be possible view the clients"}
                }

                return { message: "Don't be possible view clients"}
            }
        }

        axiosClient()
    }, [])

    return (
        <div>
            
            <h1 className="text-5xl text-white p-4 font-bold">Clients</h1>

            <div className="bg-[#273142] rounded-lg p-5">
                <div className="text-white text-3xl p-3">
                    <h2>Clients Details</h2>
                </div>
                <div className="grid grid-cols-2 bg-[#323D4E] text-white rounded-lg p-3 ">
                    <p>Name</p>
                    <p>Email</p>
                </div>
                {client.length > 0 ? (
                    client.map((client) => (
                        <ClientDetails key={client.id} name={client.name} email={client.email} />
                    ))
                        ) : (
                            <div className="text-gray-400 p-4 text-3xl text-center">No clients found</div>
                    )}
            </div>

        </div>
    )
}