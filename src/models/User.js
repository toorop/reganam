class User {
    nic = ''
    region = 'ovh-eu'
    ck = ''


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
            this.ck = u.ck
            this.nic = u.nic
            this.region = u.region
        }
    }

    reset = () => {
        this.nic=''
        this.ck=''
        //this.region=''
        this.save()
    }

    // setters (shortcut)
    setCk = (key) => {
        this.ck = key
        this.save()
    }

    setNick = (nic) => {
        this.nic=nic
        this.save()
    }

    setRegion = (region) => {
        this.region = region
        this.save()
    }



}

let user = new User()

export default user