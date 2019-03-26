const promise = fetch('https://randomuser.me/api')

// 1
promise
    .then((promiseValue) => console.log(promiseValue))


// 2
let response = null

    promise
    .then((promiseValue) => response = promiseValue)

console.log(response)       //wyświtli nadal null bo console.log wykona się przed promise, dlatego nie da się dobrać poza then do wartości promise


//3
promise
    .then((promiseValue) => console.log(promiseValue.json()))       //również zawraca promise, ale zamienia dane na sparsowany JSON, czyli obiekt 



//4
promise                                 
    .then( promiseValue => {            //promise można zagnieżdżać
        promiseValue.json()
            .then( data => {
                console.log(data)
            })
    }) 
    .then( valueFromPromiseFromThen => {            //następne then biorą funkcje z wartością z poprzednich then lub rozwiązanie z promisy poprzedniego then
        console.log(valueFromPromiseFromThen)
    })


//5
promise
    .then(response => response.json())      //to samo co wyżej, tylko prościej - zwraca dane z promisa
    .then(data => console.log(data))
    .catch(error => console.log('Error', error))             //wyświetla w przypadku błędu, wtedy kolejne theny się nie wywołują, tylko od razu catch
    .finally(() => console.log('I will always be here!'))


//6


const promise = fetch('https://randomuser.me/api')

const writeInBody = message => document.body.innerText = message        //wyświetlanie komunikatów w różnych przypadkach działania promisy

writeInBody('Oczekuję na dane')

promise
    .then(response => 
        response.json()
    )      
    .then(data => {
        console.log(data.results[0].name)
        document.body.innerText = (
            data.results[0].name.first +
            ' ' +
            data.results[0].name.last
        )
      
    })
    .catch(() => writeInBody('Wystąpił błąd'))
