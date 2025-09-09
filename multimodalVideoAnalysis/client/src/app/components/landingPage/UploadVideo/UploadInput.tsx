"use client"
import { useState } from "react"
import { Youtube } from "lucide-react"

export default function UploadInput() {
    const [url, setUrl] = useState("")
    const [errors, setErrors] = useState({url: ""});


    const validateForm = () => {
        const pattern = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:[&?].*)?$/;
        const newErrors = { url: "" }
        if (!url) {
            newErrors.url = "Url is required.";
        }
        if (!pattern.test(url.trim())) {
            newErrors.url = "Please enter a url in the following format:  https://youtube.com/watch?v=..."
        }

        setErrors(newErrors);
        const valid = newErrors.url === ""
        return valid
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault() 
        if (!validateForm()) return // keep error showing
        // your submit logic goes here
    }

    return (
        <form className="w-full" onSubmit={handleSubmit}>
            <div className='relative'>
                <Youtube className="absolute left-3 top-1/3 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="url"
                    placeholder="https://youtube.com/watch?v=..."
                    value = {url}
                    onChange = {(e) => setUrl(e.target.value)}
                    className="w-full p-1.5 pl-15 mb-3.5 bg-black border-purple-500/40 border-1 rounded-sm"
                />
                {errors.url && <p className="text-red-500">{errors.url}</p>}
            </div>
            <div>
                <button 
                    type="submit"
                    className="w-full p-1.5 font-bold bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 mb-6 rounded-sm hover:cursor-pointer"
                    >
                    Analyze Video
                </button>
            </div>
        </form>
    )
}