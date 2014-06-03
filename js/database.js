// global variables
var db;
var shortName = 'Scan2';
var version = '1.0';
var displayName = 'Scan2DB';
var maxSize = 65536*1024; // 64 MB

// this is called when an error happens in a transaction
function errorHandler(transaction, error) {
   alert('Error: ' + error.message + ' code: ' + error.code);

}

// this is called when a successful transaction happens
function successCallBack() {
   //alert("DEBUGGING: success");

}

function nullHandler(){};

// called when the application loads
function onBodyLoad(){

// This alert is used to make sure the application is loaded correctly
// you can comment this out once you have the application working
//alert("DEBUGGING: we are in the onBodyLoad() function");

 if (!window.openDatabase) {
   // not all mobile devices support databases  if it does not, the following alert will display
   // indicating the device will not be albe to run this application
   alert('Databases are not supported in this browser.');
   return;
 }

// this line tries to open the database base locally on the device
// if it does not exist, it will create it and return a database object stored in variable db
 db = openDatabase(shortName, version, displayName,maxSize);

// this line will try to create the table User in the database just created/openned
 db.transaction(function(tx){

   tx.executeSql( 'CREATE TABLE IF NOT EXISTS eletricistas(matricula VARCHAR(7) NOT NULL PRIMARY KEY, nome VARCHAR(256) NOT NULL, senha VARCHAR(256) NOT NULL)', 
[],nullHandler,errorHandler);
 },errorHandler,successCallBack);


db.transaction(function(tx){

   tx.executeSql( 'CREATE TABLE IF NOT EXISTS turma(veiculo VARCHAR(8) NOT NULL PRIMARY KEY, jornada_ini DATETIME NOT NULL, jornada_fin DATETIME NOT NULL, telefone VARCHAR(14) NOT NULL, tipo VARCHAR(10) NOT NULL, lider VARCHAR(7) NOT NULL, eletricista1 VARCHAR(7), eletricista2 VARCHAR(7), eletricista3 VARCHAR(7))', 
[],nullHandler,errorHandler);
 },errorHandler,successCallBack);



db.transaction(function(tx){

   tx.executeSql( 'CREATE TABLE IF NOT EXISTS servicos(servico VARCHAR(8) NOT NULL PRIMARY KEY, qtd_reincid INT NOT NULL, alimentador VARCHAR(10) NOT NULL, equipamento VARCHAR(7) NOT NULL, endereco VARCHAR(256) NOT NULL, numero INT NOT NULL, bairro VARCHAR(256) NOT NULL)', 
[],nullHandler,errorHandler);
 },errorHandler,successCallBack);

}

function resetDB() {
  db.transaction(function(transaction) {
    transaction.executeSql('DELETE FROM eletricistas', [], nullHandler,errorHandler);
  });
  db.transaction(function(transaction) {  
    transaction.executeSql('DELETE FROM servicos', [], nullHandler,errorHandler);    
  });
  db.transaction(function(transaction) {  
    transaction.executeSql('DELETE FROM turmas', [], nullHandler,errorHandler);        
  });
  db.transaction(function(transaction) {  
    transaction.executeSql('INSERT INTO eletricistas(matricula, nome , senha ) VALUES (?, ?, ?) ',['c056139', 'Waner Miranda', ' '], nullHandler,errorHandler);
  });
  db.transaction(function(transaction) {  
    transaction.executeSql('INSERT INTO eletricistas(matricula, nome , senha ) VALUES (?, ?, ?) ',['c056151', 'Celso Meireles', ' '], nullHandler,errorHandler);   
  });
  db.transaction(function(transaction) {  
    transaction.executeSql('INSERT INTO eletricistas(matricula, nome , senha ) VALUES (?, ?, ?) ',['c045499', 'Roberto Proença', ' '], nullHandler,errorHandler);   
   });
}

// list the values in the database to the screen using jquery to update the #results element
function ListDBValues() {

 if (!window.openDatabase) {
  alert('Databases are not supported in this browser.');
  return;
 }

// this line clears out any content in the #results element on the page so that the next few lines will show updated
// content and not just keep repeating lines
 $('#results').html('');

// this next section will select all the content from the User table and then go through it row by row 
// appending the UserId  FirstName  LastName to the  #results element on the page
 db.transaction(function(transaction) {
   transaction.executeSql('SELECT * FROM eletricistas;', [],
     function(transaction, result) {
      if (result != null && result.rows != null) {
        for (var i = 0; i < result.rows.length; i++) {
          var row = result.rows.item(i);
          $('#results').append('<br>' + row.UserId + '. ' +
row.FirstName+ ' ' + row.LastName);
        }
      }
     },errorHandler);
 },errorHandler,nullHandler);

 return;

}

// this is the function that puts values into the database using the values from the text boxes on the screen
function AddValueToDB() {

 if (!window.openDatabase) {
   alert('Databases are not supported in this browser.');
   return;
 }

// this is the section that actually inserts the values into the User table
 db.transaction(function(transaction) {
   transaction.executeSql('INSERT INTO User(FirstName, LastName) VALUES (?,?)',[$('#txFirstName').val(), $('#txLastName').val()], nullHandler,errorHandler);
   });

// this calls the function that will show what is in the User table in the database
 ListDBValues();

 return false;

}
