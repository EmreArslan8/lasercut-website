'use client';

import { Grid, Skeleton, Stack } from '@mui/material';

const Loading = () => {
  return (
    <Stack gap={3}>
      <Stack gap={1}>
        <Skeleton
          width={180}
          sx={{ fontSize: { xs: 18, sm: 20 }, lineHeight: { xs: '22px', sm: '24px' } }}
        />
        <Skeleton width={280} sx={{ fontSize: 16, lineHeight: '20px' }} />
      </Stack>
      <Grid container columnSpacing={2.5} rowSpacing={3}>
        {Array.from(Array(20).keys()).map((e) => (
          <Grid item xs={6} sm={4} md={3} key={e}>
            <Skeleton variant="rounded" sx={{ width: '100%', height: 'auto', aspectRatio: 1.4 }} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default Loading;
