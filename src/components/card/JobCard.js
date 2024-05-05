import './job-card.css'

import {useSelector,useDispatch} from 'react-redux'
import {useEffect} from 'react'
import {getJobs} from '../../actions/JobActions'

export default function JobCard(){

    const jobs = useSelector(state => state.Job)
    
    const dispatch = useDispatch()


    useEffect(()=>{
        dispatch(getJobs(0,10))
    },[])


    return(
        <div className='card-grp'>
            { jobs?
                jobs.map((selector)=>{
                    return(
                        <div key={selector?.jdUid} className="card-component">
                        <div className="company-component">
                            <img alt="sample" src={selector?.logoUrl}/>
                            <div className="company">
                                <div className="comany-name">{selector?.companyName}</div>
                                <div className="company-role">{selector?.jobRole}</div>
                                <p>{selector?.location}</p>
                            </div>
                        </div>
                        <div className="salary">Estimated Salary - {selector?.minJdSalary}- {selector?.maxJdSalary}</div>
                        <div className="about-company">
                            <h4>About Company:</h4>
                            <p>{selector?.jobDetailsFromCompany}</p>
                        </div>
                        <div className="experience">
                            <h5>Minimum Experience</h5>
                            <div>{selector?.minExp}</div>
                        </div>
                        <div className="job-btn-grp">
                            <button className="apply-button">Easy Apply</button>
                            <button className="referal-button">unlock referal asks</button>
                        </div>
                    </div>
                    )
                }) :<div></div>
            }
        </div>
        
    )
}