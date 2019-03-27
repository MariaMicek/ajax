fetch('https://randomuser.me/api/?results=3')      
    .then(response => response.json())
    .then(data =>data.results.forEach(el =>  console.log(el.email)))
    