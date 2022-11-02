import { CustomTextField } from '@/components/custom-input';
import Iconify from '@/components/iconify';

import { InputAdornment } from '@mui/material';

interface IProductSearch {
  onChangeSearch: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  value: string;
}

export default function ShopProductSearch({ onChangeSearch }: IProductSearch) {
  return (
    <CustomTextField
      fullWidth
      size='small'
      onChange={(event) => onChangeSearch(event)}
      placeholder="Pesquisar..."
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Iconify icon="eva:search-fill" sx={{ ml: 1, color: 'text.disabled' }} />
          </InputAdornment>
        ),
      }}
    />
  );
}
