import express from "express"
import ProductManager from "./ProductManager.js"
import { validationNumPositive } from "./utils/validationNumPositive.js"


const app = express()
const PORT = 3000 

const productManager = new ProductManager()



app.listen(PORT, ()=>{
    console.log(`Server activo en puerto ${PORT}`)
})

app.get("/products", (req,res)=>{
    const {limit} = req.query

    if(limit){
        res.json({products:productManager.getProducts().slice(0,validationNumPositive(limit))})
    }else{
        res.json({products:productManager.getProducts()})
    }
})

app.get("/products/:id", (req,res)=>{
    const error = {
        error:"Product Not Found"
    }
    const {id} = req.params

    const productFound = productManager.getProducts().find(product=>product.id===Number(id))

    productFound ? res.json(productFound) : res.json(error)
})


