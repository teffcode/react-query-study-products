import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'

import { type IProduct } from '../Products/types.d';

export default function Product(): JSX.Element {
  const { id } = useParams()
  const { data, isLoading, error } = useQuery<IProduct>(`products/${id}`)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Something went wrong...</div>

  return <div>Product with id: {data?.id} and title {data?.title}</div>
}
