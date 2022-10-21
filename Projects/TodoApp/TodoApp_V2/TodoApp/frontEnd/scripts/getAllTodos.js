/*
Name: Sazin Reshed Samin
Project: Todo App 
Structure: FrontEnd only by HTML, CSS & Vanialla Js, BackEnd: Nodejs, Mongodb
Date: 21-10-22
*/


import listenOnDom from './listen.js';


// url of local database
const url = 'http://localhost:3000';

// fetch the data from the url;
async function fetchData() {
        const res = await fetch(url);
        let jsonData = await res.json();
        let todosData = jsonData["Todos"];
        addDataToDom(todosData);
}

// add todos into the html DOM by traversing each element
function addDataToDom(todosData) {
        for (let i = 0; i < todosData.length; i++) {
                
                // seperate each data and put to the corresponding variables
                const title = todosData[i]['title'];
                const description = todosData[i]['description'];
                const dateTime = todosData[i]['date'];
                const id = todosData[i]['_id'];
                
                // create HTML tag and set attribute for those data

                // card element
                const card = document.createElement('div');
                card.setAttribute('id', 'card');

                // header element
                const titleHtml = document.createElement('h1');
                titleHtml.setAttribute('id', 'title')
                titleHtml.innerHTML = title;
                // description element
                const descriptionHtml = document.createElement('p');
                descriptionHtml.innerHTML = description;
                descriptionHtml.setAttribute('id', 'description');
                // time element
                const timeHtml = document.createElement('p');
                timeHtml.innerHTML = dateTime;
                timeHtml.setAttribute('id', 'time');
                // id element
                const idHtml = document.createElement('small');
                idHtml.innerHTML = id;
                idHtml.setAttribute('id', '_id');


                // append all intems in card
                card.append(idHtml);                
                card.append(titleHtml);
                // add a horizontal line
                card.append(document.createElement('hr'));
                card.append(timeHtml);
                card.append(descriptionHtml);

                // append to the html
                document.getElementById('todos').appendChild(card);

                // bind them to the corresponding js file for event listening
                listenOnDom.listenOnTodosClick(card);
        }
}


// call the function
fetchData();