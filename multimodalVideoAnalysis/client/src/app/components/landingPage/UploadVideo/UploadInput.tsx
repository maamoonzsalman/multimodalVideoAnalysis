"use client"
import { useState } from "react"
import { Youtube } from "lucide-react"

export default function UploadInput() {
    const [link, setLink] = useState("")

    return (
        <form className="w-full">
            <div className='relative'>
                <Youtube className="absolute left-3 top-1/3 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="url"
                    placeholder="https://youtube.com/watch?v=..."
                    value = {link}
                    onChange = {(e) => setLink(e.target.value)}
                    className="w-full p-1.5 pl-15 mb-3.5 bg-black border-purple-500/40 border-1 rounded-sm"
                    required
                />
                
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