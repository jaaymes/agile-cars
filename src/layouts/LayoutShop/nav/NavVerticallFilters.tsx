import { useCallback, useEffect, useState } from 'react';
import { GoDiffRemoved } from 'react-icons/go';
import { IoAddOutline } from 'react-icons/io5';

import { useProduct } from '@/hooks/useProduct';
import useResponsive from '@/hooks/useResponsive';

import InputRange from '@/components/InputRange';
import Logo from '@/components/logo';
import Scrollbar from '@/components/scrollbar';

import { getCategory, getOptionais } from '@/services/filters';
import { getMarcas, getModelos, getModelosVersao, getProducts2 } from '@/services/products';

import { NAV } from '@/config';

import { IProductFilter } from '@/@types/product';
import ExpandMoreIcon from '@mui/icons-material/ExpandMoreOutlined';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Box, Stack, Drawer, Typography, FormGroup, FormControlLabel, Checkbox, Accordion, AccordionSummary, AccordionDetails, FormControl, RadioGroup, Radio, Button, TextField } from '@mui/material';


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
  price: [],
  year: [],
  km: [],
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
  const { setProduct, page, setCountPage, setPage, order, direction, setIsLoading } = useProduct()

  const [filters, setFilters] = useState<IProductFilter>(defaultValues);
  const [optionals, setOptionals] = useState<IOptionals[]>([]);
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [marcas, setMarcas] = useState<ICategories[]>([]);
  const [modelos, setModelos] = useState<ICategories[]>([]);
  const [modelosVersao, setModelosVersao] = useState<ICategories[]>([]);
  const [expanded, setExpanded] = useState<string | false>('panel1');
  const [numberOfitemsShown, setNumberOfItemsToShown] = useState(8);
  const [searchMarca, setSearchMarca] = useState('');
  const [searchModelo, setSearchModelo] = useState('');
  const [searchModeloVersao, setSearchModeloVersao] = useState('');

  const [searchMarcaResult, setSearchMarcaResult] = useState<ICategories[]>([]);
  const [searchModeloResult, setSearchModeloResult] = useState<ICategories[]>([]);
  const [searchModeloVersaoResult, setSearchModeloVersaoResult] = useState<ICategories[]>([]);

  const showMore = () => {
    if (numberOfitemsShown + 3 <= optionals.length) {
      setNumberOfItemsToShown(numberOfitemsShown + 5);
    } else {
      setNumberOfItemsToShown(optionals.length);
    }
  };

  const RemoveMore = () => {
    if (numberOfitemsShown - 3 >= 8) {
      setNumberOfItemsToShown(numberOfitemsShown - 3);
    }
  }

  const handleChangeAccordion = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  const isDesktop = useResponsive('up', 'lg');

  const handleChange = (value: number) => {
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

  const handleProducts = useCallback(async () => {
    setIsLoading(true);
    const products = await getProducts2({
      page,
      idModelo: filters.modelos.value === 'todos' ? undefined : Number(filters.modelos.value),
      idMarca: filters.marcas.value === 'todos' ? undefined : Number(filters.marcas.value),
      idCategoria: filters.category.value === 'todos' ? undefined : Number(filters.category.value),
      idModeloVersao: filters.modelosVersao.value === 'todos' ? undefined : Number(filters.modelosVersao.value),
      opcionais: filters.optional.length > 0 ? filters.optional.toString() : undefined,
      valorInicial: filters?.price[0] || undefined,
      valorFinal: filters?.price[1] || undefined,
      fabInicial: filters?.year[0] || undefined,
      fabFinal: filters?.year[1] || undefined,
      kmInicial: filters?.km[0] || undefined,
      kmFinal: filters?.km[1] || undefined,
      ordenar: order,
      direcao: direction
    })
    if (products) {
      setCountPage(products?.pagination?.totalPages)
      const productWithImages = products?.collection.map((product: any) => ({
        ...product,
        opcionaisArray: product?.opcionais?.split(',')
      }))
      if (productWithImages) {
        setProduct(productWithImages)
        setIsLoading(false);
      }
    }
  }, [filters, page, order, direction, setCountPage])

  const handleGetOptional = useCallback(async () => {
    const optional = await getOptionais({})
    setOptionals(optional.collection)
  }, [])

  const handleGetCategory = useCallback(async () => {
    const category = await getCategory()
    const categorysReturn = category.collection.map((item: { descricaoCategoria: any; idCategoria: any; }) => ({
      label: item.descricaoCategoria,
      value: item.idCategoria
    }))
    categorysReturn.unshift({ label: 'Todos', value: 'todos' })
    setCategories(categorysReturn)
  }, [])

  const handleGetMarcas = useCallback(async () => {
    const response = await getMarcas({})
    const marcasReturn = response.map((item: { descricaoMarca: any; idMarca: any; }) => ({
      label: item.descricaoMarca.toUpperCase(),
      value: item.idMarca
    }))
    marcasReturn.unshift({ label: 'Todos', value: 'todos' })
    setMarcas(marcasReturn)
  }, [])

  const handleGetModelos = useCallback(async () => {
    const response = await getModelos(Number(filters.marcas.value))
    const modelosReturn = response.map((item: { descricaoModelo: any; idModelo: any; }) => ({
      label: item.descricaoModelo,
      value: item.idModelo
    }))
    modelosReturn.unshift({ label: 'Todos', value: 'todos' })
    setModelos(modelosReturn)
  }, [filters.marcas.value])

  const handleGetModeloVersao = useCallback(async () => {
    const { collection: responseModeloVersao } = await getModelosVersao(Number(filters.modelos.value))
    const modeloVersaoReturn = responseModeloVersao.map((item: { descricaoModeloVersao: any; idModeloVersao: any; }) => ({
      label: item.descricaoModeloVersao,
      value: item.idModeloVersao
    }))
    modeloVersaoReturn.unshift({ label: 'Todos', value: 'todos' })
    setModelosVersao(modeloVersaoReturn)
  }, [filters.modelosVersao.value])


  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (event.target.id === "leftValue") {
      // Left input box is changed
      const newValue = [Number(event.target.value), Number(filters.price[1])];
      // @ts-ignore
      setFilters({
        ...filters,
        price: newValue
      });
    } else {
      // Right input box is changed
      const newValue = [Number(filters.price[0]), Number(event.target.value)];
      // @ts-ignore
      setFilters({
        ...filters,
        price: newValue
      });
    }
  };

  const handleInputYear = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (event.target.id === "leftYear") {
      // Left input box is changed
      const newValue = [Number(event.target.value), Number(filters.year[1])];
      // @ts-ignore
      setFilters({
        ...filters,
        year: newValue
      });
    } else {
      // Right input box is changed
      const newValue = [Number(filters.year[0]), Number(event.target.value)];
      // @ts-ignore
      setFilters({
        ...filters,
        year: newValue
      })
    }
  };

  const handleInputKm = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (event.target.id === "leftKm") {
      // Left input box is changed
      const newValue = [Number(event.target.value), Number(filters.km[1])];
      // @ts-ignore
      setFilters({
        ...filters,
        km: newValue
      })
    } else {
      // Right input box is changed
      const newValue = [Number(filters.km[0]), Number(event.target.value)];
      // @ts-ignore
      setFilters({
        ...filters,
        km: newValue
      })
    }
  };

  useEffect(() => {
    setSearchMarcaResult([])
    if (searchMarca) {
      const search = marcas.filter((item: any) => item.label.toLowerCase().includes(searchMarca.toLowerCase()))
      setSearchMarcaResult(search)
    }
  }, [searchMarca]);

  useEffect(() => {
    setSearchModeloResult([])
    if (searchModelo) {
      const search = modelos.filter((item: any) => item.label.toLowerCase().includes(searchModelo.toLowerCase()))
      setSearchModeloResult(search)
    }
  }, [searchModelo]);

  useEffect(() => {
    setSearchModeloVersaoResult([])
    if (searchModeloVersao) {
      const search = modelosVersao.filter((item: any) => item.label.toLowerCase().includes(searchModeloVersao.toLowerCase()))
      setSearchModeloVersaoResult(search)
    }
  }, [searchModeloVersao]);

  useEffect(() => {
    handleGetOptional()
    handleGetCategory()
    handleGetMarcas()
  }, []);

  useEffect(() => {
    handleProducts()
  }, [
    page,
    filters.modelos.value,
    filters.marcas.value,
    filters.category.value,
    filters.modelosVersao.value,
    filters.optional,
    filters.price,
    filters.km,
    filters.year,
    order,
    direction
  ]);

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
    if (filters.marcas.value !== 'todos') {
      setExpanded('panel2')
    }
    if (filters.modelos.value !== 'todos') {
      setExpanded('panel3')
    }
  }, [filters]);


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
      <Box>
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
                <TextField size="small" sx={{
                  width: '100%',
                  pb: 1
                }}
                  variant="outlined"
                  label="Pesquise por marca"
                  onChange={(e) => setSearchMarca(e.target.value)}
                />
                <RadioGroup
                  defaultValue={'todos'}
                  value={filters.marcas.value || ''}
                >
                  {
                    searchMarcaResult.length > 0 ? searchMarcaResult.map((marca: any) => (
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
                            setPage(1)
                          }
                        } />
                    )) :
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
                              setPage(1)
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
                <TextField size="small" sx={{
                  width: '100%',
                  pb: 1
                }}
                  variant="outlined"
                  label="Pesquise por Modelo"
                  onChange={(e) => setSearchModelo(e.target.value)}
                />
                <RadioGroup defaultValue={'todos'} value={filters.modelos.value || ''}>
                  {
                    searchModeloResult.length > 0 ? searchModeloResult.map((modelo) => (
                      <FormControlLabel key={modelo.value} value={modelo.value} control={<Radio />} label={modelo.label} onChange={
                        () => {
                          setFilters({
                            ...filters,
                            modelos: modelo,
                            modelosVersao: { label: 'Todos', value: 'todos' },
                            optional: [],
                          })
                          setPage(1)
                          setModelosVersao([])
                        }
                      } />
                    )) :
                      modelos.map((modelo) => (
                        <FormControlLabel key={modelo.value} value={modelo.value} control={<Radio />} label={modelo.label} onChange={
                          () => {
                            setFilters({
                              ...filters,
                              modelos: modelo,
                              modelosVersao: { label: 'Todos', value: 'todos' },
                              optional: [],
                            })
                            setPage(1)
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
                <TextField size="small" sx={{
                  width: '100%',
                  pb: 1
                }}
                  variant="outlined"
                  label="Pesquise por Modelo Versão"
                  onChange={(e) => setSearchModeloVersao(e.target.value)}
                />
                <RadioGroup
                  defaultValue={'todos'}
                  value={filters.modelosVersao.value || ''}
                >
                  {
                    searchModeloVersaoResult.length > 0 ? searchModeloVersaoResult.map((modelo) => (
                      <FormControlLabel key={modelo.value} value={modelo.value} control={<Radio />} label={modelo.label} onChange={
                        () => {
                          setFilters({
                            ...filters,
                            modelosVersao: modelo,
                            optional: [],
                          })
                          setPage(1)
                        }
                      } />
                    )) :
                      modelosVersao.map((modelo) => (
                        <FormControlLabel key={modelo.value} value={modelo.value} control={<Radio />} label={modelo.label} onChange={
                          () => {
                            setFilters({
                              ...filters,
                              modelosVersao: modelo,
                              optional: [],
                            })
                            setPage(1)
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
                          checked={filters.optional.includes(item.idOpcional)}
                          onChange={() => {
                            setPage(1)
                            handleChange(item.idOpcional)
                          }}
                        />
                      }
                      label={item.descricaoOpcional}
                    />
                  ))
                }
                <Stack direction="row">
                  <Button sx={{ p: 2, mt: 2 }}>
                    <Typography onClick={showMore} sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 1
                    }}>
                      <IoAddOutline /> Mais
                    </Typography>
                  </Button>
                  <Button sx={{ p: 2, mt: 2 }}>
                    <Typography onClick={RemoveMore} sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 1
                    }}>
                      <GoDiffRemoved /> Remover
                    </Typography>
                  </Button>
                </Stack>

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
                          setPage(1)
                        }
                      } />
                    ))
                  }
                </RadioGroup>
              </FormControl>
            </AccordionDetails>
          </Accordion>

          {/* VALOR */}
          <Stack spacing={1} sx={{ pb: 2 }}>
            <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
              Valor
            </Typography>

            <Stack direction="column" spacing={2}>
              <InputRange id="leftValue" type='min' letter='(R$)' typeInput='number' value={String(filters.price[0])} setValue={handleInputChange} />
              <InputRange id="rightValue" type='max' letter='(R$)' typeInput='number' value={String(filters.price[1])} setValue={handleInputChange} />
            </Stack>
          </Stack>

          {/* ANO */}
          <Stack spacing={1} sx={{ pb: 2 }}>
            <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
              Ano
            </Typography>

            <Stack direction="column" spacing={2}>
              <InputRange id="leftYear" letter='Ano' typeInput='number' value={String(filters.year[0])} setValue={handleInputYear} />
              <InputRange id="rightYear" letter='Ano' typeInput='number' value={String(filters.year[1])} setValue={handleInputYear} />
            </Stack>
          </Stack>

          {/* KM */}
          <Stack spacing={1} sx={{ pb: 2 }}>
            <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
              KM
            </Typography>

            <Stack direction="column" spacing={2}>
              <InputRange id="leftKm" letter='Km' typeInput='number' value={String(filters.km[0])} setValue={handleInputKm} />
              <InputRange id="rightKm" letter='Km' typeInput='number' value={String(filters.km[1])} setValue={handleInputKm} />
            </Stack>
          </Stack>
        </Stack>
      </Box>
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