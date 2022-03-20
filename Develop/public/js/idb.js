// create variable to hold db connection
let db;

// establish a connection to IndexedDB database called 'task_tracker' and set it to version 1
const request = indexedDB.open('taskmaster_pro', 1);

// this event will emit if the database version changes
request.onupgradeneeded = function(event) {

    // save a reference to the database
    const db = event.target.result;

    // create an object store (table) called `new_task`, set it to have an auto incrementing primary key of sorts
    db.createObjectStore('new_task', { autoIncrement: true });
};

// upon a successful
request.onsuccess = function(event) {

    // when db is successfully created with its object store or simply established a connection, save reference to db in global variable
    db = event.target.result;

    // check if app is online, if yes run uploadtask() function to send all local db data to api
    if (navigator.onLine) {
        // todo: uploadtask();
    }
};

request.onerror = function(event) {
    // log error here
    console.log(event.target.errorCode);
};

// This function will be executed if we attempt to submit a new task and there's no internet connection
function saveRecord(record) {

    // open a new task with the database with read and write permissions
    const task = db.task(['new_task'], 'readwrite');

    // access the object store for `new_task`
    const  taskObjectStore = task.objectStore('new_task');

    // add record to your store with add method
    taskObjectStore.add(record);
}

function uploadtask() {

    // open a task on your db
    const task = db.task(['new_task'], 'readwrite');

    // access your object store
    const taskObjectStore = task.objectStore('new_task');

    // get all records from store and set to a variable
    const getAll = taskObjectStore.getAll();

    getAll.onsuccess = function() {

        // if there was data in indexedDb's store send it to the api server
        if (getAll.result.length > 0) {
            fetch('/api/task', {
                method: 'POST',
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(serverResponse => {
                    if (serverResponse.message) {
                        throw new Error(serverResponse);
                    }

                    // open one more task
                    const task = db.task(['new_task'], 'readwrite');

                    // access the new_task object store
                    const taskObjectStore = task.objectStore('new_task');

                    // clear all items in your store
                    taskObjectStore.clear();

                    alert('All saved tasks has been submitted!');
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
}

// listen for app coming back online
window.addEventListener('online', uploadtask);