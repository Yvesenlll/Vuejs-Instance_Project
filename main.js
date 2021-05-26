var app = new Vue({
    el: '#app',
    data: {
        product: 'Socks',
        discription: 'this a description',
        image: 'vmSocks-green-onWhite.jpeg',
        inStock: true,
        details: ["80% contton", "20% polyester", "Gender-neutral"],
        variants: [
            {
                variantId: 2234,
                variantColor: 'green',
                variantImage: 'vmSocks-green-onWhite.jpeg'
            },
            {
                variantId: 2235,
                variantColor: 'blue',
                variantImage: 'vmSocks-blue-onWhite.jpeg'
            }
        ],
        cart: 0
    },
    methods: {
        addToCart: function (){
            this.cart += 1;
        },
        updateProduct(variantImage){
            this.image = variantImage;
        }
    }
})
