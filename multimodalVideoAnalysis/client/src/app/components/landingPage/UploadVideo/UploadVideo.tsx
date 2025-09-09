import { Upload, Youtube, Sparkles } from "lucide-react"
import UploadInput from "./UploadInput"

export default function UploadVideo() {
    return (
        <div className="upload-container flex flex-col bg-black/40 p-5 w-150 border-1 border-purple-500/30 rounded-sm">
            
            <div className="directions flex flex-col items-center">
                <div className="bg-gradient-to-br from-purple-500 to-cyan-500 p-5 rounded-full mb-4">
                    <Upload size={48}/>
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
                    Upload Your Video
                </div>
                <div className='mb-3'>
                    Paste a Youtube URL to start analyzing your video with AI
                </div>
            </div>
            
            <div className="input">
                <UploadInput/>
            </div>

            <div className="feature-logos flex justify-between p-8 border-t-1 border-purple-500/30">
                <div className='flex-col items-center flex'>
                    <div className='p-2 mb-2 bg-purple-500/20 rounded-lg'>
                        <Sparkles className="text-purple-400"/>
                    </div>
                    <div className="text-sm">
                        AI Analysis
                    </div>
                </div>
                <div className='flex-col items-center flex'>
                    <div className='p-2 mb-2 bg-cyan-500/20 rounded-lg'>
                        <Youtube className="text-cyan-400"/>
                    </div>
                    <div className="text-sm">
                        Video Chat
                    </div>
                </div>
                <div className='flex-col items-center flex'>
                    <div className='p-2 mb-2 bg-blue-500/20 rounded-lg'>
                        <Upload className="text-blue-400"/>
                    </div>
                    <div className="text-sm">
                        Visual Search
                    </div>
                </div>
            </div>
            
        </div>
    )
}