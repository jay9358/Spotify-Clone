    import {useContext, useEffect} from "react";
    import songContext from "../../contexts/songContext";

    const SingleSongCard = ({info, playSound}) => {
        const {currentSong, setCurrentSong} = useContext(songContext);
        useEffect(() => {
            console.log("Updated inffo:", info);
        }, [info]);
        return (
            <div
                className="flex hover:bg-gray-400 hover:bg-opacity-20 p-2 rounded-sm"
                onClick={() => {
                    console.log(info)
                    setCurrentSong(info);
                    
                }}
            >
                <div
                    className="w-12 h-12 bg-cover bg-center"
                    style={{
                        backgroundImage: `url("${info.thumbnail}")`,
                    }}
                ></div>
                <div className="flex w-full">
                    <div className="text-white flex justify-center  flex-col pl-4 w-5/6">
                        <div className="cursor-pointer hover:underline">
                            {info.name}
                        </div>
                        <div className="text-xs text-gray-400 cursor-pointer hover:underline">
                            {info.firstName + " " + info.lastName}
                        </div>
                    </div>
                    <div className="w-1/6 flex items-center justify-center text-gray-400 text-sm">
                        <div>3:44</div>
                    </div>
                </div>
            </div>
        );
    };

    export default SingleSongCard;
