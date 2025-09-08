import { Upload, Youtube, Sparkles } from "lucide-react"
import UploadInput from "./UploadInput"

export default function UploadVideo() {
    return (
        <div className="upload-container flex flex-col bg-purple-900 p-5">
            
            <div className="directions bg-blue-400 flex flex-col items-center">
                <div className="bg-red-400 p-3 rounded-4xl mb-4">
                    <Upload size={48}/>
                </div>
                <div className="text-2xl mb-1">
                    Upload Your Video
                </div>
                <div className='mb-3'>
                    Paste a Youtube URL to start analyzing your video with AI
                </div>
            </div>
            
            <div className="input">
                <UploadInput/>
            </div>

            <div className="feature-logos flex justify-between mx-8">
                <div className='flex-col items-center flex'>
                    <div>
                        <Sparkles/>
                    </div>
                    <div>
                        AI Analysis
                    </div>
                </div>
                <div className='flex-col items-center flex'>
                    <div>
                        <Youtube/>
                    </div>
                    <div>
                        Video Chat
                    </div>
                </div>
                <div className='flex-col items-center flex'>
                    <div>
                        <Upload/>
                    </div>
                    <div>
                        Visual Search
                    </div>
                </div>
            </div>
            
        </div>
    )
}