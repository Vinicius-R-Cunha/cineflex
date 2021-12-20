import './style.css';
import loading from '../../assets/loading.gif';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header';
import Footer from '../Footer';

export default function SchedulePage() {
    const { idFilme } = useParams();
    localStorage.setItem('idFilme', idFilme);
    const [session, setSession] = useState();

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v4/cineflex/movies/${idFilme}/showtimes`);
        promise.then(answer => setSession(answer.data));
    }, [idFilme])

    if (!session) {
        return (
            <img className='loading-gif' src={loading} alt="" />
        )
    }

    return (
        <>
            <Header previousPage={'/'} />

            <p className='select-session-title'>Selecione o horário</p>

            <div className="sessions">
                {session.days.map(item => {
                    return (
                        <div key={item.id}>
                            <p className='day'>{item.weekday} - {item.date}</p>
                            <div className='times'>
                                {item.showtimes.map(time =>
                                    <Link to={`/assentos/${time.id}`} key={time.id}>
                                        <div className='time'>{time.name}</div>
                                    </Link>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>

            <Footer title={session.title} image={session.posterURL} time='' day='' />
        </>
    )
}