import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

import { type IProduct } from './types.d';

export default function Products(): JSX.Element {
  const { data, isLoading, error } = useQuery<IProduct[]>('products')

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Something went wrong...</div>

  return (
    <ul>
      {
        data?.map((product: IProduct, index: number): JSX.Element => (
          <li key={index}>
            <Link to={`/products/${product.id}`}>{product.id} · {product.title}</Link>
          </li>
        ))
      }
    </ul>
  )
}
