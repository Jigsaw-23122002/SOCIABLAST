import io from "socket.io-client";
import { useEffect, useContext } from 'react';
import Chat from './Chat'
import UserContext from "./UserContext";

function Container(props) {
    let Roomname = props.Rname;
    const { joinJoined, setJoinJoined } = useContext(UserContext);
    const { remJoinChat, setRemJoinChat } = useContext(UserContext);
    const { messageList, setMessageList } = useContext(UserContext);
    function func() {
        props.socket.emit('JoinJoinedRooms', Roomname);
        setMessageList([])
    }

    useEffect(() => {
        console.log(joinJoined);
        console.log('Frontend of the JoinJoinedRooms');
        props.socket.on("gotJoinJoinedRooms", (data) => {
            setJoinJoined(data);
            setRemJoinChat(false);
        })
    }, [props.socket, joinJoined]);

    return (
        <div>
            <p>{Roomname}</p>
            <button className="button" onClick={func}>Open</button>
        </div>
    );
}

export default Container;