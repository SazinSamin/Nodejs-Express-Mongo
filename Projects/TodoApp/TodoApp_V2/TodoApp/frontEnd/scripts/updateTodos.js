/*
Name: Sazin Reshed Samin
Project: Todo App 
Structure: FrontEnd only by HTML, CSS & Vanialla Js, BackEnd: Nodejs, Mongodb
Date: 21-10-22
*/

// retrive the data from the localStorage and put into the corresponding variables.
function getTodoDetails() {
        const _id = localStorage['_id'];
        const title = localStorage['title'];
        const time = localStorage['time'];
        const description = localStorage['description'];
        
        fillFormForEdit(_id, title, time, description);
}

// fille the form by current Todo's data for update and deletation
function fillFormForEdit(_id, title, time, description) {
        // console.log(_id, title, time, description);
        document.getElementById("title").setAttribute("value", title);
        document.getElementById("time").setAttribute("value", time);
        document.getElementById("description").setAttribute("value", description);

        // clear the local storage
        localStorage.clear();

        makeSendRequest(_id);
}

// make update or delete Request to the server by pressing that corresponding button
async function makeSendRequest(_id) {
        // get the corresponding button and add event listener
        const deleteBtn = document.getElementById('deleteBtn');
        const updateBtn = document.getElementById('updateBtn');
        deleteBtn.onclick = function () {
                deleteRequest(_id);
        }
        updateBtn.onclick = function () {

        }; 
}

// make update request
async function updateRequest(_id) {

}

// make delete request
async function deleteRequest (_id) {
        const url = `http://127.0.0.1:3000/${_id}`;
        const deleteMsg = await fetch(url, {method: 'DELETE'});
        // go to the deleteNotification page
        location.href = "/frontEnd/htmls/deleteNotification.html";
}


// call the function
getTodoDetails();
