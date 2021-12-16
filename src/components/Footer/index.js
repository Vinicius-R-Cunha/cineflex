import './style.css';

export default function Footer({ title, image, time, day }) {
    return (
        <footer className="footer">
            <div className='container'>
                <img src={image} alt="" />
            </div>
            <div className='infos'>
                <p>{title}</p>
                {time !== '' && <p>{day} - {time}</p>}
            </div>
        </footer>
    );
}