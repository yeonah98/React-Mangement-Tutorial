import Customer from './component/Customer.js';
import './App.css';

function App() {
  return (
    <div>
      {
        customers.map(c => {
          return (
            <Customer 
            key={c.id}
            id={c.id}
            image={c.image}
            name={c.name}
            birthday={c.birthday}
            gender={c.gender}
            job={c.job}
            />
          );
        })
      }
    </div>
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

export default App;
