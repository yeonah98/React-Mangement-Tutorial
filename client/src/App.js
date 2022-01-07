import React, {useState, useEffect} from 'react';
import Customer from './component/Customer.js';
import CustomerAdd from './component/CustomerAdd.js';
import './App.css';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material//TableBody';
import TableRow from '@mui/material//TableRow';
import TableCell from '@mui/material//TableCell';
import { withStyles } from '@mui/styles';
import { createSpacing } from '@mui/system';
import CircularProgress from '@mui/material/CircularProgress';

const styles =({
  root: {
    width: '100%',
    marginTop: createSpacing.unit*3,
    oveflowX: "auto"
  },
  table: {
    minWidth: 1080
  },
  progress: {
    margin: createSpacing.unit*2
  }
})

function App(props) {

  const [customers, setCustomers] = useState('');
  const [completed, setCompleted] = useState(0);

  const stateRefresh = () => {
    setCustomers('');
    setCompleted(0);
    callApi()
    .then(data => setCustomers(data))
    .catch(err => console.log(err));
  }

  const callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  };

  useEffect(function(){
    const timer = setInterval(() => {
      setCompleted((prev) => (prev >= 100 ? 0 : prev + 10));
    }, 400);
    callApi()
    .then(data => setCustomers(data))
    .catch(err => console.log(err));
    return() => {
      clearInterval(timer);
    }
  },[]);
  // console.log(customers);

  return (
    <div>
      <Paper className={props.classes.root}>
        <Table className={props.classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
              <TableCell>설정</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.length ?
              customers.map(c => 
                {return (<Customer stateRefresh={stateRefresh} key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />);}) 
              : 
              <TableRow>
                <TableCell colspan="6" align="center">
                  <CircularProgress className={props.classes.progress} variant="determinate" value={completed}/>
                </TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </Paper>
      <CustomerAdd stateRefresh={stateRefresh}/>
    </div>
  );
}

export default withStyles(styles)(App);
