import './style.css';
import Header from '../Header';
import Posters from '../Posters';


export default function MainMenu() {
    return (
        <main className='main'>
            <Header />
            <Posters />
        </main>
    );
}