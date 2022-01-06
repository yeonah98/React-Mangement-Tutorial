import React, {useState, useEffect} from 'react';
import { post } from 'axios';

function CustomerAdd(props){
    const [constructor, setConstructor] = useState({
        file: null,
        userName: '',
        birthday: '',
        gender: '',
        job: '',
        fileName: ''
    });

    const handleFormSubmit = (e) => {
        e.preventDefault()
        addCustomer()
        .then((res) => {
                console.log(res.data);
                props.stateRefresh();
            });
        setConstructor({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '' 
        })
    }

    const  handleFileChange = (e) => {
        setConstructor({
            file: e.target.files[0],
            fileName: e.target.value
        })
    }

    const handleValueChange = (e) => {
       const {name, value} = e.target;
        setConstructor({
            ...constructor,
            [name]: value
        });
    }

    const addCustomer = () => {
        const url = '/api/customers';
        const formData = new FormData();
        formData.append('image', constructor.file);
        formData.append('name', constructor.userName);
        formData.append('birthday', constructor.birthday);
        formData.append('gender', constructor.gender);
        formData.append('job', constructor.job);
        const config = {
            header: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData, config);
    }

    return(
        <form onSubmit={handleFormSubmit}>
            <h1>고객 추가</h1>
            프로필 이미지: <input type="file" name="file" file={constructor.fileName} onChange={handleFileChange}/><br/>
            이름 : <input type="text" name="userName" vlaue={constructor.userName} onChange={handleValueChange}/><br/>
            생년월일 : <input type="text" name="birthday" value={constructor.birthday} onChange={handleValueChange}/><br/>
            성별 : <input type="text" name="gender" value={constructor.gender} onChange={handleValueChange}/><br/>
            직업 : <input type="text" name="job" value={constructor.job} onChange={handleValueChange}/><br/>
            <button type="submit">추가하기</button>
        </form>
    );
}

export default CustomerAdd;