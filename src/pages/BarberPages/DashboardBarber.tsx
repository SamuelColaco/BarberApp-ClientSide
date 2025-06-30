import { Outlet } from "react-router";
import { BarberHeader } from "../../components/BarberHeader/BarberHeader";
import { BarberStack } from "../../components/BarberStack/BarberStack";
import { useState } from "react";

import { X, Menu } from "lucide-react"


export function DashboardBarber(){
     const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="flex flex-1 bg-[#1B2431] min-h-screen">

            <div className="hidden md:block w-60">
                <BarberStack />
            </div>
            
            <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex gap-3 ">
                    <button 
                        className="md:hidden text-white p-3"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <Menu size={24} />
                    </button>
                    <BarberHeader />
                </div>
            
                <main className="p-4 flex-1 overflow-auto">
                    <Outlet />
                </main>
            </div>

            {mobileMenuOpen && (
                <div className="fixed inset-0 z-50 flex md:hidden">
                    <div 
                        className="fixed inset-0 bg-black bg-opacity-50"
                        onClick={() => setMobileMenuOpen(false)}
                    />
                    <div className="relative z-50 w-72 bg-[#1B2431] h-full">
                        <div className="p-4 flex justify-end">
                            <button 
                                className="text-white"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <X size={24} />
                            </button>
                        </div>
                        <BarberStack />
                    </div>
                </div>
            )}
        </div>
    )
}