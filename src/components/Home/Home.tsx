import { Header } from "../Header/Header";

import logo from "../../assets/imgs/Logo (2).png"
import { useState } from "react";
import { SignIn } from "../SignIn/SignIn";

export function Home(){

    const [showSignIn, setShowSignIn] = useState(false)

    return (
        <div className="flex flex-col gap-2 bg-black">
                {!showSignIn && <Header openSigIn={() => setShowSignIn(true)} />}

                {showSignIn && <SignIn />}

            <div className="flex items-center justify-center h-screen">
                {!showSignIn && <img src={logo} alt="logo" className="p-4" />}
            </div>
        </div>
    )
}