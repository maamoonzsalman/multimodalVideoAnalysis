
type Props = {
  id: string;
};


export default function VideoEmbed({ id }: Props) {
    return (
        <div>
            <iframe 
                src={`https://www.youtube.com/embed/${id}`}
                className="w-[800px] h-[450px] rounded-lg shadow-lg"
                allowFullScreen
            />
        </div>
    )
}