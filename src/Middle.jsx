export default function Middle({ messeges }) {
    return (
        <div className="h">
            <div className="middle">
                {messeges.map((msg) => {
                    return (
                        <div key={msg.id} id={checkuser(msg.uid)} className="messege-b">
                            <p className="messege">{msg.text}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

function checkuser(usid) {
    if (usid === 1010) {
        return 'm'
    } else {
        return 'u'
    }
}

