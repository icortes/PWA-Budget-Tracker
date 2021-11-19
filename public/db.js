window.indexDB = window.indexDb || window.mozIndexedDB || window.webkitIndexedDb || window.msIndexedDB;
  //make sure it is supported: 
  if (!window.indexedDB){ 
    alert("Not Supported");
  }