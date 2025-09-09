"use client"
import { useState } from "react";
import { Clock } from "lucide-react";


export default function VideoSections() {
    const mockSections = [
        {
            id: 1,
            title: "Introduction",
            timestamp: "0:00",
            duration: "0m 30s",
        },
        {
            id: 2,
            title: "Main Content",
            timestamp: "0:30",
            duration: "2m 0s",
        },
        {
            id: 3,
            title: "Demonstration",
            timestamp: "2:30",
            duration: "1m 30s",
        },
        {
            id: 4,
            title: "Conclusion",
            timestamp: "4:00",
            duration: "0m 30s",
        },
    ];

    const [data, setMockData] = useState(mockSections)
    
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

            <div className='bg-black/40 p-4 rounded-b-lg border-purple-500/50 border-b-1 border-x-1 space-y-2'>
                {data.map((section) => (
                    <div key={section.id} className=" hover: cursor-pointer rounded-lg bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 hover:border-purple-500/50 flex space-x-3 p-3">
                        
                        <div className= "text-white text-sm font-semibold w-8 h-8 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
                            {section.id}
                        </div>

                        <div className="flex flex-col">
                            <div >
                                {section.title}
                            </div>
                            <div className="flex space-x-3">
                                <div className="text-cyan-400 text-sm font-mono">{section.timestamp}</div>
                                <div className="text-gray-400 text-sm">{section.duration}</div>
                            </div>
                        </div>
                    </div>

                ))}
            </div>
        </div>
    )
}