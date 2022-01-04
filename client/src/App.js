import React, {useState, useEffect} from 'react';
import Customer from './component/Customer.js';
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

const styles =({
  root: {
    width: '100%',
    marginTop: createSpacing.unit*3,
    oveflowX: "auto"
  },
  table: {
    minWidth: 1080
  }
})

function App(props) {
  return (
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
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map(c => {return (<Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />);})}
        </TableBody>
      </Table>
    </Paper>
  );
}

const customers = [
  {
  'id': 1,
  'image': 'https://placeimg.com/64/64/1',
  'name': '유연아',
  'birthday': '981127',
  'gender': '여자',
  'job': '대학생'
 },
 {
  'id': 2,
  'image': 'https://placeimg.com/64/64/2',
  'name': '조지훈',
  'birthday': '980404',
  'gender': '남자',
  'job': '대학생'
 },
 {
  'id': 3,
  'image': 'https://placeimg.com/64/64/3',
  'name': '쿠키',
  'birthday': '980910',
  'gender': '여자',
  'job': '대학생'
 }
]

export default withStyles(styles)(App);