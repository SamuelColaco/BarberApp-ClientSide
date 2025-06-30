
import hairSvg from "../../assets/hair.svg"

import { useAuth } from "../../hooks/useAuth"


export function ClientHeader(){

    const auth = useAuth()
    return (
        <div className="w-full">
            <header className="w-8xl flex items-end justify-end bg-[#273142] p-2">
                <div className="flex items-center justfy-center gap-2 p-1">
                    <img src={hairSvg} alt="logo perfil" className=" w-10 h-10 rounded-[50%]" />
                    <div className="flex flex-col gap-1 p-2">
                        <p className="text-white text-lg"> { auth.session?.user.name ?? "Samuel" } </p>
                        <small className="text-gray-200 text-xs capitalize"> {auth.session?.user.role ?? "Barbeiro"} </small>
                    </div>
                </div>
            </header>
        </div>
    )
}