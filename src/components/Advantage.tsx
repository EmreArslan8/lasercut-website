"use client";

import Box from '@mui/material/Box';
import { HardHat, FileText, Users } from "lucide-react";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import theme from '@/theme/theme';

const AdvantageSection = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography
                  color="primary"
                  variant="h4"
                  sx={{ fontWeight: 500, textTransform: 'uppercase', mb: 2, textAlign: "start" }}
                >
                  WHY CHOICE US
                </Typography>

        <Grid container spacing={4}>
          
          {/* Sol taraf */}
          <Grid item xs={12} md={6}>
          
              <Box mb={4}>
               
                <Typography
                  variant="h3"
                  sx={{
       
                    lineHeight: 1.2,
                    textTransform: 'uppercase',
                    textAlign: "start",
                    mb: 2
                  }}
                >
                  PROFESSIONAL & CERTIFICATION WORKER
                </Typography>

                <Typography variant="body1" color="text.secondary" sx={{ mb: 4, textAlign: "start" }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus
                  nec ullamcorper mattis, pulvinar dapibus leo.
                </Typography>
              </Box>

              <Stack spacing={3}>
                {[
                  { icon: <HardHat size={32} />, title: "PROFESSIONAL WORKER" },
                  { icon: <FileText size={32} />, title: "CERTIFICATION WORKER" },
                  { icon: <Users size={32} />, title: "HAVE MANY HAPPY CLIENTS" }
                ].map((item, index) => (
                  <Box key={index} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Box sx={{ color: 'primary.main' }}>{item.icon}</Box>
                    <Box>
                      <Typography variant="h6" sx={{ textTransform: 'uppercase', fontWeight: 'bold', textAlign: "start" }}>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit Ut elit tellus.
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>
   
          </Grid>

          {/* Sağ taraf */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                position: 'relative',
                height: '100%',
                minHeight: { xs: '400px', md: '500px' },
                overflow: 'hidden',
                borderRight: '10px solid #006FBF', // Turuncu sol kenar
              }}
            >
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1170&q=80"
                alt="Professional worker in safety gear"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />

              {/* Turuncu kutu */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  bgcolor: theme.palette.primary.main, // Turuncu arka plan
                  p: 3,
                  color: 'white',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              
                  <Box>
                    <Typography variant="h6" sx={{ textTransform: 'uppercase', fontWeight: 'bold', textAlign: "start"}}>
                    PROFESSIONAL WORKER
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
}

export default AdvantageSection;