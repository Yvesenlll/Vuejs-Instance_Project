// ---------------------Product----------------------
Vue.component('product', {
    props:{
        premium:{
            type: Boolean,
            required: true
        }
    },
    template:`
    <div class="product">
    <div class="product-image">
        <img :src="image" alt="Socks">
    </div>

    <div class="product-info">
        <h1>{{title}}</h1>
        <!-- <p>{{discription}}</p> -->
        <p v-if="inStock">In Stock</p>
        <p v-else>Out of Stock</p>
        <p> Shipping is {{shipping}} <p>

        <ul>
            <!-- it also can use to iterate projects. -->
            <li v-for="detail in details"> {{detail}}</li>
        </ul>

        <div v-for="(variant, index) in variants" 
            :key="variant.variantId"
            class="color-box"
            :style="{backgroundColor:variant.variantColor}"
            @mouseover="updateProduct(index)">
        </div>

        <button v-on:click="addToCart" 
                :disabled = "!inStock"
                :class="{disabledButton: !inStock}">
                Add to cart
        </button>
    </div>

    <div>
        <h2>Review</h2>
        <p v-if="!reviews.length">There is no review yet.</p>
        <ul>
            <li v-for="review in reviews">
                <p>Name: {{review.name}}</p>
                <p>Rating: {{review.rating}}</p>
                <p>Details: {{review.review}}</p>
            </li>
        </ul>
    </div>


    <product-review @review-submitted="addReview"></product-review>
    
</div>
    `,
    data(){
        return {product: 'Socks',
        brand: 'Vue Mastery',
        discription: 'this a description',
        details: ["80% contton", "20% polyester", "Gender-neutral"],
        selectedVariant:0,
        variants: [
            {
                variantId: 2234,
                variantColor: 'green',
                variantImage: 'vmSocks-green-onWhite.jpeg',
                variantQuantity: 0
            },
            {
                variantId: 2235,
                variantColor: 'blue',
                variantImage: 'vmSocks-blue-onWhite.jpeg',
                variantQuantity: 10
            }
        ],
        reviews:[]
    }
   },
   methods: {

    addToCart() {
        this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
      },
    updateProduct(index){
        this.selectedVariant = index;
        console.log(index);
    },
    addReview(productReview) {
        this.reviews.push(productReview)
    }
},
computed:{
    title(){
        return this.brand + ' ' + this.product
    },
    image(){
        return this.variants[this.selectedVariant].variantImage
    },
    inStock(){
        return this.variants[this.selectedVariant].variantQuantity
    },
    shipping(){
        if(this.premium){
            return "Free"
        }else{
            return 2.99
        }
    }
    }
})

// -----------------Product-review-------------------------

Vue.component('product-review', {
    template: `
    <form @submit.prevent="onSubmit" class="review-form">

    <p v-if="errors.length">
        <b>Please correct the following error(s)</b>
        <ul>
            <li v-for="error in errors">{{error}}</li>
        </ul>
    </p>
    
    <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" placeholder="name"> 
    </p>

    <p>
        <label for="review">Review:</label>
        <textarea name="review" id="review" v-model="review" placeholder="review"></textarea>
    </p>

    <p>
        <label for="rating">Rating:</label>
        <select name="reating" id="rating" v-model.number = "rating">
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
        </select>
    </p>

    <p>
        <input type="submit" value="submit">
    </p>

</form>    
    `,
    data(){
        return {
            name: null,
            review: null,
            rating: null,
            errors: []
        }
    },
    methods:{
        onSubmit(){
            if(this.name && this.review && this.rating){
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating
                }
                this.$emit('review-submitted', productReview)
                this.name= null
                this.review = null
                this.rating = null
            }else{
                if(!this.name) this.errors.push('Name required.')
                if(!this.review) this.errors.push('Review required.')
                if(!this.rating) this.errors.push('Rating required.')
            }
        }
    }
})

// -------------------------APP-------------------


var app = new Vue({
    el: '#app',
    data: {
        premium: false,
        cart:[]
    },
    methods:{
        updateCart(id){
            this.cart.push(id)
        }
    }
})
