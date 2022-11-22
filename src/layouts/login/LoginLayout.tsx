
import Image from '@/components/image';

import { Typography, Stack } from '@mui/material';

import { StyledRoot, StyledSectionBg, StyledSection, StyledContent } from './styles';

type Props = {
  title?: string;
  illustration?: string;
  children: React.ReactNode;
};

export default function LoginLayout({ children, illustration, title }: Props) {
  return (
    <StyledRoot>
      <StyledSection>
        <Typography variant="h3" sx={{ mb: 4, maxWidth: 580, textAlign: 'center', color: '#fff' }}>
          {`Gestor Agile Veículos`}
        </Typography>
        <Image
          disabledEffect
          visibleByDefault
          alt="auth"
          src={illustration || '/assets/illustrations/illustration_dashboard.png'}
          sx={{ maxWidth: 320 }}
        />
        <StyledSectionBg />
      </StyledSection>

      <StyledContent>
        <Stack sx={{ width: 1 }}> {children} </Stack>
      </StyledContent>
    </StyledRoot>
  );
}
