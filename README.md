# JS SQL Templates / Querygenerator

This lets you generate queryfunctions from plain .sql files.
Simply point to a path containing .sql files, provide a pattern for matching said
files and back you'll get an object containing functions.

How you name the .sql files is important, since the name of the queryfunction will
match that of the .sql file minus the extension.

These queryfunctions yields promises, which makes it useable together with something
like async/await.

The querygenerator function takes two arguments. DBadapter containing a "query" method/api,
and a glob pattern.

###Some compatible dbadapters
https://github.com/sehrope/node-pg-db<br>
https://github.com/felixge/node-mysql


It is necessary to use babel to transpile your code for this to work, since I use
Promises via babel polyfill, arrow functions, etc. The idea is that your project is
already in a babel "context" when using this module.

###Example

```js
let db = require('pg-db');
let querygen = require('querygenerator');
let queries = querygen(db, __dirname + '/**/*.sql');
```

In the above example, any .sql files that exists within the given path will be functions
on the queries object.
