


type Props = {
    image: string
    title: string
    description: string
}

export function ServiceBox({image, title, description }: Props){
    return(
        <div className=" w-[370px] h-80 flex flex-col items-center justify-center gap-3 border border-amber-300">
        <img src={image} alt="logo de cabelo" />
        <h2 className="text-2xl uppercase font-bold"> {title} </h2>
        <p> {description} </p>
        </div>
    )
}