
import { List, Stack } from '@mui/material';

import { NavSectionProps } from '../types';
import NavList from './NavList';

export default function NavSectionVertical({ data, sx, ...other }: NavSectionProps) {
  return (
    <Stack sx={sx} {...other}>
      {data.map((group, index) => (
        <List key={index} disablePadding sx={{ px: 2 }}>
          {group.items.map((list) => (
            <NavList
              key={list.title + list.path}
              data={list}
              depth={1}
              hasChild={!!list.children}
            />
          ))}
        </List>
      ))}
    </Stack>
  );
}
