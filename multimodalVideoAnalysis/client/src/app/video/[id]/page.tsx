import Title from "@/app/components/landingPage/Title"
import VideoEmbed from "../VideoEmbed"
import VisualContent from "../VisualContent"
import VideoSections from "../VideoSections"
import ChatInterface from "../ChatInterface"

type Props = {
    params: { id: string };
}

export default function VideoAnalysis({ params }: Props) {
    return (
        <div className="min-h-screen flex flex-col">
            
            <div className="navbar">
                  <Title/>
            </div>
            
            <div className=" space-x-6 py-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex-1 flex justify-center">
                <div className="left">
                    <div className="top border-1 rounded-lg border-purple-500/30 mb-6">
                        <VideoEmbed id={params.id}/>
                    </div>
                    <div className="bottom">
                        <VisualContent/>
                    </div>
                </div>

                <div className="right">
                    <div className="top">
                        <VideoSections/>
                    </div>
                    <div className="bottom">
                        <ChatInterface/>
                    </div>
                </div>
            </div>
            
        </div>
    )
}