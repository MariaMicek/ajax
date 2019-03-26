class Person {
    constructor(name) {
        this.name = name
    }

    changeName(newName) {
        this.name = newName
        return this             //zwraca this czyli obiekt, tak samo działa w przypadku tablic
    }


}
const person1 = new Person('Marysia')

person1.changeName('Ela').changeName('Iza').changeName('Ala')   //żeby kilka metod pod rząd zadziałało, to muszą zwracać obiekt (a nie undefined), żeby następna też mogła się wykonać
console.log(person1.name)