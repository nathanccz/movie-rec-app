import { Icon } from "@iconify/react/dist/iconify.js"

export default function Toast({ text }) {
    return (
        <div className="toast toast-bottom toast-start">
            <div className="alert alert-success">
                <Icon icon="mdi:success-bold" className='text-xl'/> {text}
            </div>
        </div>
    )
}