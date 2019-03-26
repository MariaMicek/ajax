class NumbersContainer {
    constructor(){
        this.numbers = []
    }

    addNumber(number){
        this.numbers = this.numbers.concat(number)
        return this
    }
}

const container1 = new NumbersContainer()

container1.addNumber(4)
console.log(JSON.stringify(container1))
console.log(container1.numbers)

container1.addNumber(6)
console.log(container1)
console.log(container1.numbers)

container1.addNumber(4).addNumber(9).addNumber(11)
console.log(container1)
console.log(container1.numbers)
