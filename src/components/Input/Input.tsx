



type Props = React.ComponentProps<"input"> & {
    legend?: string
}

export function Input({ legend, ...all }: Props){
    return (
        <div className=" w-full max-h-20 text-gray-400 focus-within:text-amber-300">
            <fieldset className="w-full">
                {legend && (
                    <legend className="uppercase text-sm mb-2 text-inherit">
                        {legend}
                    </legend>
                )}

                <input className="w-full h-12 rounded-lg border border-gray-100 px-4 text-sm outline-none focus:border-2 focus:border-amber-400" {...all} />
            </fieldset>
        </div>
    )
}