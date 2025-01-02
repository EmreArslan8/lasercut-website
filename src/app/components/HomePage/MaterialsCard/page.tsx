import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';

const materialsTable = [
  { category: 'Alüminyum', items: '1050, 5754 / 3.3535 / AlMg3' },
  { category: 'Çelik', items: 'Galvanizli Sac, Siyah Sac, DC01 / 6112 / C (DKP), ST37-K / S235JR / 1.0038' },
  { category: 'Paslanmaz Çelik', items: '304 / 1.4301 / X5CrNi18.10 / V2A, 316L / 1.4404 / X2CrNiMo17-12-2 / V4A' },
];

const MaterialsTable = () => {
  return (
    <Box sx={{ padding: '2rem', textAlign: 'center' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '2rem' }}>
        Lazer Kesim Malzemeleri
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {materialsTable.map((row, index) => (
              <TableRow key={index}>
                <TableCell sx={{ fontWeight: 'bold', width: '30%' }}>
                  {row.category}
                </TableCell>
                <TableCell>{row.items}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MaterialsTable;
