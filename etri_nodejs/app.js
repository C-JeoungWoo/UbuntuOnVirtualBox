//MySQL8 버전 이후부터는 AUTH 문제로 인하여 mysql2를 사용하는 것이 호환성이 더 좋다.
const mysql = require('mysql2');
const express = require('express');
const app = express();
const PORT = 3000;

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

// 루트 경로에서 테이블 데이터 표시
app.get('/', (req, res) => {
  // example_table에서 데이터를 가져옴
  connection.query(`SELECT * FROM exampletable`, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('데이터베이스 오류 발생');
      return;
    }
    // 가져온 데이터를 HTML 테이블 형태로 렌더링하여 클라이언트에 전송
    res.send(`
      <html>
      <head><title>Ubuntu Virtual Box</title></head>
      <body>
        <h1>Example Table</h1>
        <table border="1">
          <tr><th>ID</th><th>Name</th><th>Age</th></tr>
          ${results.map(row => `<tr><td>${row.id}</td><td>${row.name}</td><td>${row.age}</td></tr>`).join('')}
        </table>
      </body>
      </html>
    `);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});