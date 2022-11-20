import { createContext, useState } from 'react'

import { IProduct } from '@/@types/product'

export interface IProductContext {
  product: IProduct[]
  setProduct: React.Dispatch<React.SetStateAction<IProduct[]>>
  setPage: React.Dispatch<React.SetStateAction<number>>
  page: number
  setCountPage: React.Dispatch<React.SetStateAction<number>>
  countPage: number
  order: 'valor' | 'fab' | 'km' | '' | null
  setOrder: React.Dispatch<React.SetStateAction<'valor' | 'fab' | 'km' | '' | null>>
  direction: 'asc' | 'desc' | '' | null
  setDirection: React.Dispatch<React.SetStateAction<'asc' | 'desc' | '' | null>>
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  isLoading: boolean
}

interface IContextProvider {
  children: React.ReactNode
}

export const ProductContext = createContext<IProductContext>({} as IProductContext)

export const ProductProvider: React.FC<IContextProvider> = ({ children }) => {
  const [product, setProduct] = useState<IProduct[]>([])
  const [page, setPage] = useState(1)
  const [countPage, setCountPage] = useState(1)
  const [order, setOrder] = useState<'valor' | 'fab' | 'km' | '' | null>(null)
  const [direction, setDirection] = useState<'asc' | 'desc' | '' | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  return (
    <ProductContext.Provider value={{
      product,
      setProduct,
      page,
      setPage,
      countPage,
      setCountPage,
      order,
      setOrder,
      direction,
      setDirection,
      isLoading,
      setIsLoading
    }}>
      {children}
    </ProductContext.Provider>
  )
}
