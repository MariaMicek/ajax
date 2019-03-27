class App {

    constructor(selector){
        this.container = document.querySelector(selector) || document.body
        this.numberOfUsers = 10
        this.genderOfUsers = ''
        this.searchTerm = ''
        this.focusedElement = null
        this.users = null
        this.isLoading = false
        this.isError = false

        this.render()
    }

    loadUsers(){
        if(this.isLoading) return 
        this.isLoading = true
        this.isError = false

        this.render()

        fetch(
            'https://randomuser.me/api' + 
            '?results=' + this.numberOfUsers +
            '&gender=' + this.genderOfUsers
            )
                .then(response => response.json())
                .then(data => {
                    this.users = data.results
                    console.log(this)
                })
                .catch(() => this.isError = true)
                .finally(() => {
                    this.isLoading = false
                    this.render()
                })
    }

    render(){
        this.container.innerHTML = ''

        this.renderForm()
        this.renderContent()
    }

    renderContent(){
        const renderUser = user => {
            const userContainer = document.createElement('div')
            const nameDiv = document.createElement('div')
            const emailDiv = document.createElement('div')
            const dataContainer = document.createElement('div')
            const avatarDiv = document.createElement('div')
            const avatar = document.createElement('img')

            nameDiv.innerText = `${user.name.first} ${user.name.last}`
            emailDiv.innerText = user.email
            avatar.setAttribute('src', user.picture.thumbnail)

            userContainer.className = 'user__container'
            nameDiv.className = 'user__name'
            emailDiv.className = 'user__email'
            dataContainer.className = 'data__container'
            avatarDiv.className = 'user__avatar-container'
            avatar.className = 'user__avatar'

            avatarDiv.appendChild(avatar)
            dataContainer.appendChild(nameDiv)
            dataContainer.appendChild(emailDiv)
            userContainer.appendChild(avatarDiv)
            userContainer.appendChild(dataContainer)

            return userContainer
        }

        const renderUsers = () => {
            const usersContainerDiv = document.createElement('div')

            this.users.forEach(
                user => usersContainerDiv.appendChild(renderUser(user))
            )

            return usersContainerDiv
        }

        const getContent = () => {
            
            if (this.isError){
                return document.createTextNode('Wystąpił błąd! Spróbuj ponownie.')
            }
            if (this.isLoading){
                return document.createTextNode('Ładuję...')
            } 
            if (this.users === null){
                return document.createTextNode('Kliknij przycisk, żeby załadować.')
            }
            if (this.users && this.users.length === 0){
                return document.createTextNode('Nie ma żadnych użytkowników')
            }
            if (this.users) {
                return renderUsers()
            }
        }

        const div = document.createElement('div')
        div.className = 'container content-container'
        div.appendChild(getContent())
        this.container.appendChild(div)
    }

    renderForm(){
        const formsDiv = document.createElement('div')
        formsDiv.className = 'container form-container'

        const numberInput = this.renderInput('number', 'numberOfUsers')
        const textInput = this.renderInput('text', 'genderOfUsers')
        const loadButton = this.renderButton('ZAŁADUJ', this.loadUsers.bind(this))

        formsDiv.appendChild(numberInput)
        formsDiv.appendChild(textInput)
        formsDiv.appendChild(loadButton)

        this.container.appendChild(formsDiv)

        if (this.focusedElement === 'numberOfUsers') numberInput.focus()
        if (this.focusedElement === 'genderOfUsers') textInput.focus()
    }

    renderInput(type, propertyName){
        const input = document.createElement('input')
        input.setAttribute('type', type)
        input.className = 'input'

        input.value = this[propertyName]

        input.addEventListener(
            'input',
            (event) => {
                this[propertyName] = event.target.value
                this.focusedElement = propertyName
                this.render()
            }
        )

        return input
    }

    renderButton(label, onclick){
        const button = document.createElement('button')
        button.className = 'button'
        button.innerText = label

        button.addEventListener(
            'click',
            onclick
        )

        return button
    }
}