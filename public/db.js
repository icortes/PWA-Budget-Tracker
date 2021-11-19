window.indexDB =
  window.indexDb ||
  window.mozIndexedDB ||
  window.webkitIndexedDb ||
  window.msIndexedDB;
//make sure it is supported:
if (!window.indexedDB) {
  alert('Not Supported');
}

let db;

const request = window.indexedDB.open('budget_db', 1);

request.onupgradeneeded = (event) => {
  console.log('onupgradeneeded => executed');
  db = event.target.result;

  db.createObjectStore('pending', {autoIncrement: true});
};

request.onerror = function(event) {
  console.log("Woops! " + event.target.errorCode);
};

request.onsuccess = (event) => {
  db = event.request.result;

  if (navigator.onLine) {
    checkDatabase();
  }
};

function saveRecord(data) {
  const transaction = db.transaction(['pending'], 'readwrite');
  const budgetStore = transaction.objectStore('pending');

  budgetStore.add(data);
}
