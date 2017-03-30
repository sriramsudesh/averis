
var myconstant = "Sudesh";

var address = {

    'name': 'sudesh',
    'home1' :'Tampines'
}

var Cloudant = require('cloudant');

var username = process.env.cloudant_username;
var password = process.env.cloudant_password;

// Initialize the library with my account.
//var cloudant = Cloudant({instanceName: 'Cloudant NoSQL DB-3k', vcapServices: JSON.parse(process.env.VCAP_SERVICES)});

var cloudant = Cloudant("https://b6cfa596-3637-4a8e-b9a5-1e76e29b532b-bluemix:1f41464e5eff1ecfeecdb9b392afbf6b93d5989e64e0e31747f027815d0bd02f@b6cfa596-3637-4a8e-b9a5-1e76e29b532b-bluemix.cloudant.com");

/*
cloudant.db.create('averisdb', function(err,data) {
    if(err) {
        console.log("database not created" + err)
    }
    console.log("database created named  averisdb" );
    
});  
*/

var averisdb = cloudant.db.use('averisdb');
//Lets insert data 
/*
var books = [
  {author:"Charles Dickens", title:"David Copperfield"},
  {author:"David Copperfield", title:"Tales of the Impossible"},
  {author:"Charles Dickens", title:"Great Expectation"}
]
 
averisdb.bulk({docs:books}, function(er) {
  if (er) {
    throw er;
  }
 
  console.log('Inserted all documents');
});

var book_indexer = function(doc) {
  if (doc.author && doc.title) {
    // This looks like a book. 
    index('title', doc.title);
    index('author', doc.author);
  }
}
 
var ddoc = {
  _id: '_design/library',
  indexes: {
    books: {
      analyzer: {name: 'standard'},
      index   : book_indexer
    }
  }
};
 
averisdb.insert(ddoc, function (er, result) {
  if (er) {
    throw er;
  }
 
  console.log('Created design document with books index');
});
*/


averisdb.search('library', 'books', {q:'author:dickens'}, function(er, result) {
  if (er) {
    throw er;
  }
 
  console.log('Showing %d out of a total %d books by Dickens', result.rows.length, result.total_rows);
  for (var i = 0; i < result.rows.length; i++) {
    console.log('Document id: %s', result.rows[i].id);
  }
});


   
 
    // ...and insert a document in it. 
    