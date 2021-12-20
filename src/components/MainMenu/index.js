import './style.css';
import loading from '../../assets/loading.gif';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header';

export default function MainMenu() {

    const [posters, setPosters] = useState();

    useEffect(() => {
        const promise = axios.get("https://mock-api.driven.com.br/api/v4/cineflex/movies");
        promise.then(answer => setPosters(answer.data));
    }, []);

    if (!posters) {
        return (
            <img className='loading-gif' src={loading} alt="" />
        )
    }

    return (
        <>
            <Header previousPage={''} />

            <p className='select-movie-title'>Selecione o filme</p>

            <div className='posters'>
                {posters.map(item =>
                    <Link to={`/sessoes/${item.id}`} key={item.id}>
                        <div className='poster' >
                            <img className='main-image' src={item.posterURL} alt="" />
                        </div>
                    </Link>
                )}
            </div>
        </>
    );
}