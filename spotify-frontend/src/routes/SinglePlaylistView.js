import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import LoggedInContainer from "../containers/LoggedInContainer";
import {makeAuthenticatedGETRequest} from "../utils/serverHelpers";
import SingleSongCard from "../components/shared/SingleSongCard";

const SinglePlaylistView = () => {
    const [playlistDetails, setPlaylistDetails] = useState({});
    const {playlistId} = useParams();
    const [songs,setSongs]=useState([]);
    useEffect(() => {
        const getData = async () => {
            const response = await makeAuthenticatedGETRequest(
                "/playlist/get/playlist/" + playlistId
            );

            setPlaylistDetails(response.data);
         
        };
        getData();
    }, [playlistId])

    useEffect(() => {
        const fetchSongDetails = async () => {
                console.log(playlistDetails.songs)
                const songDetailsPromises = playlistDetails.songs.map(async (songId) => {
                    const response = await makeAuthenticatedGETRequest(`/song/get/song/${songId}`);
                    return response.data;
                });

                const songDetails = await Promise.all(songDetailsPromises);
                setSongs(songDetails);

              
            }
        

        fetchSongDetails();
    }, [playlistDetails.songs]);
    useEffect(() => {
        console.log("Updated songs:", songs);
    }, [songs]);
    return (
        <LoggedInContainer curActiveScreen={"library"}>
            {playlistDetails._id && (
                <div>
                    <div className="text-white text-xl pt-8 font-semibold">
                        {playlistDetails.name}
                    </div>
                    <div className="pt-10 space-y-3">
                        {songs.map((item) => {
                            return (
                                <SingleSongCard
                                    info={item[0]}
                                    key={JSON.stringify(item)}
                                    playSound={() => {}}
                                />
                            );
                        })}
                    </div>
                </div>
            )}
        </LoggedInContainer>
    );
};

export default SinglePlaylistView;
