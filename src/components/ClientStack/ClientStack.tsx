import { useAuth } from "../../hooks/useAuth"

export function ClientStack(){

    const auth = useAuth()

    function logout(){
        if(confirm("Logout?")){
            auth.remove()
        }
    }

    return (
        <div className="w-full">
            <div className="h-auto bg-[#273142] flex flex-col gap-3 text-center">
                <h2 className="text-white text-center font-bold text-2xl p-4">ClientStack</h2>

                    <div className="flex flex-col items-center gap-3 text-white border-b border-[#E0E0E0] p-1 ">
                        <a className="py-3 px-15  hover:bg-[#4880FF] rounded-lg hover:border-[#4880FF] transition ease-linear  " href="/">Appointments</a>
                        <a className="py-3 px-15  hover:bg-[#4880FF] rounded-lg hover:border-[#4880FF] transition ease-linear  " href="/user">Check Appointments</a>
                        <a className="py-3 px-15 rounded-lg hover:bg-red-700  hover:border-[#4880FF] transition ease-linear" href="/" onClick={logout}>Logout</a>
                </div>
            </div>
        </div>
    )
}