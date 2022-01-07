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
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

const styles =({
  root: {
    width: '100%',
   minWidth: 1080
  },
  paper: {
    marginLeft: 18,
    marginRight: 18
  },
  progress: {
    margin: createSpacing.unit*2
  },
  tableHead: {
    fontSize: '1.0rem'
  },
  menu: {
    marginTop: 15,
    marginBottom: 15,
    display: 'flex',
    justifyContent: 'center'
  }
})

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function App(props) {

  const [customers, setCustomers] = useState('');
  const [completed, setCompleted] = useState(0);
  const cellList = ["번호", "프로필 이미지", "이름", "생년월일", "성별", "직업", "설정"];

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
    <div className={props.classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            고객 관리 시스템
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="검색하기"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Toolbar>
      </AppBar>
      <div className={props.classes.menu}>
       <CustomerAdd stateRefresh={stateRefresh}/>
      </div>
      <Paper className={props.classes.paper}>
        <Table>
          <TableHead>
            <TableRow>
             {cellList.map(c => {
               return <TableCell className={props.classes.tableHead}>{c}</TableCell>
             })}
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
    </div>
  );
}

export default withStyles(styles)(App);