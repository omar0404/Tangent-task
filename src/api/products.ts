import { Product } from '../types'
import api from '../utils/api'


export const getProducts = async (page:number) => {
  return  api.get<{products:Product[]}>('/products',{params:{skip:page,limit:10}})
}