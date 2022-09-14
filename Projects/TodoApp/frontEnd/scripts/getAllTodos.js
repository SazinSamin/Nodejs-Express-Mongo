const url = 'http://localhost:3000/todo';


async function fetchData() {
        const res = await fetch(url);
        let jsonData = await res.json();
        // console.log(jsonData);

        let todosData = jsonData["Todos"];

        for(let i = 0; i < todosData.length; i++) {
                // console.log(todosData[i]);
                const title = todosData[i]['title'];
                const description = todosData[i]['description'];
                const dateTime = todosData[i]['date'];

                const card = document.createElement('div');
                card.setAttribute('id', 'card');

                const titleHtml =  document.createElement('h1');
                titleHtml.setAttribute('id', 'title') 
                titleHtml.innerHTML = title;

                const descriptionHtml = document.createElement('p');
                descriptionHtml.innerHTML = description;

                const timeHtml = document.createElement('p');
                timeHtml.innerHTML = dateTime;


                card.appendChild(titleHtml);
                card.append(dateTime);
                card.append(descriptionHtml);



                document.getElementById('todos').appendChild(card);
        }


}



fetchData();