import { createContext, useState } from 'react'

import { IProduct } from '@/@types/product'

export interface IProductContext {
  product: IProduct[]
  setProduct: React.Dispatch<React.SetStateAction<IProduct[]>>
  setPage: React.Dispatch<React.SetStateAction<number>>
  page: number
  setCountPage: React.Dispatch<React.SetStateAction<number>>
  countPage: number
}

interface IContextProvider {
  children: React.ReactNode
}

export const ProductContext = createContext<IProductContext>({} as IProductContext)

export const ProductProvider: React.FC<IContextProvider> = ({ children }) => {
  const [product, setProduct] = useState<IProduct[]>([])
  const [page, setPage] = useState(1)
  const [countPage, setCountPage] = useState(1)


  return (
    <ProductContext.Provider value={{
      product,
      setProduct,
      page,
      setPage,
      countPage,
      setCountPage
    }}>
      {children}
    </ProductContext.Provider>
  )
}
