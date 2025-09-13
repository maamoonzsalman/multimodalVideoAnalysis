import Title from "@/app/components/landingPage/Title"
import VideoEmbed from "../VideoEmbed"
import VisualContent from "../VisualContent"
import VideoSections from "../VideoSections"
import ChatInterface from "../ChatInterface"

type Props = {
    params: Promise<{ id: string }>;
}

export default async function VideoAnalysis({ params }: Props) {
    const { id } = await params;
    return (
        <div className="min-h-screen flex flex-col">
            
            <div className="navbar">
                  <Title/>
            </div>
            
            <div className=" space-x-6 py-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex-1 flex justify-center">
                <div className="left">
                    <div className="top border-1 rounded-lg border-purple-500/30 mb-6">
                        <VideoEmbed id={id}/>
                    </div>
                    <div className="bottom">
                        <VisualContent id={id}/>
                    </div>
                </div>

                <div className="right space-y-4">
                    <div className="top">
                        <VideoSections id={id}/>
                    </div>
                    <div className="bottom">
                        <ChatInterface id={id}/>
                    </div>
                </div>
            </div>
            
        </div>
    )
}