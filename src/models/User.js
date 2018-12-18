class User {
    nic = ''
    ck = {
        key: '',
        state: ''
    }

    save = () => {
        localStorage.setItem('user', JSON.stringify(this))
    }

    load = () => {
        let u = localStorage.getItem('user')
        if (u !== null) {
            try {
                u = JSON.parse(u)
            } catch (e) {
                localStorage.removeItem('user')
                return
            }
            this.ck.key = u.ck.key
            this.ck.state = u.ck.state
            this.nic = u.nic
        }
    }

    // setters (shortcut)
    setCk = (key, state) => {
        this.ck.key = key
        this.ck.state = state
        this.save()
    }

    setNick = (nic) => {
        this.nic=nic
        this.save()
    }



}

let user = new User()

export default user