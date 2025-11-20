import axiosInstance from '@/_lib/axiosInstance'
import { API_PATH } from '@/_constants/path'
import { CategorySchema, Category } from '../schemas/category'

export const getCategories = async (): Promise<Category[]> => {
  const { data } = await axiosInstance.get(API_PATH.CATEGORY)
  return CategorySchema.array().parse(data)
}
