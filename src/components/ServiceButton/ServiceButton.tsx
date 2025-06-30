
type Props = React.ComponentProps<"button">

export function ServiceButton({children, type = "button", ...all }: Props){
    return(
        <div>
            <button className="p-4 rounded-lg bg-black text-white hover:scale-110 transition ease-linear cursor-pointer" {...all}>
                {children}
            </button>
        </div>
    )
}
