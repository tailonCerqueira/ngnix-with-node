const express = require('express');
const app = express();

const port  = 3000;

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};
const mysql = require('mysql');

app.get('/', async (req, res) => {
    const connection = mysql.createConnection(config);
    await connection.query(`CREATE TABLE IF NOT EXISTS people (id int not null auto_increment, name varchar (255), primary key (id))`)
    await connection.query(`DELETE FROM people`);
    await connection.query(`INSERT INTO people (name) values ('Tailon Carvalho de Cerqueira')`);

    await connection.query('SELECT * FROM people', (err, rows, fields) => {
        if (err) throw err
        res.send(`
            <h1>Full Cycle Rocks!</h1>
            <ul>
                ${rows.map(item => {
                    return `<li>${item.name}</li>`
                })}
            <ul/>
        `)
    })
    connection.end();
})

app.listen(port, () => {
    console.log(`Starting in port ${port}`);
})