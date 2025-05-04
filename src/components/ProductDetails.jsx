import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material"; // or wherever your Button comes from

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null); // ✅ Add this

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError("Failed to load product");
      }
    }
    fetchProduct();
  }, [id]);

  const handleDelete = () => {
    console.log("Delete logic here");
  };

  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!product) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
      <img src={product.image} alt={product.title} className="w-48 mb-4" />
      <p className="mb-2">{product.description}</p>
      <p className="mb-4 font-semibold">Price: ${product.price}</p>
      <Button onClick={() => navigate(`/edit/${id}`)} className="mr-2">
        Edit
      </Button>
      <Button onClick={handleDelete} color="error">
        Delete
      </Button>
    </div>
  );
};

export default ProductDetails;
