# Full Stack with PG
[PG](https://www.npmjs.com/package/pg) is a node module that allows us to communicate with our PostgreSQL database.

```
,________,         .------,          .------,         .------.
|________|       ,'_____,'|        ,'_____,'|        (        )
|        |       |      | |        | ____ | |        |~------~|
|        |       |      | |        | ____ | |        |~------~|
|        |       |      | ;        | ____ | ;        |~------~|
|________|       |______|'         |______|'         `.______.'
 HTML/CSS          jQuery        Node / Express      PostgreSQL
```

## CHECKLIST
Some of these things **have already been done**. If you've forked this repository, run `npm install` to get started.

**Server**

- [x] Setup node `npm init`
  - [x] Add modules (express, body-parser, jquery)
  - [x] Folder structure and static files (index.html, styles.css & client.js)
  - [x] Add server.js & set up our static route
- [x] Add the **pg** module `npm install pg --save`
- [x] Create database table Postico & [add our data](#database)
- [x] Create our SELECT query Postico
- [x] Create our **book.js** router & GET route
- [x] Add `pg` to [our GET route](#pgget)

**Client**

- [x] AJAX call to GET our books (print to console)
- [x] Append them to the DOM
- [x] Create our HTML form
- [x] AJAX call to POST the form data

**Server**

- [x] Set up our POST route in node and log data
- [x] Create our `INSERT` query in Postico
- [x] Use `pg` to write the data to the database

**Client**

- [x] Refresh our UI after a book is added
- [x] Delete button in HTML
- [x] Edit form & button
- [ ] DELETE & EDIT AJAX (Peer Challenge)
- [ ] Clear form on submit (Peer Challenge)

**Server**

- [ ] DELETE & EDIT pg (Peer Challenge)
- [ ] Add publisher & year

**Stretch**

- [ ] Improve the styling of the page
- [ ] Add validation
- [ ] Change the sort order

## DATABASE

### <a name="database"></a>DB Setup
Full SQL for adding all the books can be found in the [database.sql](https://github.com/PrimeAcademy/antares_pg_intro/blob/master/database.sql) file. Load the file into Postico by clicking on **Load query...**, select all of the queries (cmd + a) and click **Execute Selection**. [SQL lecture notes for reference](https://github.com/PrimeAcademy/antares-syllabus/blob/master/lecture_notes/03-01_sql_intro.md).

```SQL
-- Sample SQL code
CREATE TABLE books (
	"id" SERIAL PRIMARY KEY,
	"title" VARCHAR (1000) NOT NULL,
	"author" VARCHAR (100) NOT NULL
);

INSERT INTO "books" ("title", "author")
VALUES ('Rogue Lawyer', 'John Grisham'),
('Blue', 'Danielle Steel'),
('NYPD Red 4', 'James Patterson and Marshall Karp');

SELECT * FROM "books";
```

## SERVER

PG looks like a lot of code **but** it's mostly just error handling.

<a name="pgget"></a> **books.js** route

```JavaScript
var express = require('express');
var router = express.Router();
var pg = require('pg');
var config = {
  database: 'antares', // the name of the database
  host: 'localhost', // where is your database
  port: 5432, // the port number for your database, 5432 is the default
  max: 10, // how many connections at one time
  idleTimeoutMillis: 30000 // 30 seconds to try to connect
};

// Create our pool
var pool = new pg.Pool(config);

// When using a router, the part of the path we used to get here is removed.
// We called http://localhost:5000/books/ to get here (e.g. '/').
router.get('/', function(req, res){
  // Attempt to connect to the database
  pool.connect(function(errorConnectingToDatabase, client, done){
    if(errorConnectingToDatabase) {
      // There was an error connecting to the database
      console.log('Error connecting to database: ', errorConnectingToDatabase);
      res.sendStatus(500);
    } else {
      // We connected to the database!!!
      // Now, we're going to GET things from the DB
      var queryText = 'SELECT * FROM "books";';
      client.query(queryText, function(errorMakingQuery, result){
        done(); // Release our connection to the pool - IMPORTANT!!!
        if(errorMakingQuery) {
          // Query failed. Did you test it in Postico? If so, log it
          // to the console and double check your SQL syntax.
          console.log('Attempted to query with:', queryText);
          // Log the error
          console.log('Error making the database query:', errorMakingQuery);
          res.sendStatus(500);
        } else {
          // Send back the results
          res.send(result.rows);
        }
      }); // End query
    } // End if
  }); // End pool
}); // End router.get
```
