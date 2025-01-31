import { useState, useEffect } from "react";
import { addFave, addToWatchlist } from "../services/api";
import Trailer from "./Trailer";
import FaveButton from "./FaveButton";
import WatchlistButton from "./WatchlistButton";
import ReviewButton from "./ReviewButton";

export default function Modal({ data, setModalContent, handleReviewModalOpen }) {

    const handleModalClose = () => {
        setModalContent({})
    }
    
    const streamSources = data.sources
    let streamSourcesList

    if (!streamSources || streamSources.length === 0) {
        streamSourcesList = <p className="italic">This title is not available for free or by subscription.</p>
    } else {
        streamSourcesList = streamSources.map(s => 
            <ul className="flex w-full justify-between items-center" key={s.id}>
                <li className="basis-[15%] text-center"> 
                    <img src={s.logo} alt={`${s.name || s.title} logo`} className="w-[50px] h-[50px]" />
                </li>
                <li className="basis-[60%] text-center">
                    <b>{s.provider_name}</b> {`(${s.type ? 'subscription' : 'free'})`}
                </li>
                <li className="basis-[15%] text-center flex justify-end">
                    <a href={s.trailer} target="_blank">
                        <img src="https://img.icons8.com/color/48/next.png" alt="play button"/>
                    </a>
                </li>
            </ul>
        )
    }

    const handleAddFave = async (mediaId) => {
        console.log(mediaId)
        if (mediaId) {
            try {
                const response = await addFave(mediaId)
    
                if (response.ok) {
                    console.log('Added to favorites!')
                }
            } catch (error) {
                console.log(error)
            }
        }
        
    }

    const handleAddToWatchlist = async (mediaId) => {
        if (mediaId) {
            try {
                const response = await addToWatchlist(mediaId) 

                if (response.ok) {
                    console.log('Added to watchlist!')
                }
            } catch (error) {
                console.log('Error adding to watchlist:', error)
            }
        }
    }

    return (
        <dialog id="my_modal_3" className="modal">
            <div className="modal-box lg:max-w-4xl border">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleModalClose}>✕</button>
                </form>
                <h1 className="text-3xl font-bold mb-3 text-white">{data.title} {`(${data.release_date?.split('-')[0]})`}</h1>
                <div className="flex gap-3">
                    <FaveButton data={data} handleAddFave={handleAddFave}/>
                    <WatchlistButton data={data} handleAddToWatchlist={handleAddToWatchlist}/>
                    <ReviewButton data={data} handleReviewModalOpen={handleReviewModalOpen}/>
                </div>
                <div>
                    {data.trailer ? <Trailer url={data.trailer} /> : <p className="py-[10rem] italic">No trailer available for this title.</p>}
                </div>
                <p className="py-4">{data.overview}</p>
                <h3 class="text-2xl font-bold mb-5 text-white">Where To Watch</h3>
                <div className="flex flex-col w-full gap-4" id="serviceListContainer">
                    {streamSourcesList}
                </div>
            </div>
        </dialog>
    )
}