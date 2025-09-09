import { Eye, Search, Sparkles } from "lucide-react"

export default function VisualContent() {
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
                    <form className="flex-1">
                        <input
                            type="text"
                            placeholder="e.g. person pointing at whiteboard"
                            className="w-full p-1.5  bg-black border-purple-500/50 border-1 rounded-lg"
                        />
                    </form>  
                    <button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 p-1.5 rounded-lg hover:cursor-pointer">
                        <Search/>
                    </button>
                </div>

            </div>

        </div>
    )
}