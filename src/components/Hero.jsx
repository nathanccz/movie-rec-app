

export default function Hero() {
    return (
        <>
        <div
        className="hero min-h-screen z-50"
        style={{
            backgroundImage: "url(./bg03.jpg)",
        }}>
            <div className="hero-overlay bg-opacity-50"></div>
            <div className="hero-content text-center text-white">
                <div className="max-w-lg">
                <h1 className="mb-5 text-[2.5rem] font-bold">Your ultimate movie finder, powered by TMDb and DeepSeek AI</h1>
                <p className="mb-5">
                    Go beyond the standard algorithm. Let DeepSeek AI give you personalized recommendations based on your mood and preferences — or find a hidden gem you've never heard of.
                </p>
                <label className="input input-bordered flex items-center gap-2 mb-3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                        d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        <path
                        d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input type="text" className="grow" placeholder="Email" />
                </label>
                <a href="#">
                    <button className="btn btn-primary">Get Started</button>
                </a>
                </div>
            </div>
        </div>
        </>
    )   
}