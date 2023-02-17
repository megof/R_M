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
            Card:'',
        }
    },
    methods: {
        Login() {
            let Users = JSON.parse(localStorage.getItem('Users'));
            let flag = false;
            if (Users != null) {
                Users.map(element => {
                    if (element.Username==this.Userl) {
                        flag = true;
                        if (element.Password == this.Passl) {
                            this.Log = 2;
                            localStorage.setItem('User', JSON.stringify(element));
                            this.User = element;
                        } else {
                            swal('Error', 'Invalid Password', 'error');
                        }
                    }
                }); 
                if(!flag){
                    swal('Error', 'Invalid Username', 'error');
                }

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
                this.Log=0;
            }
        },
        Cart(Card) {
            this.Card = Card;
            this.Log=6;
        },
        Logout() {

        },

        ShopRM() {
            this.User.RM += this.RM;
            let Users = [];
            this.Users.map(element => {
                (element.Username == this.User.Username)?
                    Users.push(this.User):
                    Users.push(element)
            })
            this.Users = Users;
            localStorage.setItem('User', JSON.stringify(this.User));
            localStorage.setItem('Users', JSON.stringify(this.Users));
            this.Log = 2;
            this.RM = 0;
            swal('Purchased', 'Succeddfully purchased', 'success');
        },

        BuyRM(Amount) {
            this.RM = Amount;
            this.Log = 5;
        },
        ing(){
            let Users = JSON.parse(localStorage.getItem('Users'));
            if (Users == null) {
                this.Users.push({
                    Username: 'A',
                    Name: 'B',
                    Email: 'C',
                    Phone: 0,
                    Password: 'D',
                    RM: 0,
                    Collection: [],
                });
                localStorage.setItem('Users', JSON.stringify(this.Users));
            }
            this.Userl='A';
            this.Passl='D';
            this.Log = 2;
            this.Login();
        },
        async ResultsC() {
            let Cards = [];
            let Card = '';
            let Type = 0;
            await fetch('https://rickandmortyapi.com/api/character/?page=' + this.Page)
                .then((response) => response.json())
                .then((data) => Cards = data.results)
            Cards.map(element =>{
                Type = Math.floor(Math.random() * 16);
                Card = element;
                Card.Price = Math.floor(Math.random() * 1101)+100;
                Card.Type = Type>10;                 
                this.Cards.push(Card)
            })
            let Aux = [];
            Aux.push(Cards.slice(0,4));
            Aux.push(Cards.slice(4,8));
            Aux.push(Cards.slice(8,12));
            Aux.push(Cards.slice(12,16));
            Aux.push(Cards.slice(16,20));
            localStorage.setItem('pt',JSON.stringify(Aux))
            this.Cards = Aux;
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