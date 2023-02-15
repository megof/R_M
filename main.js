const { createApp } = Vue;
createApp({
    data() {
        return {
            Log: 0,
            Userl: '',
            Passl: '',
            Users: [],
            Name: '',
            Email: '',
            Phone: '',
            User: '',
            Cards: [],
            Shop: [{
                Price: 10000,
                Amount: 100,
            }, {
                Price: 20000,
                Amount: 210,
            }, {
                Price: 50000,
                Amount: 650,
            }, {
                Price: 100000,
                Amount: 1500,
            },],
            RM: 0,
            Page: 1,
        }
    },
    methods: {
        Login() {
            let Users = localStorage.getItem('Users');
            if (Users != null) {
                Users.map(element => {
                    if (element.Username == this.Userl) {
                        if (element.Password == this.Passl) {
                            this.Log = 2;
                            localStorage.setItem('User', JSON.stringify(element));
                            this.User = element;
                        } else {
                            swal('Error', 'Invalid Password', 'error');
                        }
                    } else {
                        swal('Error', 'Invalid Username', 'error');
                    }
                })

            }
        },
        Register() {
            let Users = JSON.parse(localStorage.getItem('Users'));
            let flag = true;
            if (Users != null) {
                Users.map(element => {
                    if (element.Username == this.Userl) {
                        swal('Error', 'Username already exist', 'error');
                        flag = false;
                    }
                })
            }
            if (flag || Users == null) {
                this.Users.push({
                    Username: this.Userl,
                    Name: this.Name,
                    Email: this.Email,
                    Phone: this.Phone,
                    Password: this.Passl,
                    RM: 0,
                    Collection: [],
                });
                localStorage.setItem('Users', JSON.stringify(this.Users));
                swal('Complete', 'User successfully registered', 'success');
            }
        },
        Cart() {

        },
        Logout() {

        },
        RandomPrice() {

        },

        RandomType() {

        },

        ShopRM() {

        },

        BuyRP() {

        },
        async ResultsC() {
            await fetch('https://rickandmortyapi.com/api/character/?page=' + this.Page)
                .then((response) => response.json())
                .then((data) => this.Cards = data.results)
            localStorage.setItem('Cards', JSON.stringify(this.Cards))
        },
    },
    mounted() {
    },
    created() {
        (localStorage.getItem('Cards') == null) ?
            this.ResultsC() :
            this.Cards = JSON.parse(localStorage.getItem('Cards'));
        if (localStorage.getItem('Users') != null) {
            this.Users = JSON.parse(localStorage.getItem('Users'));
        }
    },
}).mount("#root");