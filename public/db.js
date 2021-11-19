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

request.onerror = function (event) {
  console.log('Woops! ' + event.target.errorCode);
};

request.onsuccess = (event) => {
  db = event.request.result;

  if (navigator.onLine) {
    checkDatabase();
  }
};

function saveRecord(record) {
  const transaction = db.transaction(['pending'], 'readwrite');
  const store = transaction.objectStore('pending');

  store.add(record);
}

function checkDatabase() {
  const transaction = db.transaction(['pending'], 'readwrite');
  const store = transaction.objectStore('pending');

  const getAll = store.getAll();

  getAll.onsuccess = function () {
    if (getAll.result.length > 0) {
      fetch('/api/transaction/bulk', {
        method: 'POST',
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then(() => {
          // if successful, open a transaction on your pending db
          const transaction = db.transaction(['pending'], 'readwrite');

          // access your pending object store
          const store = transaction.objectStore('pending');

          // clear all items in your store
          store.clear();
        });
    }
  };
}

// listen for app coming back online
window.addEventListener("online", checkDatabase);