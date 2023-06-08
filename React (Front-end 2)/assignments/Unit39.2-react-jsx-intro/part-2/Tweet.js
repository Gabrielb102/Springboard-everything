const Tweet = ({username, name, date = new Date(), message}) => {
    return <div>
        <b>{name}</b>
        <p>User: {username}</p>
        <p>{message}</p>
    </div>
}