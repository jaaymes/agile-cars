export type IProduct = {
  opcionais: string;
  opcionaisArray: string[];
  idVeiculo: number
  idFranqueado: number
  idMarca: number
  idModelo: number
  idModeloVersao: number
  idCategoria: number
  chassi: string
  descricaoMarca: string
  descricaoModelo: string
  descricaoModeloVersao: string
  descricaoCategoria: string
  placa: string
  fab: number
  mod: number
  cor: string
  valor: number
  km: number
  obs: string
  franqueado: string
  whatsapp: string
  renavam: number
  images: string[]
};

export type IProductFilter = {
  optional: string[];
  category: {
    label: string;
    value: string;
  };
  marcas: {
    label: string;
    value: string;
  };
  price: number[];
  modelos: {
    label: string;
    value: string;
  }
  modelosVersao: {
    label: string;
    value: string;
  }
};

// ----------------------------------------------------------------------

export type ICheckoutCartItem = {
  id: string;
  name: string;
  cover: string;
  available: number;
  price: number;
  colors: string[];
  size: string;
  quantity: number;
  subtotal: number;
};

export type ICheckoutBillingAddress = {
  receiver: string;
  phone: string;
  fullAddress: string;
  addressType: string;
  isDefault: boolean;
};

export type ICheckoutDeliveryOption = {
  value: number;
  title: string;
  description: string;
};

export type ICheckoutPaymentOption = {
  value: string;
  title: string;
  description: string;
  icons: string[];
};

export type ICheckoutCardOption = {
  value: string;
  label: string;
};

// ----------------------------------------------------------------------

export type IProductCheckoutState = {
  activeStep: number;
  cart: ICheckoutCartItem[];
  subtotal: number;
  total: number;
  discount: number;
  shipping: number;
  billing: ICheckoutBillingAddress | null;
  totalItems: number;
};

export type IProductState = {
  isLoading: boolean;
  error: Error | string | null;
  products: IProduct[];
  product: IProduct | null;
  checkout: IProductCheckoutState;
};
