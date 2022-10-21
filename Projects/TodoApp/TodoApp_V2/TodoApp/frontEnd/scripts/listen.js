/*
Name: Sazin Reshed Samin
Project: Todo App 
Structure: FrontEnd only by HTML, CSS & Vanialla Js, BackEnd: Nodejs, Mongodb
Date: 21-10-22
*/

import eventStyling from "./events/mouseEvents.js";


// listen from the DOM element

// export object
const domListen = {};
domListen.elements = {};

// event listener on Card element
domListen.listenOnTodosClick = function(card) {

        // mouseeneter event
        card.addEventListener('mouseenter', function(event) {
                eventStyling.mouseEnterEvent(event.currentTarget);
        });
        // mouseover event
        card.addEventListener('mouseleave', function (event) {
                console.log(event.currentTarget.childNodes);
                eventStyling.mouseLeaveEvent(event.currentTarget);
        });
        
        // click event
        card.addEventListener('click', function(event) {

                // get the element on which the event has fired.
                const targetElement = event.currentTarget;
                
                // To transport data from one js page to another page we here use "localStorage"
                // We use this because of from here we load to the another html page. 
                // And at this time I didn't find out any other way here
                localStorage.setItem('_id', targetElement.childNodes[0].textContent);
                localStorage.setItem('title', targetElement.childNodes[1].textContent);
                // children[2] belongs to <hr> tag
                localStorage.setItem('time', targetElement.childNodes[3].textContent);
                localStorage.setItem('description', targetElement.childNodes[4].textContent);

                // load to the page for go to the inside of that card on which the event has fired.
                location.href = "../frontEnd/htmls/inTheTodos.html";
        });
        
}

export default domListen;
