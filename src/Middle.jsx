export default function Middle({ messeges , uid }) {
    return (
        <div className="h">
            <div className="middle">
                {messeges.map((msg) => {
                    return (
                        <div key={msg.id} id={checkuser(msg.from, uid)} className="messege-b">
                            <p className="messege">{msg.text}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

//check if messege is sent or reseved
function checkuser(from, uid) {
    if (from === uid) {
        return 'm'
    } else {
        return 'u'
    }
}

