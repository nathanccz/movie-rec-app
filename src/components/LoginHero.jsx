import LoginForm from "./LoginForm";

export default function LoginHero() {
    return (
        <>
        <div
        className="hero min-h-screen z-50"
        style={{
            backgroundImage: "url(./bg03.jpg)",
        }}>
            <div className="hero-overlay bg-opacity-50"></div>
            <div className="hero-content text-center">
                <LoginForm />
            </div>
        </div>
        </>
    )
}