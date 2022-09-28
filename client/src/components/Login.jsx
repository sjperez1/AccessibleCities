import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from "axios"
import '../components/loginRegister.css'
const Login = () => {
    const [user, setUser] = useState({
        email:"",
        password:""
    })
    const [loginErrors, setLoginErrors] = useState([])
    const navigate = useNavigate()

    const submitHandler = (e) =>{
        e.preventDefault()
        axios.post(`http://localhost:8000/api/user/login`, user, {withCredentials: true})
            .then(res=> {
                console.log("Login response:", res)
                if(res.data.error){
                    setLoginErrors(res.data.error)
                }else{
                    navigate("/dashboard")
                }
            })
            .catch(err => console.log("Login err:", err))
    }

    const changeUser =(e) =>{
        let {name, value} = e.target
        setUser({
            ...user,
            [name] : value
        })
    }

    return (
        <div>
            <h2 className='formlabel'>Login</h2>
            <div>
                <form className='homeformbox' onSubmit={submitHandler}>
                    <div>
                        <label className='form-label'>Email</label>
                        <input type="text" name="email" value={user.email} onChange={changeUser} className='form-control'/>
                    </div>
                    <div>
                        <label className='form-check-label'>Password</label>
                        <input type="password" name="password" value={user.password} onChange={changeUser} className='form-control'/>
                    </div>
                    <div className='loginregbuttondiv'>
                        <button type='submit' className='btn loginregbutton formbutton'>Login</button>
                    </div>
                    <p className='formtext'>Don't have an account yet? <Link to="/register">Register here</Link></p>
                    <p className="text-danger">{loginErrors}</p>
                </form>
            </div>
        </div>
    )
}

export default Login