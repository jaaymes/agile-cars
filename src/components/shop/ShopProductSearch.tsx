import { useState } from 'react';

import { useRouter } from 'next/router';

import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';

import { paramCase } from 'change-case';

import { CustomTextField } from '@/components/custom-input';
import Iconify from '@/components/iconify';
import Image from '@/components/image';
import SearchNotFound from '@/components/search-not-found';

import axios from '@/utils/axios';

import { IProduct } from '@/@types/product';
import { PATH_DASHBOARD } from '@/routes/paths';
import { Link, Typography, Autocomplete, InputAdornment } from '@mui/material';

export default function ShopProductSearch() {
  const { push } = useRouter();

  const [searchProducts, setSearchProducts] = useState('');

  const [searchResults, setSearchResults] = useState([]);

  const handleChangeSearch = async (value: string) => {
    try {
      setSearchProducts(value);
      if (value) {
        const response = await axios.get('/api/products/search', {
          params: { query: value },
        });

        setSearchResults(response.data.results);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleGotoProduct = (name: string) => {
    push(PATH_DASHBOARD.eCommerce.view(paramCase(name)));
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleGotoProduct(searchProducts);
    }
  };

  return (
    <Autocomplete
      fullWidth
      size="small"
      autoHighlight
      popupIcon={null}
      options={searchResults}
      onInputChange={(event, value) => handleChangeSearch(value)}
      getOptionLabel={(product: IProduct) => product.descricaoModelo}
      noOptionsText={<SearchNotFound query={searchProducts} />}
      isOptionEqualToValue={(option, value) => option.idVeiculo === value.idVeiculo}
      componentsProps={{
        popper: {
          sx: {
            width: `280px !important`,
          },
        },
        paper: {
          sx: {
            '& .MuiAutocomplete-option': {
              px: `8px !important`,
            },
          },
        },
      }}
      renderInput={(params) => (
        <CustomTextField
          {...params}
          fullWidth
          placeholder="Pesquisar..."
          onKeyUp={handleKeyUp}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ ml: 1, color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
      )}
      renderOption={(props, product, { inputValue }) => {
        const { descricaoModeloVersao, images } = product;
        const matches = match(descricaoModeloVersao, inputValue);
        const parts = parse(descricaoModeloVersao, matches);

        return (
          <li {...props}>
            <Image
              alt={descricaoModeloVersao}
              src={`data:image/png;base64,${images[0] || images[1]}`}
              sx={{ width: 48, height: 48, borderRadius: 1, flexShrink: 0, mr: 1.5 }}
            />

            <Link underline="none" onClick={() => handleGotoProduct(descricaoModeloVersao)}>
              {parts.map((part, index) => (
                <Typography
                  key={index}
                  component="span"
                  variant="subtitle2"
                  color={part.highlight ? 'primary' : 'textPrimary'}
                >
                  {part.text}
                </Typography>
              ))}
            </Link>
          </li>
        );
      }}
    />
  );
}
