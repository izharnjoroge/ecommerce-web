export interface dataInterface {
    item_id: number
    created_at: Date
    name: string
    description: string
    amount: string
    rating: string
    categoryId:string,
    image?: string
  }

export interface categoriesInterface{
  category_id: string
  created_at: Date
  name: string
  url: string
}