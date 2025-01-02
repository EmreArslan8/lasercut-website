import { Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import React from 'react'

const productionCapabilities = [
    {
      thickness: 'Alüminyum: 1,0-6,0 mm',
      cuttingArea: '4 mm kalınlığa kadar ince levhalar: 1000×2000 mm, 1250×2500 mm, 1500×3000 mm',
    },
    {
      thickness: 'Çelik: 0,8-20 mm',
      cuttingArea: '4 mm kalınlığın üzerindeki kalın levhalar: 1500×3000 mm, 2000×3000 mm, 1500×6000 mm',
    },
    {
      thickness: 'Paslanmaz Çelik: 0,5-16 mm',
      cuttingArea: '',
    },
];

const ProductionCapabilities = () => {
    return (
        <Box sx={{ padding: '2rem', margin: '0 auto' }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '2rem',
            }}
          >
            Üretim Kabiliyetleri
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Kalınlık Aralığı</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Kesim Alanı</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productionCapabilities.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.thickness}</TableCell>
                    <TableCell>{row.cuttingArea || '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      );
    };
    

export default ProductionCapabilities 