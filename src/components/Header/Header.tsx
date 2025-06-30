
import { useState } from "react"
import iconSvg from "../../assets/scissor.svg"
import { AppointmentButton } from "../AppointmentButton/AppointmentButton"

interface Props {
    openSigIn: () => void
}

export function Header({ openSigIn }: Props) {
    const [isLoading, setIsLoading] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    function onClick() {
        openSigIn()
    }

    function toggleMenu() {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <header className="w-full py-4 px-6 md:py-9 md:px-12 flex justify-between items-center relative">

            <img src={iconSvg} alt="icone" className="w-15 h-15" />
            
            <button 
                onClick={toggleMenu}
                className="md:hidden text-white focus:outline-none"
                aria-label="Toggle menu"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isMenuOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>

            <nav className="hidden md:flex items-center gap-6 lg:gap-8 xl:gap-10 text-gray-500">
                <a href="/" className="hover:text-white transition ease-linear">Home</a>
                <a href="/service" className="hover:text-white transition ease-linear">Services</a>
                <a href="/" className="hover:text-white transition ease-linear">Contact Us</a>
                <a href="/about" className="hover:text-white transition ease-linear">About Us</a>
            </nav>

            <div className="hidden md:block">
                <AppointmentButton onClick={onClick} type="button" isLoading={isLoading}>
                    Appointment
                </AppointmentButton>
            </div>

            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-gray-800 z-50 p-4 shadow-lg">
                    <nav className="flex flex-col items-center gap-4 text-gray-500">
                        <a href="/" className="hover:text-white transition ease-linear w-full text-center py-2">Home</a>
                        <a href="/service" className="hover:text-white transition ease-linear w-full text-center py-2">Services</a>
                        <a href="/" className="hover:text-white transition ease-linear w-full text-center py-2">Contact Us</a>
                        <a href="/about" className="hover:text-white transition ease-linear w-full text-center py-2">About Us</a>
                        <div className="w-full pt-2">
                            <AppointmentButton 
                                onClick={onClick} 
                                type="button" 
                                isLoading={isLoading}
                                className="w-full justify-center"
                            >
                                Appointment
                            </AppointmentButton>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    )
}