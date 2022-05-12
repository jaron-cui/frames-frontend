

export default function Lobby(props) {
  return (
    <div>
      LOBBY
      <button onClick={() => props.service.leaveGame(props.gameId)}>LEAVE</button>
    </div>
  )
}