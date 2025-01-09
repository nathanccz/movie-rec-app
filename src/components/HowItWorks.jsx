import { Icon } from "@iconify/react/dist/iconify.js"

export default function HowItWorks() {
    return (
        <section className="my-20" 
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="500">
            <h2 className="my-5 text-2xl font-bold px-3">How It Works</h2>
            <div className="w-full grid sm:grid-cols-1 sm:grid-rows-4 md:grid-cols-2 md:grid-rows-2 xl:grid-rows-1 xl:grid-cols-4 gap-3">
                <div className="card shadow-xl bg-primary">
                    <div className="card-body w-full">
                        <h2 className="card-title">Search Movies and TV</h2>
                        <p>Have a title in mind? Search hundreds of streaming services to see if it's available by subscription or free.</p>
                        <div className="card-actions justify-end">
                        <Icon icon="tabler:world-search" className='text-5xl'/>
                        </div>
                    </div>
                </div>
                <div className="card shadow-xl bg-primary">
                    <div className="card-body">
                        <h2 className="card-title">Rate What You've Seen</h2>
                        <p>Give it a star rating and be sure to add a short review. This will help the app understand your tastes!</p>
                        <div className="card-actions justify-end">
                        <Icon icon="material-symbols:star-rate-outline" className='text-5xl'/>
                        </div>
                    </div>
                </div>
                <div className="card shadow-xl bg-primary">
                    <div className="card-body">
                        <h2 className="card-title">Add Titles to Wishlist</h2>
                        <p>Can't find a title you're looking for? Add it to a watchlist and get notified when it's available.</p>
                        <div className="card-actions justify-end">
                        <Icon icon="oui:list-add" className='text-5xl'/>
                        </div>
                    </div>
                </div>
                <div className="card shadow-xl bg-primary">
                    <div className="card-body">
                        <h2 className="card-title">Get Recommended Titles</h2>
                        <p>As the app learns more about your ratings and watch habits, you'll see more movies tailored to you, powered by ClaudeAI.</p>
                        <div className="card-actions justify-end">
                        <Icon icon="hugeicons:ai-idea" className='text-5xl'/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}