import ReactPlayer from 'react-player';

export default function Trailer({ url }) {
    return (
        <div className="aspect-w-16 aspect-h-9 mt-5">
          <ReactPlayer 
            className="absolute inset-0"
            url={url}
            width="100%"
            height="100%"
            playsInLine={true}
            controls={true}
            playing={true}
          />
        </div>
      );
}