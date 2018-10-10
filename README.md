# Full Stack with PG

```
,________,         .------,          .------,         .------.
|________|       ,'_____,'|        ,'_____,'|        (        )
|        |       |      | |        | ____ | |        |~------~|
|        |       |      | |        | ____ | |        |~------~|
|        |       |      | ;        | ____ | ;        |~------~|
|________|       |______|'         |______|'         `.______.'
 HTML/CSS          jQuery        Node / Express      PostgreSQL
```

## Base Mode


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

## Stretch Goals

- [ ] Improve the styling of the page
- [ ] Add validation
- [ ] Change the sort order

## DATABASE

### DB Setup
Full SQL for adding all the books can be found in the database.sql file. Load the file into Postico by clicking on **Load query...**, select all of the queries (cmd + a) and click **Execute Selection**. [SQL lecture notes for reference](https://github.com/PrimeAcademy/antares-syllabus/blob/master/lecture_notes/03-01_sql_intro.md).

