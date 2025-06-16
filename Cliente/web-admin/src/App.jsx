import { useState, useEffect } from 'react'
import { getProducts } from './api/products'

function App() {
  const [products, setProducts] = useState([])
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts()
        setProducts(response.data)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }
    fetchProducts()
    }, [])
  return (
    <>
      <h1>Products</h1>
      <ul>
        {products.map((product, i) => (
          <li key={i + 1}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
