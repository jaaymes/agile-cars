import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { useRouter } from 'next/router';

import orderBy from 'lodash/orderBy';

import { useProduct } from '@/hooks/useProduct';
import useResponsive from '@/hooks/useResponsive';

import FormProvider, { RHFRadioGroup, RHFSlider } from '@/components/hook-form';
import InputRange from '@/components/InputRange';
import Logo from '@/components/logo';
import Scrollbar from '@/components/scrollbar';
import { ShopProductSort } from '@/components/shop';

import { getCategory, getOptional } from '@/services/filters';
import { getProducts } from '@/services/products';

import { NAV } from '@/config';

import { IProduct, IProductFilter } from '@/@types/product';
import ExpandMoreIcon from '@mui/icons-material/ExpandMoreOutlined';
import { Box, Stack, Drawer, Typography, FormGroup, FormControlLabel, Checkbox, Accordion, AccordionSummary, AccordionDetails, FormControl, RadioGroup, Radio } from '@mui/material';

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
  category: 'All',
  colors: [],
  priceRange: [0, 200],
  rating: '',
  sortBy: 'featured',
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
  const { pathname } = useRouter();
  const { setProduct, product } = useProduct()

  const [filters, setFilters] = useState<IProductFilter>(defaultValues);
  const [selected, setSelected] = useState<string[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [optionals, setOptionals] = useState<IOptionals[]>([]);
  const [categories, setCategories] = useState<ICategories[]>([]);

  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChangeAccordion =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const dispatch = useDispatch();

  const isDesktop = useResponsive('up', 'lg');

  const methods = useForm<IProductFilter>({
    defaultValues,
  });

  const marksLabel = [...Array(21)].map((_, index) => {
    const value = index * 10;

    const firstValue = index === 0 ? `$${value}` : `${value}`;

    return {
      value,
      label: index % 4 ? '' : firstValue,
    };
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

  useEffect(() => {
    console.log(filters)
  }, [filters]);

  const handleProducts = async () => {
    const products = await getProducts()
    console.log('products return', products)
    setProduct(products.collection)
    setProducts(products.collection)
  }

  const handleGetOptional = async () => {
    const optional = await getOptional()
    setOptionals(optional.collection)
    // console.log('optional return', optional)
  }

  const handleGetCategory = async () => {
    const category = await getCategory()
    const categorysReturn = category.collection.map((item: { descricaoCategoria: any; idCategoria: any; }) => ({
      label: item.descricaoCategoria,
      value: item.idCategoria
    }))
    categorysReturn.unshift({ label: 'Todos', value: 'todos' })
    setCategories(categorysReturn)
  }

  useEffect(() => {
    handleProducts()
    handleGetOptional()
    handleGetCategory()
  }, []);

  useEffect(() => {
    if (filters.category === 'Todos') {
      setProducts(products)
    }
    if (filters.optional) {
      setProduct(applyFilter(products, filters))
    } if (filters.category !== 'Todos') {
      setProduct(applyFilter(products, filters))
    } else {
      setProduct(products)
    }
  }, [filters]);

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [pathname]);

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
        {/* <Stack spacing={1} sx={{ px: 1.5 }}>
          <ShopProductSort />
        </Stack> */}
        <Stack spacing={3} sx={{ p: 2.5 }}>

          <Accordion expanded={expanded === 'panel1'} onChange={handleChangeAccordion('panel1')}>
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
                        onChange={() => handleChange(option.descricaoOpcional)}
                      />
                    }
                    label={option.descricaoOpcional}
                  />
                ))}
              </FormGroup>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'panel2'} onChange={handleChangeAccordion('panel2')}>
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
                            category: category.label
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

            <Stack direction="row" spacing={2}>
              <InputRange type='min' />
              <InputRange type='max' />
            </Stack>

            <RHFSlider
              onChange={(e, value) => setFilters({
                ...filters,
                priceRange: value as number[]
              })}
              name="priceRange"
              value={filters.priceRange}
              step={10}
              min={0}
              max={200}
              marks={marksLabel}
              getAriaValueText={(value) => `$${value}`}
              valueLabelFormat={(value) => `$${value}`}
              sx={{ alignSelf: 'center', width: `calc(100% - 20px)` }}
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
  const { optional, category, priceRange } = filters;

  const min = priceRange[0];

  const max = priceRange[1];

  if (optional.length) {
    products = products.filter((product) => optional.includes(product.obs));
  }

  if (category !== 'todos') {
    products = products.filter((product) => product.descricaoCategoria === category);
  }

  if (min !== 0 || max !== 200) {
    products = products.filter((product) => product.valor >= min && product.valor <= max);
  }
  return products;
}