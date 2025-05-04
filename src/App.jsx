import { lazy, Suspense, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Products from './components/Products'
import { ErrorBoundary } from 'react-error-boundary'
import ProductDetails from './components/ProductDetails'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import ProductForm from './components/ProductForm'
import { ProductProvider } from './components/slicers/productContextSlice'

function App() {
  const [count, setCount] = useState(0)
  const ProductList = lazy(()=> import("./components/Products"))

  // return (
  //   <>
  //   <ErrorBoundary fallback = {<div>Something went wrong</div>}>
  //     <div>
  //       Hello
  //       <Suspense fallback = {<p>Lazy Loading ....</p>}>
  //         <ProductList/>
  //         <Route path="/product/:id" element = {<ProductDetails/>}/>
  //       </Suspense>
  //     </div>
  //   </ErrorBoundary>
  //   </>
  // )


  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <BrowserRouter>
        <ProductProvider>
            <Suspense fallback={<p>Lazy Loading ....</p>}>
              <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path = "/edit/:id" element = {<ProductForm/>}/>
              </Routes>
            </Suspense>
        </ProductProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App
