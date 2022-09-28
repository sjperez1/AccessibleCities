import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useParams, Link, useNavigate} from 'react-router-dom'
import moment from 'moment'
import '../views/dashboard.css'

const ViewPost = () => {
    const [post, setPost] = useState()
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/post/${id}`)
            .then(res=>setPost(res.data))
            .catch(err=>console.log(err))
    },[])

    const handleDashboard = () => {
        navigate("/dashboard")
    }

    return (
        <div className='viewPost'>
            {
                post?
                <div>
                    <h2>{post.location}</h2>
                    <h5>Looked for: {post.features}</h5>
                    <p>Created by: {post.createdBy} {moment(post.created).fromNow()}</p>
                    <p>{post.postBody}</p>
                    <button type='button' onClick={handleDashboard} className='btn dashboardbtn'>Return to Dashboard</button>
                </div>
                : <p>Wrong post ID. Go back to the <Link to="/dashboard" className="btn btn-link">Dashboard</Link> and select another post.</p>
            }
        </div>
    )
}

export default ViewPost