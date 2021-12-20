import './style.css';
import backArrow from '../../assets/turn.png';
import { useNavigate } from 'react-router-dom';

export default function Header({ previousPage }) {
    let navigate = useNavigate();

    function goBack() {
        navigate(previousPage);
    }

    return (
        <header className="header">
            <div>
                <p>CINEFLEX</p>
                {previousPage !== '' && <img onClick={() => goBack()} src={backArrow} alt="" />}
            </div>
        </header>
    );
}