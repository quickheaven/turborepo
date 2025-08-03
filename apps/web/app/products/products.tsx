import { Product } from "@repo/types";

export default async function Products() {
  const response = await fetch('http://localhost:3001/products', {
    next: { tags: ["products"] },
  });
  console.dir(response);
  const products: Product[] = await response.json();

  return (
    <div>
      <h1>Products</h1>
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <p>Name: {product.name}</p>
            <p>Price: {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}