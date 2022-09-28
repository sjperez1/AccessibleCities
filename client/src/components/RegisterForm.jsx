import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from "axios"

const RegisterForm = () => {
    const [user, setUser] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:""
    })
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()

    const submitHandler = (e) =>{
        e.preventDefault()
        axios.post(`http://localhost:8000/api/user/register`, user, {withCredentials:true})
            .then(res=>{
                console.log(res.data)
                navigate("/dashboard")
            })
            .catch(err=>{
                const errMsgArr = [] // empty array to hold error messages
                const errResponse = err.response.data.errors // err.response.data.errors is the path that we take through the error response to get to the dictionaries that hold all of the information of each error.
                for(const eachKey in errResponse) { // eachKey is represents each dictionary in the errResponse that shows a dictionary for each error.
                    errMsgArr.push(errResponse[eachKey].message) // for each errResponse dictionary, we want to target specifically the value that is associated with the message key to present to client. Push the messages to the array so that we can set errors as this new array.
                }
                setErrors(errMsgArr)
                console.log(err) // .catch is unsuccessful
            })
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
            <h2 className='formlabel'>Register</h2>
            <div>
                <form className='homeformbox' onSubmit={submitHandler}>
                    <div>
                        <label className='form-label'>First Name</label>
                        <input type="text" name="firstName" value={user.firstName} onChange={changeUser} className='form-control'/>
                    </div>
                    <div>
                        <label className='form-label'>Last Name</label>
                        <input type="text" name="lastName" value={user.lastName} onChange={changeUser} className='form-control'/>
                    </div>
                    <div>
                        <label className='form-label'>Email</label>
                        <input type="text" name="email" value={user.email} onChange={changeUser} className='form-control'/>
                    </div>
                    <div>
                        <label className='form-check-label'>Password</label>
                        <input type="password" name="password" value={user.password} onChange={changeUser} className='form-control'/>
                    </div>
                    <div>
                        <label className='form-check-label'>Confirm Password</label>
                        <input type="password" name="confirmPassword" value={user.confirmPassword} onChange={changeUser} className='form-control'/>
                    </div>
                    <div className='loginregbuttondiv'>
                        <button type='submit' className='btn loginregbutton formbutton'>Register</button>
                    </div>
                    <p className='formtext'>Already have an account? <Link to="/">Login here</Link></p>
                {
                    errors.map((err, i) => {
                        return(
                            <p class="alert alert-danger" role="alert" key={i}>{err}</p>
                        )
                    })
                }
                </form>
            </div>
        </div>
    )
}

export default RegisterForm