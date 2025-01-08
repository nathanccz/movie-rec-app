import { useState, useEffect } from "react";
import { getUserRegion } from "../services/ipify-api";
import { getStreamSources } from "../services/watchmode-api";

export default function Modal({ data, setModalContent }) {
    const [streamSources, setStreamSources] = useState([])
    
    useEffect(() => {
        let streamingSourceInfo,
            availableStreamingSources,
            sourcesWithLogos,
            userRegion

        async function gatherStreamSourceInfo() {
            userRegion = await getUserRegion()
            streamingSourceInfo = await getStreamSources()
            availableStreamingSources = data.sources.filter(source => source.region === userRegion && (source.type === 'sub' || source.type === 'free') )
            sourcesWithLogos = availableStreamingSources.map(s => {
                s.logo = streamingSourceInfo.find(e => e.id === s.source_id).logo_100px
                return s
            })

            setStreamSources(sourcesWithLogos)
        }

        if (Object.keys(data).length > 0) {
            gatherStreamSourceInfo()
        } 
    }, [data])

    const handleModalClose = () => {
        setModalContent({})
    }

    const streamSourcesList = streamSources.map(s => 
        <ul className="flex w-full justify-between items-center" key={s.id}>
            <li className="basis-[15%] text-center"> 
                <img src={s.logo} alt={`${s.name} logo`} className="w-[50px] h-[50px]" />
            </li>
            <li className="basis-[60%] text-center">
                {s.name}
            </li>
            <li className="basis-[15%] text-center">
                <a href={s.web_url} target="_blank">
                    <img src="https://img.icons8.com/color/48/next.png" alt="play button"/>
                </a>
            </li>
        </ul>
    )
    

    return (
        <dialog id="my_modal_3" className="modal">
            <div className="modal-box lg:max-w-4xl border">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleModalClose}>✕</button>
                </form>
                <h3 className="font-bold text-2xl">{data.title}</h3>
                <div className="flex">
                    <img src={data.poster} alt={`poster for ${data.title}`} />
                    <video src="https://www.youtube.com/watch?v=XLA_uqAfbew"></video>
                </div>
                <p className="py-4">{data.plot_overview}</p>
                <div className="flex flex-col w-full gap-4" id="serviceListContainer">
                    {streamSourcesList}
                </div>
            </div>
        </dialog>
    )
}