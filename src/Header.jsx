export default function Header({ username, profile }) {
    return (
        <div className="header">
            <p className="logo">
                <span id="a">C</span>
                <span id="b">h</span>
                <span id="c">a</span>
                <span id="d">t</span>
                <span id="c">H</span>
                <span id="b">u</span>
                <span id="a">b</span></p>
            <div className="sect">
                <div className='profilec'>
                    <p className='username'>{username}</p>
                    <img src={profile} alt="profileP" className="profileP"></img>
                </div>
            </div>
        </div>
    );
}
