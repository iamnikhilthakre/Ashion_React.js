import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { products as localProducts } from '../data/products'

function ProductList() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Simulate network request
        setTimeout(() => {
            setProducts(localProducts)
            setLoading(false)
        }, 300)
    }, [])

    if (loading) return <div className="text-center py-5"><h3>Loading products...</h3></div>

    return (
        <div className="row g-4">
            {
                products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))
            }
        </div>
    )
}

export default ProductList
