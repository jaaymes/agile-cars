import { useContext } from "react"

import { IProductContext, ProductContext } from "@/contexts/ProductContex"

export const useProduct = (): IProductContext => {
  const context = useContext(ProductContext)

  if (!context) {
    throw new Error('The hook useModal must be used within an ModalProvider')
  }

  return context
}
