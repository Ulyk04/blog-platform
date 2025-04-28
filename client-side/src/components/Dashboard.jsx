import * as React from 'react';
import { createTheme, styled } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid';
import PostAdd from '@mui/icons-material/PostAdd'
import Home from '@mui/icons-material/Home';
import AccountBox from '@mui/icons-material/AccountBox'
import ProfileCard from './ProfileCard'
import { MediaControlCard } from './ProfileCard';
import { PostCliend } from './ProfileCard';
import Pizza from '../images/pizza.jpeg'

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'home',
    title: 'Home',
    icon: <Home />,
  },
  {
    segment: 'posts',
    title: 'Posts',
    icon: <PostAdd />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Analytics',
  },
  {
    segment: 'profile',
    title: 'Profile',
    icon: <AccountBox/>
  }
];

const demoTheme = createTheme({
  colorSchemes: { light: true, dark: true },
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

const Skeleton = styled('div')(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  content: '" "',
}));

export default function DashboardLayoutBasic(props) {
  const { window } = props;

  const router = useDemoRouter('/dashboard');

  
  const demoWindow = window ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <PageContainer>
          <Grid container spacing={5}>
              <Grid size={25}>
                {
                router.pathname === '/profile' && (
                  <ProfileCard />
                )
                }
              </Grid>
              <Grid size={11}>
                {
                  router.pathname === '/profile' && (
                    <MediaControlCard/>
                  )
                }
              </Grid>
            <Grid size={4}>
                {
                  router.pathname === '/profile' && (
                    <PostCliend image={Pizza} title={'About Pizza'} description={'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat, nemo? Nisi excepturi non sint pariatur, quis tempore, quod quam cupiditate aperiam commodi aliquid aliquam adipisci odit quos repudiandae temporibus accusantium?'} />
                  )
                }
            </Grid>
            <Grid size={8}>
              <Skeleton height={100} />
            </Grid>

            <Grid size={12}>
              <Skeleton height={150} />
            </Grid>
            <Grid size={12}>
              <Skeleton height={14} />
            </Grid>

            <Grid size={3}>
              <Skeleton height={100} />
            </Grid>
            <Grid size={3}>
              <Skeleton height={100} />
            </Grid>
            <Grid size={3}>
              <Skeleton height={100} />
            </Grid>
            <Grid size={3}>
              <Skeleton height={100} />
            </Grid>
          </Grid>
            
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}

