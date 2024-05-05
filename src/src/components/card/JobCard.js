import './job-card.css'

import {useSelector,useDispatch} from 'react-redux'
import {useEffect,useState} from 'react'
import {getJobs} from '../../actions/JobActions'

export default function JobCard(){

    const jobs = useSelector(state => state.Job.jobs)  
    const [limit,setLimit] = useState(20)
    const [offset,setOffset] = useState(0)
    const dispatch = useDispatch()


    useEffect(()=>{
        dispatch(getJobs(offset,limit))
    },[limit])

    const handleScroll = () => {
        console.log("scrolling......",window.innerHeight+document.documentElement.scrollTop, document.documentElement.offsetHeight)
        if (
          window.innerHeight + document.documentElement.scrollTop
          >= document.documentElement.offsetHeight-200
        ) {
            console.log("reached")
          setOffset(preOffset => preOffset + (limit+1))
          setLimit(preLimit => preLimit + 20);
        }
      };
    
      useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);


    return(
        <div className='card-grp'>
            { jobs?
                jobs.map((selector)=>{
                    return(
                        <div key={selector?.jdUid} className="card-component">
                        <div className="company-component">
                            <img alt="sample" src={selector?.logoUrl}/>
                            <div className="company">
                                {selector?.companyName!=null && <div className="comany-name">{selector?.companyName}</div>}
                                {selector?.jobRole!=null && <div className="company-role">{selector?.jobRole}</div>}
                                { selector?.location!=null && <p>{selector?.location}</p>}
                            </div>
                        </div>
                        {selector?.minJdSalary != null && selector?.maxJdSalary && <div className="salary">Estimated Salary - {selector?.minJdSalary}- {selector?.maxJdSalary}</div>}

                        { selector?.jobDetailsFromCompany !=null && 
                            <div className="about-company">
                            <h4>About Company:</h4>
                            <p>{selector?.jobDetailsFromCompany}</p>
                        </div>
                        }
                        {
                           selector?.minExp!=null &&  
                           <div className="experience">
                            <h5>Minimum Experience</h5>
                            <div>{selector?.minExp}</div>
                        </div>
                        }
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