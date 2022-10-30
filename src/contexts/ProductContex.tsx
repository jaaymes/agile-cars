import { createContext, useState } from 'react'

import { IProduct } from '@/@types/product'

export interface IProductContext {
  product: IProduct[]
  setProduct: React.Dispatch<React.SetStateAction<any>>
}

interface IContextProvider {
  children: React.ReactNode
}

export const ProductContext = createContext<IProductContext>({} as IProductContext)

export const ProductProvider: React.FC<IContextProvider> = ({ children }) => {
  const [product, setProduct] = useState<any>(null)


  return (
    < ProductContext.Provider value={{ product, setProduct }}>
      {children}
    </ProductContext.Provider >
  )
}
