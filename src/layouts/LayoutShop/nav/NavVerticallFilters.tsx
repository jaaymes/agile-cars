import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useProduct } from '@/hooks/useProduct';
import useResponsive from '@/hooks/useResponsive';

import FormProvider from '@/components/hook-form';
import InputRange from '@/components/InputRange';
import Logo from '@/components/logo';
import Scrollbar from '@/components/scrollbar';

import { fCurrencyBR } from '@/utils/formatNumber';

import { getCategory, getOptional } from '@/services/filters';
import { getMarcas, getModelos, getModelosVersao, getProducts } from '@/services/products';

import { NAV } from '@/config';

import { IProduct, IProductFilter } from '@/@types/product';
import ExpandMoreIcon from '@mui/icons-material/ExpandMoreOutlined';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Box, Stack, Drawer, Typography, FormGroup, FormControlLabel, Checkbox, Accordion, AccordionSummary, AccordionDetails, FormControl, RadioGroup, Radio, Slider, Button } from '@mui/material';

type Props = {
  openNav: boolean;
  onCloseNav: VoidFunction;
};

const defaultValues = {
  optional: [],
  category: {
    value: 'todos',
    label: 'Todas',
  },
  price: [0, 400000],
  marcas: {
    value: 'todos',
    label: 'Todas',
  },
  modelos: {
    value: 'todos',
    label: 'Todos',
  },
  modelosVersao: {
    value: 'todos',
    label: 'Todos',
  }
};

interface IOptionals {
  idOpcional: number;
  descricaoOpcional: string;
}

interface ICategories {
  label: string;
  value: any;
}


