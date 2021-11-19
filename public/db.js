window.indexDB = window.indexDb || window.mozIndexedDB || window.webkitIndexedDb || window.msIndexedDB;
  //make sure it is supported: 
  if (!window.indexedDB){ 
    alert("Not Supported");
}
  
const request = window.indexedDB.open('budget_db', 1);

request.onupgradeneeded = event => {
  console.log('onupgradeneeded => executed');
  const db = event.target.result;

  const budgetStore = db.createObjectStore('budget_db', { keyPath: 'budgetID' });

  budgetStore.createIndex('nameIndex', 'name');
  budgetStore.createIndex('ValueIndex', 'value');
  budgetStore.createIndex('DateIndex', 'date');
}