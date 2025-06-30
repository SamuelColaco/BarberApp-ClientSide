

type Props = {
    total: string,
    number: string,
    image: string
}

export function InformationStatics({ total, number, image }: Props){
    return (
        <div className="flex flex-col gap-2 bg-[#273142] w-3xs p-4 rounded-lg h-40 ">
            <div className="flex items-center justify-between gap-3 pb-5">
                <div className="flex gap-2">
                    <div className="flex flex-col gap-3">
                        <p className="text-xs text-gray-500"> {total} </p>
                        <h2 className="text-white uppercase font-bold text-3xl"> {number} </h2>
                    </div>
                </div>
                <img src={image} alt="logo usuario" className="w-15 h-15" />
            </div>
                <div className="flex gap-1">
                    <p className="text-green-400">1.7%</p>
                    <p className="text-white ">Better than yesterday</p>
                </div>            
        </div>
    )
}