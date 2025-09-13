"use client"
import { useState, useEffect } from "react";
import { Clock, Loader2 } from "lucide-react";
import axios from "axios";

type Props = {
    id: string;
};

export default function VideoSections({ id }: Props) {
    interface Segment {
        id: number;
        timestamp: string;
        title: string;
    }
    const [segments, setSegments] = useState<Segment[]>([]);
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
        async function fetchSegments() {
            try {
                console.log("id prop in VideoSections:", id);

                const res = await axios.get(`http://127.0.0.1:8000/timestamps/`, {
                    params: { video_id: id },
                });
                setSegments(res.data.timestamps);
                setIsLoading(false)
            } catch (err) {
                console.error("Error fetching segments:", err);
            }
        }

        fetchSegments();
    }, [id]);
        
    return (
        <div className="w-110">
            
            <div className="flex items-center space-x-2 bg-black/40 p-3 rounded-t-lg border-1 border-purple-500/50">
                <div className="">
                    <Clock className="h-4 w-4 text-purple-400"/>
                </div>
                <div className="font-bold">
                    Video Sections
                </div>
            </div>

            <div className='bg-black/40 p-4 rounded-b-lg border-purple-500/50 border-b-1 border-x-1 space-y-2 max-h-102 h-102 overflow-y-auto'>
                
                {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                        <div className="text-center space-y-3">
                            <Loader2 className="w-8 h-8 text-purple-400 animate-spin mx-auto" />
                            <p className="text-gray-400 text-sm">Generating sections...</p>
                        </div>
                    </div>
                ): (

                segments.map((segment) => (
                    <div key={segment.id} className=" hover: cursor-pointer rounded-lg bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 hover:border-purple-500/50 flex space-x-3 p-3">
                        
                        <div className= "text-white text-sm font-semibold w-8 h-8 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
                            {segment.id}
                        </div>

                        <div className="flex flex-col">
                            <div >
                                {segment.title}
                            </div>
                            <div className="flex space-x-3">
                                <div className="text-cyan-400 text-sm font-mono">{segment.timestamp}</div>
                            </div>
                        </div>
                    </div>

                ))
                )}
                
            </div>
        </div>
    )
}