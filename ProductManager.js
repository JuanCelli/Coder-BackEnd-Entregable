class ProductManager{

    constructor(){
        this.products = [];
    }

    addProduct(product){
        if(this.products.find(productJustAdded => productJustAdded.code === product.code)){
            return console.log(`El producto que intenta añadir ya fue agregado (code: ${this.products.find(productJustAdded => productJustAdded.code === product.code).code})`)
        }
        
        this.products.length===0 ? product.id = 1 : product.id = this.products[this.products.length-1].id + 1 
        
        Object.keys(product).find(key => product[key]=== undefined) === undefined ? this.products.push(product) : console.log("El producto no se ha agregado, debe completar todos los campos requeridos")
    }

    getProducts (){
        return this.products
    }

    getProductById(id){
        const product = this.products.find(product => product.id ===id)
        return product!==undefined ? product : console.log(`Not found`)
    }
}

class Product{
    constructor(title, description, price, thumbnail, code, stock){
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}

const productManager = new ProductManager()
console.log(productManager.getProducts())


productManager.addProduct(new Product("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123",25))
console.log(productManager.getProducts())

productManager.addProduct(new Product("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123",25))

console.log(productManager.getProductById(1))
console.log(productManager.getProductById(2))