export default function NavVerticalFilters({ openNav, onCloseNav }: Props) {
  const { setProduct } = useProduct()

  const [filters, setFilters] = useState<IProductFilter>(defaultValues);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [optionals, setOptionals] = useState<IOptionals[]>([]);
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [marcas, setMarcas] = useState<ICategories[]>([]);
  const [price, setPrice] = useState<number[]>([]);
  const [modelos, setModelos] = useState<ICategories[]>([]);
  const [modelosVersao, setModelosVersao] = useState<ICategories[]>([]);

  const [expanded, setExpanded] = useState<string | false>('panel1');

  const [numberOfitemsShown, setNumberOfItemsToShown] = useState(8);

  const showMore = () => {
    if (numberOfitemsShown + 3 <= optionals.length) {
      setNumberOfItemsToShown(numberOfitemsShown + 5);
    } else {
      setNumberOfItemsToShown(optionals.length);
    }
  };

  const handleChangeAccordion = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  const isDesktop = useResponsive('up', 'lg');

  const methods = useForm<IProductFilter>({
    defaultValues,
  });

  const handleReset = () => {
    setFilters({
      ...filters,
      optional: [],
    });
  }

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
      label: item.descricaoMarca.toUpperCase(),
      value: item.idMarca
    }))
    marcasReturn.unshift({ label: 'Todos', value: 'todos' })
    setMarcas(marcasReturn)
  }

  const handleGetModelos = async () => {
    const { collection: modelosResponse } = await getModelos(Number(filters.marcas.value))
    const modelosReturn = modelosResponse.map((item: { descricaoModelo: any; idModelo: any; }) => ({
      label: item.descricaoModelo,
      value: item.idModelo
    }))
    modelosReturn.unshift({ label: 'Todos', value: 'todos' })
    setModelos(modelosReturn)
  }

  const handleGetModeloVersao = async () => {
    const { collection: modeloVersaoResponse } = await getModelosVersao(Number(filters.modelos.value))
    const modeloVersaoReturn = modeloVersaoResponse.map((item: { descricaoModeloVersao: any; idModeloVersao: any; }) => ({
      label: item.descricaoModeloVersao,
      value: item.idModeloVersao
    }))
    modeloVersaoReturn.unshift({ label: 'Todos', value: 'todos' })
    setModelosVersao(modeloVersaoReturn)
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
    if (filters.modelos.value !== 'todos') {
      handleGetModeloVersao()
    }
  }, [filters.modelos.value]);

  useEffect(() => {
    if (filters.marcas.value !== 'todos') {
      handleGetModelos()
    }
  }, [filters.marcas.value]);

  useEffect(() => {
    handleReset()
  }, [filters.marcas]);

  useEffect(() => {
    if (filters.optional.length > 0) {
      setProduct(applyFilter(products, filters))
    }
    if (filters.category.value !== 'todos') {
      setProduct(applyFilter(products, filters))
    }
    if (filters.marcas.value !== 'todos') {
      setProduct(applyFilter(products, filters))
      setExpanded('panel2')
    }
    if (filters.modelos.value !== 'todos') {
      setExpanded('panel3')
      setProduct(applyFilter(products, filters))
    }
    if (filters.modelosVersao.value !== 'todos') {
      setProduct(applyFilter(products, filters))
    }
    if (filters.optional.length < 1) {
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
          <Button onClick={() => {
            setFilters({
              ...defaultValues,
            })
            setExpanded('panel1')
            setModelos([])
            setModelosVersao([])
          }}
            startIcon={<RestartAltIcon />}
          >
            Resetar Filtros
          </Button>
        </Stack>
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
                  defaultValue={'todos'}
                  value={filters.marcas.value || ''}
                >
                  {
                    marcas.map((marca) => (
                      <FormControlLabel key={marca.value} value={marca.value} control={<Radio />} label={marca.label}
                        onChange={
                          () => {
                            setFilters({
                              ...filters,
                              marcas: marca,
                              modelos: { label: 'Todos', value: 'todos' },
                              modelosVersao: { label: 'Todos', value: 'todos' },
                              optional: [],
                            })
                            setModelos([])
                            setModelosVersao([])
                          }
                        } />
                    ))
                  }
                </RadioGroup>
              </FormControl>
            </AccordionDetails>
          </Accordion>

          <Accordion
            sx={{
              display: modelos.length > 0 ? 'block' : 'none',
            }}
            onChange={handleChangeAccordion('panel2')}
            expanded={expanded === 'panel2'}>
            <AccordionSummary
              sx={{
                '& .MuiAccordionSummary-content': {
                  flexGrow: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }
              }}
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                Modelos
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl>
                <RadioGroup
                  defaultValue={'todos'}
                  value={filters.modelos.value || ''}
                >
                  {
                    modelos.map((modelo) => (
                      <FormControlLabel key={modelo.value} value={modelo.value} control={<Radio />} label={modelo.label} onChange={
                        () => {
                          setFilters({
                            ...filters,
                            modelos: modelo,
                            modelosVersao: { label: 'Todos', value: 'todos' },
                            optional: [],
                          })
                          setModelosVersao([])
                        }
                      } />
                    ))
                  }
                </RadioGroup>
              </FormControl>
            </AccordionDetails>
          </Accordion>

          <Accordion
            sx={{
              display: modelosVersao.length > 0 ? 'block' : 'none'
            }}
            onChange={handleChangeAccordion('panel3')}
            expanded={expanded === 'panel3'}>
            <AccordionSummary
              sx={{
                '& .MuiAccordionSummary-content': {
                  flexGrow: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }
              }}
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                Modelos Versão
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl>
                <RadioGroup
                  defaultValue={'todos'}
                  value={filters.modelosVersao.value || ''}
                >
                  {
                    modelosVersao.map((modelo) => (
                      <FormControlLabel key={modelo.value} value={modelo.value} control={<Radio />} label={modelo.label} onChange={
                        () => {
                          setFilters({
                            ...filters,
                            modelosVersao: modelo,
                            optional: [],
                          })
                        }
                      } />
                    ))
                  }
                </RadioGroup>
              </FormControl>
            </AccordionDetails>
          </Accordion>

          <Accordion expanded={true}>
            <AccordionSummary
              sx={{
                '& .MuiAccordionSummary-content': {
                  flexGrow: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }
              }}
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                Opcionais
              </Typography>
              <Button onClick={() => {
                setFilters({
                  ...filters,
                  optional: []
                })
              }}>
                Limpar
              </Button>
            </AccordionSummary>
            <AccordionDetails>
              <FormGroup>
                {optionals
                  .slice(0, numberOfitemsShown)
                  .map((item, index) => (
                    <FormControlLabel
                      key={index}
                      control={
                        <Checkbox
                          checked={filters.optional.includes(item.descricaoOpcional.replaceAll(/\s/g, ''))}
                          onChange={() => handleChange(item.descricaoOpcional.replaceAll(/\s/g, ''))}
                        />
                      }
                      label={item.descricaoOpcional}
                    />
                  ))
                }
                <Button sx={{ p: 2, mt: 2 }}>
                  <Typography onClick={showMore}>
                    + Mostrar mais
                  </Typography>
                </Button>
              </FormGroup>
            </AccordionDetails>
          </Accordion>

          <Accordion expanded={expanded === 'panel4'} onChange={handleChangeAccordion('panel4')}>
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
                            category: category
                          })
                        }
                      } />
                    ))
                  }
                </RadioGroup>
              </FormControl>
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
    </Scrollbar >
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
  const { optional, category, price, marcas, modelos, modelosVersao } = filters;

  const min = price[0];

  const max = price[1];


  if (optional.length) {
    products = products.filter((product) => product?.opcionaisArray?.some((opt) => optional.includes(opt)));
  }

  if (category.value !== 'todos') {
    products = products.filter((product) => product.descricaoCategoria === category.label);
  }

  if (marcas.value !== 'todos') {
    products = products.filter((product) => product.descricaoMarca === marcas.label);
  }

  if (modelos.value !== 'todos') {
    products = products.filter((product) => product.descricaoModelo === modelos.label);
  }

  if (modelosVersao.value !== 'todos') {
    products = products.filter((product) => product.descricaoModeloVersao === modelosVersao.label);
  }

  if (min !== 0 || max !== 400000) {
    products = products.filter((product) => product.valor >= min && product.valor <= max);
  }

  return products;
}