
import NextLink from 'next/link';

import Iconify from '@/components/iconify';

import { Box, Tooltip, Link, ListItemText } from '@mui/material';

import { NavItemProps } from '../types';
import { StyledItem, StyledIcon, StyledDotIcon } from './styles';


export default function NavItem({
  item,
  depth,
  open,
  active,
  isExternalLink,
  ...other
}: NavItemProps) {
  const { title, path, icon, info, children, disabled, caption } = item;

  const subItem = depth !== 1;

  const renderContent = (
    <StyledItem depth={depth} active={active} disabled={disabled} caption={!!caption} {...other}>
      {icon && <StyledIcon depth={0}>{icon}</StyledIcon>}

      {subItem && (
        <StyledIcon depth={0}>
          <StyledDotIcon active={active && subItem} />
        </StyledIcon>
      )}

      <ListItemText
        sx={{
          color: (theme) => theme.palette.mode === 'light' ? theme?.palette.primary.main : 'grey.500',
        }}
        primary={title}
        secondary={
          caption && (
            <Tooltip title={caption} placement="top-start">
              <span>{caption}</span>
            </Tooltip>
          )
        }

        secondaryTypographyProps={{
          noWrap: true,
          variant: 'caption',
        }}
      />

      {info && (
        <Box component="span" sx={{ lineHeight: 0 }}>
          {info}
        </Box>
      )}

      {!!children && (
        <Iconify

          width={16}
          icon={open ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
          sx={{
            ml: 1, flexShrink: 0,
            color: (theme) => theme.palette.mode === 'light' ? theme?.palette.primary.main : 'grey.500',
          }}
        />
      )}
    </StyledItem>
  );

  const renderItem = () => {
    // ExternalLink
    if (isExternalLink)
      return (
        <Link href={path} target="_blank" rel="noopener" underline="none">
          {renderContent}
        </Link>
      );

    // Has child
    if (children) {
      return renderContent;
    }

    // Default
    return (
      <NextLink href={path} passHref>
        {renderContent}
      </NextLink>
    );
  };

  return renderItem()
  // return <RoleBasedGuard roles={roles}> {renderItem()} </RoleBasedGuard>;
}
