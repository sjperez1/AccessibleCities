import React, {useState} from 'react'
import axios from "axios"
import {useNavigate} from 'react-router-dom'
import moment from 'moment'
import PlacesAutocomplete from '../components/Autocomplete'
import '../components/createpost.css'

const CreatePostForm = (props) => {
    const [location, setLocation] = useState("")
    const [features, setFeatures] = useState("")
    const [preview, setPreview] = useState("")
    const [postBody, setPostBody] = useState("")
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        createAxios()
    }

    const createAxios = () => {
        const formInfo = {createdBy: `${props.loggedInUser.firstName} ${props.loggedInUser.lastName}`, created: moment()._d, location, features, preview, postBody}
        axios.post(`http://localhost:8000/api/post`, formInfo, {withCredentials: true})
            .then(res => navigate("/dashboard"))
            .catch(err=>{
                console.log(formInfo)
                const errMsgArr = [] // empty array to hold error messages
                const errResponse = err.response.data.errors // err.response.data.errors is the path that we take through the error response to get to the dictionaries that hold all of the information of each error.
                for(const eachKey in errResponse) { // eachKey is represents each dictionary in the errResponse that shows a dictionary for each error.
                    errMsgArr.push(errResponse[eachKey].message) // for each errResponse dictionary, we want to target specifically the value that is associated with the message key to present to client. Push the messages to the array so that we can set errors as this new array.
                }
                setErrors(errMsgArr)
                console.log(err) // .catch is unsuccessful
            })
    }

    const handleDashboard = () => {
        navigate("/dashboard")
    }

    return (
        <div className='outercreateform'>
            <form onSubmit={handleSubmit}>
                <p>Created by: {props.loggedInUser.firstName} {props.loggedInUser.lastName}</p>
                <label className='form-check-label'>Where you visited: </label>
                <div>
                    <PlacesAutocomplete setLocation={setLocation}/>
                </div>
                <div>
                    <label className='form-check-label'>List some accessibility features you looked for:</label>
                    <input type="text" name="features" value={features} onChange={e => setFeatures(e.target.value)}  className='form-control'/>
                </div>
                <div>
                    <label className='form-check-label'>Provide a short preview description of your post (75 characters max):</label>
                    <input type="text" name="preview" value={preview} onChange={e => setPreview(e.target.value)}  className='form-control'/>
                </div>
                <div>
                    <label className='form-check-label'>Type your accessibility post:</label>
                    <textarea name="postBody" value={postBody} onChange={e => setPostBody(e.target.value)} rows="13" className='form-control'/>
                </div>
                <button type='submit' className='btn btn-success formbutton'>Create Post</button>
                <button type='button' onClick={handleDashboard} className='btn btn-secondary formbutton'>Return to Dashboard</button>
                {
                    errors.map((err, i) => {
                        return(
                            <p class="alert alert-danger" role="alert" key={i}>{err}</p>
                        )
                    })
                }
            </form>
        </div>
    )
}

export default CreatePostForm