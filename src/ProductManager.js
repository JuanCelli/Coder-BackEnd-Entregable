import fs from 'fs';
import { validationProduct } from './utils/validationProduct.js';

class ProductManager{
    #pathFile = "src/data/products.json"

    constructor(){
        this.products = this.readFile(this.#pathFile)
    }

    addProduct(product){
        if(this.products.find(productJustAdded => productJustAdded.code === product.code)){
            return console.log(`El producto que intenta añadir ya fue agregado (code: ${product.code})`)
        }

        this.products.length===0 ? product.id = 1 : product.id = this.products[this.products.length-1].id + 1


        if(!validationProduct(product)){
            console.log("El producto no se ha agregado, debe completar todos los campos requeridos")
        }else{
            this.products.push(product)
            this.saveFile()
        }
    }

    deleteProduct(id){
        if(!this.products.find(product => product.id === id)){
            console.log(`El id del producto que intenta eliminar no existe`)
        }else{
            this.products = this.products.filter(product => product.id !== id)
            this.saveFile()
        }
    }
    getProducts (){
        return this.products
    }

    getProductById(id){
        return this.products.find(product => product.id ===id) ?? console.log(`Not found`)
    }

    updateProduct(id, newProduct){
        if(!validationProduct(newProduct)){
            console.log(validationProduct(newProduct))
            return console.log("El producto no se ha modificado, debe completar todos los campos requeridos")
        }

        if(!this.products.find(product => product.id === id)){
            console.log(`El id del producto que intenta actualizar no existe`)
        }else{
            this.products = this.products.map(product => product.id === id ? {id:product.id, ...newProduct} : product)
            this.saveFile()
        }
    }

    async saveFile(){
        try{
            if(this.products.length===0){
                await fs.promises.unlink(this.#pathFile)
            }else{
                await fs.promises.writeFile(this.#pathFile, JSON.stringify(this.products, null,"\t"))
                console.log("Las modificaciones han sido guardadas")
            }
        }catch(error){
            console.log(error)
        }
    }

    readFile(path){
        console.log(path)
        if(fs.existsSync(path)){
            try{
                return JSON.parse(fs.readFileSync(path, "utf-8"))
            }catch{
                return []
            }
        }else{
            console.log("asdas")
            return [];
        }
    }
}





export default ProductManager

