import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AddStudent = () => {
    //Parameters
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [student, setStudent] = useState({
        name: '',
        surname: '',
        parentOneName: '',
        parentOneSurname: '',
        parentTwoName: '',
        parentTwoSurname: '',
        birthDate: '',
        address: '',
        citizenshipNumber: '',
        phoneNumber: '',
        email: ''
    });

    //Handling the change in fields
    const handleChange = (e) => {
        setStudent({...student, [e.target.name]: e.target.value });
    }

    //Handling the submit button
    const handleSubmit = (e) => {
        e.preventDefault();
    
        //Creating music level objects (1-8)
        const education = Array.from({ length: 8 }, (_, index) => ({
            level: index + 1,
            startDate: null,
            endDate: null
        }));
    
        //Filling the education field of the student
        const studentData = {...student, education };
    
        //Adding the new student to the DB
        axios.post('http://localhost:3001/addStudent', studentData)
        .then(response => {
            alert(t('alertAdd'));
            navigate('/database');
            window.location.reload();
        })
        .catch(error => console.error(error));
    };
    
    //UI
    return (
        <form className="studentForm" onSubmit={handleSubmit}>
            <h3>{t('demographic')}</h3>
            <label className="formLabel">
                {t('name')}*
                <input className="formInput" type="text" name="name" onChange={handleChange} required />
            </label>
            <label className="formLabel">
                {t('surname')}*
                <input className="formInput" type="text" name="surname" onChange={handleChange} required />
            </label>
            <label className="formLabel">
                {t('parentOneName')}
                <input className="formInput" type="text" name="parentOneName" onChange={handleChange} />
            </label>
            <label className="formLabel">
                {t('parentOneSurname')}
                <input className="formInput" type="text" name="parentOneSurname" onChange={handleChange} />
            </label>
            <label className="formLabel">
                {t('parentTwoName')}
                <input className="formInput" type="text" name="parentTwoName" onChange={handleChange} />
            </label>
            <label className="formLabel">
                {t('parentTwoSurname')}
                <input className="formInput" type="text" name="parentTwoSurname" onChange={handleChange} />
            </label>
            <label className="formLabel">
                {t('birthDate')}*
                <input className="formInput" type="date" name="birthDate" onChange={handleChange} required />
            </label>
            <label className="formLabel">
                {t('address')}*
                <input className="formInput" type="text" name="address" onChange={handleChange} required />
            </label>
            <label className="formLabel">
                {t('citizenshipNumber')}*
                <input className="formInput" type="number" name="citizenshipNumber" onChange={handleChange} required />
            </label>
            <label className="formLabel">
                {t('phoneNumber')}*
                <input className="formInput" type="number" name="phoneNumber" placeholder="5..." onChange={handleChange} required />
            </label>
            <label className="formLabel">
                {t('email')}*
                <input className="formInput" type="String" name="email" onChange={handleChange} required />
            </label>
            <button className="submitButton" type="submit">{t('add')}</button>
        </form>
    );
}

export default AddStudent;