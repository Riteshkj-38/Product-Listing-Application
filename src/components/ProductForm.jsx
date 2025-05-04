import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { useProducts } from "./slicers/productContextSlice";
import { Button } from "@mui/material";

const ProductForm = () => {
    const navigate = useState();
    const { id } = useParams();
    const isEdit = Boolean(id);
    const [form, setForm] = useState({ title: '', price: '', description: '', image: '' });
    const [error, setError] = useState(null);
    const { state, dispatch } = useProducts();

    useEffect(() => {
        if (isEdit) {
            const product = state.products.find(p => p.id === parseInt(id));
            if (product) {
              setForm({ title: product.title, price: product.price, description: product.description, image: product.image });
            }
          }
    })

    async function handleSubmit(e) {
        e.preventDefault();
        try {
          const method = isEdit ? 'PUT' : 'POST';
          const url = isEdit ? `https://fakestoreapi.com/products/${id}` : 'https://fakestoreapi.com/products';
          const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
          });
          const data = await res.json();
          dispatch({ type: isEdit ? 'UPDATE_PRODUCT' : 'ADD_PRODUCT', payload: data });
          navigate('/');
        } catch (err) {
          setError('Failed to save product');
        }
      }

    return (
        <form onSubmit={handleSubmit} className="p-4 max-w-lg mx-auto space-y-4">
          {error && <div className="text-red-500">{error}</div>}
          {form.image && (
            <img
                src={form.image}
                alt={form.title || "Product image"}
                className="w-full h-48 object-contain"
            />
            )}
          <input className="w-full p-2 border rounded" placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
          <input className="w-full p-2 border rounded" placeholder="Price" type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required />
          <textarea className="w-full p-2 border rounded" placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />
          <input className="w-full p-2 border rounded" placeholder="Image URL" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} required />
          <Button type="submit">{isEdit ? 'Update' : 'Add'} Product</Button>
        </form>
      );
}

export default ProductForm;