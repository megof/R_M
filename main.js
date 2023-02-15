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
            Number: '',
            User: [],
            Cards: [],
            Shop: [{
                    Price: 10000,
                    Amount: 100,
                   },{
                    Price: 20000,
                    Amount: 210,
                   },{
                    Price: 50000,
                    Amount: 650,
                   },{
                    Price: 100000,
                    Amount: 1500,
                   },],
            RM: 0,
        }
    },
    methods: {
        Login(){

        },
        Register(){

        },        
        Cart(){

        },        
        Logout(){

        },        
        RandomPrice(){

        },        
        
        RandomType(){

        },       
        
        ShopRM(){

        },
        
        BuyRP(){

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
    },
}).mount("#root");