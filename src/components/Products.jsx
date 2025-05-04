import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useProducts } from "./slicers/productContextSlice";

const Products = () => {
    const [product, setProduct] = useState({id:"", title: "", product1: "", price: "", description: "", category: "", image: ""})
    const [listOfProducts, setListOfProducts] = useState([]);
    const [input, setInput] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { dispatch } = useProducts();

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
        .then((data)=> data.json()).then((data) => {
            setListOfProducts(data);
            console.log(data);
            dispatch({ type: 'SET_PRODUCTS', payload: data });
        })
        .catch((error) => {
            setErrorMsg(error);
            dispatch({ type: 'ERROR', payload: 'Failed to load products' });
            console.log("Error message", errorMsg);
        })
        .finally(()=>{
            setLoading(false);
        })
    },[]);


    return (
        <>
            {
                loading === true ? <h1> Loading....</h1> 
                : 
                (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
                        {
                            listOfProducts.map((item,index) => (
                                <div className="  grid grid-cols-2  border border-yellow-400 hover:shadow-lg cursor-pointer" key={index} onClick={() => navigate(`/product/${item.id}`)}>
                                    <p>{item.title}</p>
                                    <img src={item.image} alt={item.title} className="w-full h-48 object-contain" />
                                    <p>${item.price}</p>
                                </div>

                                // <Card key={index} className="hover:shadow-lg cursor-pointer" onClick={() => navigate(`/product/${item.id}`)}>
                                //     <CardContent>
                                //     <h2 className="text-lg font-bold">{item.title}</h2>
                                //     <p>${item.price}</p>
                                //     </CardContent>
                                // </Card>
                            ))
                        }
                    </div>
                )
            }
        </>
    )

}

export default Products;