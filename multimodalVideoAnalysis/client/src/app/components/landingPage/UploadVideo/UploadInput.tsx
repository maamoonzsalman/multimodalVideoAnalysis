"use client"
import { useState } from "react"

export default function UploadInput() {
    const [link, setLink] = useState("")

    return (
        <form className="w-full">
            <div>
                <input
                    type="text"
                    placeholder="https://youtube.com/watch?v=..."
                    value = {link}
                    onChange = {(e) => setLink(e.target.value)}
                    className="w-full"
                />
            </div>
            <div>
                <button 
                    type="submit"
                    className="w-full"
                    >
                    Analyze Video
                </button>
            </div>
        </form>
    )
}