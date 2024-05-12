import { Product } from '../types'
import api from '../utils/api'


export const getProducts = async () => {
  return  api.get<{products:Product[]}>('/products')
}