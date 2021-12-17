import './style.css';
import { Link } from 'react-router-dom';

export default function NavigationButton({ link, text, margin, click }) {
    return (
        <Link to={link}>
            <div className={`orange-button ${margin}`} onClick={click}>{text}</div>
        </Link>
    );
}