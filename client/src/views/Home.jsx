import React from 'react'
import '../views/home.css'
import Login from '../components/Login'
const Home = () => {
    return (
        <div>
            <div>
                <h1 className='hometext hometitle'>Accessible Cities</h1>
                <p className='hometext'>Website description...</p>
            </div>
            <Login/>
        </div>
    )
}

export default Home