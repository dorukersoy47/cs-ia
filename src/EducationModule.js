import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { EducationPDF } from './EducationPDF';
import EditImage from './images/Edit.svg'

const EducationModule = () => { 

    const { id } = useParams();
    const [educationLevels, setEducationLevels] = useState([]);
    const [studentFullName, setStudentFullName] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:3001/getStudent/${id}`)
            .then(response => {
                setStudentFullName(response.data.name + " " + response.data.surname)
                setEducationLevels(response.data.education);
            })
            .catch(error => console.error(error));
    }, [id]);
    
    const downloadPDF = () => {
        axios.get(`http://localhost:3001/getEducation/${id}`)
        .then(response => { EducationPDF(id, response.data, studentFullName) })
        .catch(error => console.error(error));
    }

    return ( 
        <div>
            <div className="educationModule">
                <h3 style={{textAlign: "center", textDecoration: "underline", marginBottom: "20px", fontSize: "30px" }}>{studentFullName}</h3>
                <button onClick={downloadPDF} className="educationModuleButton">Generate Report</button>
                <h1 className="educationModuleh1">Education Module</h1>
                {educationLevels.map((item, index) => (
                    <div className="educationList" key={index}>
                        <div className="educationLevel">
                            <h2 className="educationLevelh2">Level {index + 1}</h2>
                        </div>
                        <div className="educationLevel">
                            <p className="educationLevelp"><b className="educationLevelp">Start Date:</b> {item.startDate ? new Intl.DateTimeFormat('en-GB').format(new Date(item.startDate)) : "Haven't started"}</p>
                        </div>
                        <div className="educationLevel">
                            <p className="educationLevelp"><b className="educationLevelp">End Date:</b> {item.endDate ? new Intl.DateTimeFormat('en-GB').format(new Date(item.endDate)) : "Haven't finished"}</p>
                        </div>
                        <div className="educationLevelDiv">
                            <a className="educationLevela" href={`/editEducation/${id}/${item._id}`}><img className="educationLevelp" src={EditImage} alt="Edit SVG" /></a>
                        </div>
                    </div>                    
                ))}
            </div>
        </div>
     );
}
 
export default EducationModule;