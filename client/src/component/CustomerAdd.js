import React, {useState, useEffect} from 'react';
import { post } from 'axios';
import { withStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

const styles = ({
    hidden: {
        display: 'none'
    }
})

function CustomerAdd(props){
    const [constructor, setConstructor] = useState({
        file: null,
        userName: '',
        birthday: '',
        gender: '',
        job: '',
        fileName: '',
        open: false
    });

    const handleFormSubmit = (e) => {
        e.preventDefault()
        addCustomer()
        .then((res) => {
                console.log(res.data);
                props.stateRefresh();
            });
        setConstructor({
            ...constructor,
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false
        })
    }

    const  handleFileChange = (e) => {
        setConstructor({
            ...constructor,
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

    const handleClickOpen = () => {
        setConstructor({
            ...constructor,
            open: true
        });
    }

    const handleClose = () => {
        setConstructor({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '', 
            open: false
        });
    }

    //const { classes } = props;
    return(
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                고객 추가하기
            </Button>
            <Dialog open={constructor.open} onClose={handleClose}>
                <DialogTitle>고객 추가</DialogTitle>
                <DialogContent>
                    <input className={props.classes.hidden} accept="image/*" id="raised-button-file" type="file" file={constructor.file} onChange={handleFileChange}/>
                    <label htmlFor="raised-button-file">
                        <Button variant="contained" color="primary" component="span" name="file">
                            {constructor.fileName === '' ? "프로필 이미지 선택" : constructor.fileName}
                        </Button>
                    </label>
                    <br/>
                    <br/>
                    <TextField label="이름" type="text" name="userName" vlaue={constructor.userName} onChange={handleValueChange}/><br/>
                    <TextField label="생년월일" type="text" name="birthday" value={constructor.birthday} onChange={handleValueChange}/><br/>
                    <TextField label="성별" type="text" name="gender" value={constructor.gender} onChange={handleValueChange}/><br/>
                    <TextField label="직업" type="text" name="job" value={constructor.job} onChange={handleValueChange}/><br/>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={handleFormSubmit}>추가</Button>
                    <Button variant="outlined" color="primary" onClick={handleClose}>닫기</Button>
                </DialogActions>
            </Dialog>
        </div>
        /*
        <form onSubmit={handleFormSubmit}>
            <h1>고객 추가</h1>
            프로필 이미지: <input type="file" name="file" file={constructor.fileName} onChange={handleFileChange}/><br/>
            이름 : <input type="text" name="userName" vlaue={constructor.userName} onChange={handleValueChange}/><br/>
            생년월일 : <input type="text" name="birthday" value={constructor.birthday} onChange={handleValueChange}/><br/>
            성별 : <input type="text" name="gender" value={constructor.gender} onChange={handleValueChange}/><br/>
            직업 : <input type="text" name="job" value={constructor.job} onChange={handleValueChange}/><br/>
            <button type="submit">추가하기</button>
        </form>
        */
    );
}

export default withStyles(styles)(CustomerAdd);