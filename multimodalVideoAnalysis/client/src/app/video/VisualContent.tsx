"use client"
import { Eye, Search, Loader2, Target, Clock } from "lucide-react"
import { useState } from "react"
import axios from "axios"

type Props = {
    id: string;
};

export default function VisualContent({ id }: Props) {
    const [timestamps, setTimestamps] = useState([])
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true)
        if (!input.trim()) return;

        try {
            const res = await axios.get(`http://127.0.0.1:8000/visual_search/`, {
                params: { video_id: id, inquiry: input.trim()}
            })
            setTimestamps(res.data.timestamps)
            setIsLoading(false)
        } catch (err) {
            console.error("Error performing visual content search: ", err)
        }
        setInput("")
    };

    return (
        <div className="flex flex-col rounded-lg border-1 border-purple-500/30 bg-black/40">
            
            <div className="flex flex-col border-b border-purple-500/30 p-4">
                <div className="flex items-center space-x-2">
                    <div>
                        <Eye className="w-5 h-5 text-cyan-400"/>
                    </div>
                    <div className="font-semibold text-white">
                        Visual Content Search
                    </div>
                </div>
                <div>
                    Describe what you want to find in the video
                </div>
            </div>

            <div>

                <div className="flex p-1.5 items-center space-x-2">
                    <form className="flex-1 flex space-x-2" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="e.g. person pointing at whiteboard"
                            className="w-full p-1.5  bg-black border-purple-500/50 border-1 rounded-lg"
                            
                        />
                        <button type="submit" className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 p-1.5 rounded-lg hover:cursor-pointer">
                            {isLoading ? (
                                <Loader2 className="animate-spin"/>
                            ) : (
                                <Search/>
                            )}
                        </button>
                    </form>  
                    
                </div>
                {(timestamps.length > 0 && !isLoading ) && (
                    <div className="bg-black/40 p-4 rounded-lg border border-purple-500/30 space-y-4">
                        <div className="flex items-center space-x-2">
                            <Target className="h-5 w-5 text-green-400" />
                            <div className="font-bold text-white">
                            Search Results ({timestamps.length} found)
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            {timestamps.map((ts, idx) => (
                            <div
                                key={idx}
                                className="rounded-lg bg-gray-800/50 border border-gray-700/50 hover:border-purple-500/50 p-4 flex flex-col items-center justify-center space-y-2"
                            >
                                <div className="flex items-center space-x-2 text-cyan-400 font-mono">
                                <Clock className="h-4 w-4" />
                                <span>{ts}</span>
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                )}     

            </div>

        </div>
    )
}