import './style.css';
import Header from '../Header';
import NavigationButton from '../NavigationButton';

export default function SuccessPage({ seats, setSeats, name, setName, cpf, setCpf, seatsArray, setSeatsArray }) {
    const { day, movie } = seats;

    function resetStates() {
        setSeats();
        setSeatsArray([]);
        setName('');
        setCpf('');
    }

    return (
        <>
            <Header />
            <p className="success-page-title">Pedido feito<br />com sucesso!</p >

            <div className='success-content'>
                <p className='title'>Filme e sessão</p>
                <p className='info'>{movie.title}<br />{day.date} {seats.name}</p>

                <p className='title'>Ingressos</p>
                {seatsArray.map(object => {
                    return (
                        object.selected && <p className='info' key={object.id}>Assento {object.name}</p>
                    );
                })}

                <p className='title'>Comprador</p>
                <p className='info'>Nome: {name}</p>
                <p className='info'>CPF: {cpf}</p>

            </div>
            <NavigationButton link={'/'} text={'Voltar pra Home'} margin={'margin-top'} click={resetStates} />
        </>
    );
}