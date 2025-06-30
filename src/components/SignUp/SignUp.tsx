
import { useState } from "react";
import { AppointmentButton } from "../AppointmentButton/AppointmentButton";
import { Input } from "../Input/Input";
import { z } from "zod";
import { ZodError } from "zod/v4";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";
import api from "../../services/api";


const signUpSchema = z.object({
    name: z.string().min(1, { message: "Need to be a name"}),
    email: z.string().email({message: "Need to be a valid email"}),
    password: z.string().min(6, {message:"Need min 6 caracteres to be accepted"}),
    confirmPassword: z.string().min(6, {message: "Need min 6 caracteres to be accepted"})
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords need to be equal",
    path: ["confirmPassword"],
})

export function SignUp(){
    const [isLoading, setIsLoading] = useState(false)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const navigate = useNavigate()


    async function onSubmit(e: React.FormEvent){

        e.preventDefault()

        try {

            setIsLoading(true)

            const data = signUpSchema.parse({
                name,
                email,
                password,
                confirmPassword
            })

            await api.post("/user", data)

            if(confirm("Go to the home page?")){
                navigate("/")
            }
            
        } catch (error) {
            console.log(error)

            if(error instanceof ZodError){
                return alert(error.issues[0].message)
            }

            if(error instanceof AxiosError){
                return alert(error.response?.data.message)
            }

            alert("Not be able to signUp")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="w-screen h-screen bg-white flex flex-col justify-center items-center text-gray-700">
            <main className="bg-black p-8 rounded-md flex items-center  flex-col md:min-w-[462px]">

                <form onSubmit={onSubmit} className="w-full flex flex-col gap-7">

                    <Input type="text" required legend="Nome" placeholder="Digite seu nome" onChange={(e) => setName(e.target.value)} />

                    <Input type="email" required legend="Email" placeholder="Digite seu email" onChange={(e) => setEmail(e.target.value)}/>

                    <Input type="password" required legend="Senha" placeholder="Digite sua senha" onChange={(e) => setPassword(e.target.value)} />

                    <Input type="password" required legend="Confirmar Senha" placeholder="Digite sua senha" onChange={(e) => setConfirmPassword(e.target.value)} />

                    <AppointmentButton type="submit" isLoading={isLoading}>Entrar</AppointmentButton>

                    <a className="w-full flex items-center justify-center text-sm h-5 text-gray-400  hover:text-amber-300 transition ease-linear" href="/">Voltar ao home</a>
                </form>

            </main>
        </div>
    )
}