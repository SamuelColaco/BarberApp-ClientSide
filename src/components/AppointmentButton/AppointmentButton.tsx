
type Props = React.ComponentProps<"button"> & {
    isLoading: boolean
}

export function AppointmentButton({ isLoading, children, type="button", ...all }: Props){
    return (
        <div>
            <button type={type} disabled={isLoading} className=" w-full flex items-center justify-center bg-transparent border-2 border-amber-200 rounded-[2px] h-12 py-2 px-3 uppercase font-bold text-white cursor-pointer hover:bg-amber-300 transition ease-linear disabled:opacity-50 disabled:cursor-not-allowed" {...all}>
                {children}
            </button>
        </div>
    )
}