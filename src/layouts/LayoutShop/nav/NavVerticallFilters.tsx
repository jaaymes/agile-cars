import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useProduct } from '@/hooks/useProduct';
import useResponsive from '@/hooks/useResponsive';

import FormProvider, { RHFSlider } from '@/components/hook-form';
import InputRange from '@/components/InputRange';
import Logo from '@/components/logo';
import Scrollbar from '@/components/scrollbar';

import { fCurrencyBR } from '@/utils/formatNumber';

import { getCategory, getOptional } from '@/services/filters';
import { getMarcas, getProducts } from '@/services/products';

import { NAV } from '@/config';

import { IProduct, IProductFilter } from '@/@types/product';
import ExpandMoreIcon from '@mui/icons-material/ExpandMoreOutlined';
import { Box, Stack, Drawer, Typography, FormGroup, FormControlLabel, Checkbox, Accordion, AccordionSummary, AccordionDetails, FormControl, RadioGroup, Radio, Slider } from '@mui/material';

type Props = {
  openNav: boolean;
  onCloseNav: VoidFunction;
};

export const FILTER_GENDER_OPTIONS = [
  { label: 'Men', value: 'Men' },
  { label: 'Women', value: 'Women' },
  { label: 'Kids', value: 'Kids' },
];

const defaultValues = {
  optional: [],
  category: 'todos',
  price: [0, 400000],
  marcas: 'todos',
};

interface IOptionals {
  idOpcional: number;
  descricaoOpcional: string;
}

interface ICategories {
  label: string;
  value: any;
}

export const FILTER_CATEGORY_OPTIONS = [
  { label: 'All', value: 'All' },
  { label: 'Shose', value: 'Shose' },
  { label: 'Apparel', value: 'Apparel' },
  { label: 'Accessories', value: 'Accessories' },
];

export const FILTER_RATING_OPTIONS = ['up4Star', 'up3Star', 'up2Star', 'up1Star'];

export const FILTER_COLOR_OPTIONS = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107',
];

