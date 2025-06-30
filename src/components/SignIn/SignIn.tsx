import { useActionState, useState } from "react";
import { AppointmentButton } from "../AppointmentButton/AppointmentButton";
import { Input } from "../Input/Input";
import { z, ZodError } from "zod";
import { AxiosError } from "axios";
import { useAuth } from "../../hooks/useAuth";
import api from "../../services/api";
import { useNavigate } from "react-router";


export function SignIn(){


    const signInSchema = z.object({
        email: z.string().email({ message: "Need to be a valid email"}),
        password: z.string().trim().min(6, { message: "Need min 6 caracteres"})
    })


    const [state, formAction, isLoading] = useActionState(onSignIn, null)

    const auth = useAuth()

    const navigate = useNavigate()


    async function onSignIn(prevState:any, formData: FormData){

        try {

            const data = signInSchema.parse({
                email: formData.get("email"),
                password: formData.get("password")

            })

            const response = await api.post("/session", data)

            auth.save(response.data.token)

            navigate("/")
            
        } catch (error) {
            console.log(error)

            if(error instanceof ZodError){
                return { message: error.issues[0].message } 
            }

            if(error instanceof AxiosError){
                return { message: error.response?.data.message }
            }

            return { message: "Dont be possible signIn"}
        }
     
    }

    return (
        <div className="w-screen h-screen bg-white flex flex-col justify-center items-center text-gray-700">
            <main className="bg-black p-8 rounded-md flex items-center  flex-col md:min-w-[462px]">

                <h1 className="text-white text-3xl py-5 uppercase">First Make Your Login</h1>

                <form action={formAction} className="w-full flex flex-col gap-7">
                    <Input name="email" type="email" required legend="Email" placeholder="Digite seu email" />

                    <Input name="password" type="password" required legend="Senha" placeholder="Digite sua senha"  />

                    {state && <p className="text-sm text-red-600 text-center my-4 font-bold"> {state.message} </p>
}
                    <AppointmentButton type="submit" isLoading={isLoading}>Entrar</AppointmentButton>

                    <a className="w-full flex items-center justify-center text-sm h-5 text-gray-400  hover:text-amber-300 transition ease-linear" href="/signup">Criar Conta</a>
                </form>

            </main>
        </div>
    )
}