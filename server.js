const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.get('/api/customers', (req, res) => {
    res.send([
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
    ]);
});


app.listen(port, () => console.log(`Listening on port ${port}`));