export default function NavVerticalFilters({ openNav, onCloseNav }: Props) {
  const { setProduct } = useProduct()

  const [filters, setFilters] = useState<IProductFilter>(defaultValues);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [optionals, setOptionals] = useState<IOptionals[]>([]);
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [marcas, setMarcas] = useState<ICategories[]>([]);
  const [price, setPrice] = useState<number[]>([]);

  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChangeAccordion =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      // scroll focus when click accordion
      if (isExpanded) {
        const element = document.getElementById(panel);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
      setExpanded(isExpanded ? panel : false);
    };

  const isDesktop = useResponsive('up', 'lg');

  const methods = useForm<IProductFilter>({
    defaultValues,
  });

  const handleChange = (value: string) => {
    const { optional } = filters;

    const optionalExist = optional.find(item => item === value)

    if (!optionalExist) {
      setFilters({
        ...filters,
        optional: [...optional, value],
      });
    }
    else {
      setFilters({
        ...filters,
        optional: optional.filter((e) => e !== value),
      });
    }
  }

  const handleProducts = async () => {
    const products = await getProducts()
    const productWithImages = products.collection.map((product: any) => ({
      ...product,
      images: [product?.foto1, product?.foto2, product?.foto3, product?.foto4, product?.foto5, product?.foto6, product?.foto7, product?.foto8].filter(index =>
        index !== undefined
      ),
      opcionaisArray: product?.opcionais?.replaceAll(/\s/g, '').split(',')
    }))
    // pegar maior valor e menor valor 
    const maxPrice = Math.max(...productWithImages.map((product: any) => product?.valor))
    const minPrice = Math.min(...productWithImages.map((product: any) => product?.valor))
    setPrice([Math.ceil(minPrice), Math.ceil(maxPrice)])
    setProduct(productWithImages)
    setProducts(productWithImages)
  }

  const handleGetOptional = async () => {
    const optional = await getOptional()
    setOptionals(optional.collection)
  }

  const handleGetCategory = async () => {
    const category = await getCategory()
    const categorysReturn = category.collection.map((item: { descricaoCategoria: any; idCategoria: any; }) => ({
      label: item.descricaoCategoria,
      value: item.descricaoCategoria
    }))
    categorysReturn.unshift({ label: 'Todos', value: 'todos' })
    setCategories(categorysReturn)
  }

  const handleGetMarcas = async () => {
    const { collection: marcasResponse } = await getMarcas()
    const marcasReturn = marcasResponse.map((item: { descricaoMarca: any; idMarca: any; }) => ({
      label: item.descricaoMarca,
      value: item.descricaoMarca.toUpperCase()
    }))
    console.log('marcasReturn', marcasReturn)
    marcasReturn.unshift({ label: 'Todos', value: 'todos' })
    setMarcas(marcasReturn)
  }

  const handleChangeRangePrice = (event: Event, newValue: number | number[]) => {
    setPrice(newValue as number[]);
  };

  useEffect(() => {
    handleProducts()
    handleGetOptional()
    handleGetCategory()
    handleGetMarcas()
  }, []);

  useEffect(() => {
    if (filters.optional.length > 0) {
      setProduct(applyFilter(products, filters))
    }
    if (filters.category) {
      setProduct(applyFilter(products, filters))
    }
    if (filters.marcas) {
      setProduct(applyFilter(products, filters))
    }
    if (filters.optional.length < 1 || filters.category === 'todos' || filters.marcas === 'todos') {
      setProduct(applyFilter(products, filters))
    }
  }, [filters]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (event.target.id === "left") {
      // Left input box is changed
      const newValue = [event.target.value, price[1]];
      // @ts-ignore
      setPrice(newValue);
    } else {
      // Right input box is changed
      const newValue = [price[0], event.target.value];
      // @ts-ignore
      setPrice(newValue);
    }
  };

  useEffect(() => {
    setFilters({
      ...filters,
      price: [price[0], price[1]]
    })
  }, [price]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Stack
        spacing={3}
        sx={{
          pt: 3,
          pb: 2,
          px: 2.5,
          flexShrink: 0,
        }}
      >
        <Logo />

      </Stack>
      <FormProvider methods={methods}>
        <Stack spacing={3} sx={{ p: 2.5 }}>
          <Accordion expanded={expanded === 'panel1'} onChange={handleChangeAccordion('panel1')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                Marcas
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                  {
                    marcas.map((marca) => (
                      <FormControlLabel key={marca.value} value={marca.label} control={<Radio />} label={marca.label} onChange={
                        () => {
                          setFilters({
                            ...filters,
                            marcas: marca.value
                          })
                        }
                      } />
                    ))
                  }
                </RadioGroup>
              </FormControl>
            </AccordionDetails>
          </Accordion>

          <Accordion expanded={expanded === 'panel2'} onChange={handleChangeAccordion('panel2')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                Opcionais
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormGroup>
                {optionals.map((option) => (
                  <FormControlLabel
                    key={option.idOpcional}
                    control={
                      <Checkbox
                        onChange={() => handleChange(option.descricaoOpcional.replaceAll(/\s/g, ''))}
                      />
                    }
                    label={option.descricaoOpcional}
                  />
                ))}
              </FormGroup>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'panel3'} onChange={handleChangeAccordion('panel3')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>Categorias</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                  {
                    categories.map((category) => (
                      <FormControlLabel key={category.value} value={category.label} control={<Radio />} label={category.label} onChange={
                        () => {
                          setFilters({
                            ...filters,
                            category: category.label.toLowerCase()
                          })
                        }
                      } />
                    ))
                  }
                </RadioGroup>
              </FormControl>
              {/* <RHFRadioGroup name="category" options={categories} row={false} value={filters.category} onChange={(e) => setFilters({
                ...filters,
                category: e.target.name,
              })} /> */}
            </AccordionDetails>
          </Accordion>
          <Stack spacing={1} sx={{ pb: 2 }}>
            <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
              Valor
            </Typography>

            <Stack direction="column" spacing={2}>
              <InputRange id="left" type='min' value={String(price[0])} setValue={handleInputChange} />
              <InputRange id="right" type='max' value={String(price[1])} setValue={handleInputChange} />
            </Stack>

            <Slider
              getAriaLabel={() => 'Preço dos Carros'}
              value={price}
              max={400000}
              min={0}
              defaultValue={price}
              onChange={handleChangeRangePrice}
              valueLabelDisplay="auto"
              getAriaValueText={(value) => `R$ ${fCurrencyBR(value)}`}
              valueLabelFormat={(value) => `R$ ${fCurrencyBR(value)}`}
            />
          </Stack>
        </Stack>
      </FormProvider>
      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_DASHBOARD },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV.W_DASHBOARD,
              bgcolor: 'transparent',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: {
              width: NAV.W_DASHBOARD,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}


function applyFilter(products: IProduct[], filters: IProductFilter) {
  const { optional, category, price, marcas } = filters;

  const min = price[0];

  const max = price[1];

  if (optional.length) {
    products = products.filter((product) => product?.opcionaisArray?.some((opt) => optional.includes(opt)));
  }

  if (category !== 'todos') {
    products = products.filter((product) => product.descricaoCategoria === category);
  }

  if (marcas !== 'todos') {
    products = products.filter((product) => product.descricaoMarca === marcas);
  }

  if (min !== 0 || max !== 400000) {
    products = products.filter((product) => product.valor >= min && product.valor <= max);
  }

  console.log('productsFiltred', products)

  return products;
}