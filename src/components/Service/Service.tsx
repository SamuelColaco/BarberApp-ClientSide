import { Header } from "../Header/Header";
import { ServiceBox } from "../ServiceBox/ServiceBox";

import hairSvg from "../../assets/hair.svg"
import bigodeSvg from "../../assets/bigode.svg"
import scissorSvg from "../../assets/scissor.svg"
import beardSvg from "../../assets/beard.svg"
import facialSvg from "../../assets/facial.svg"
import hairScissorSvg from "../../assets/hairScissor.svg"
import { useState } from "react";
import { SignIn } from "../SignIn/SignIn";

export function Service(){

    const [showSignIn, setShowSignIn] = useState(false)
    return (
        <div className=" text-white bg-black">
            {!showSignIn && <Header openSigIn={() => setShowSignIn(true) } />}
            <div className=" flex flex-col items-center justify-center">

                
                {showSignIn && <SignIn />}

                {!showSignIn &&  <h1 className="text-5xl pb-7">SERVICES</h1>}

                {!showSignIn && 

                <div className="flex items-center justify-center flex-wrap gap-5 p-4 ">
                    <ServiceBox image={hairSvg} title="Hair Styling" description="Cortes de cabelo com os melhores barbeiros" />
                    <ServiceBox image={scissorSvg} title="Hair Cut & Beard Trim" description="Cortes de cabelo com os melhores barbeiros" />
                    <ServiceBox image={beardSvg} title="Facial & Shave" description="Cortes de barba com os melhores barbeiros" />
                    <ServiceBox image={bigodeSvg} title="Mustache Trimming" description="Cortes de bigode com os melhores barbeiros" />
                    <ServiceBox image={facialSvg} title="Facial" description="Cortes de cabelo com os melhores barbeiros" />
                    <ServiceBox image={hairScissorSvg} title="Shaves & Haircut" description="Cortes de cabelo com os melhores barbeiros" />
                </div> }
            
            </div>
        </div>
    )
}