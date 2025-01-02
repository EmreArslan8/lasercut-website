import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { FaFire, FaCog } from 'react-icons/fa';

interface IconCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  results: string[];
}

const IconCard: React.FC<IconCardProps> = ({ icon, title, description, results }) => {
  return (
    <Box
      sx={{
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: 3,
        backgroundColor: '#f5f7fa', // Subtle background
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%', // Ensures cards have the same height
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 2 }}>
        {/* Icon */}
        <Box
          sx={{
            width: 60,
            height: 60,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            backgroundColor: '#e0e7ff',
          }}
        >
          {icon}
        </Box>

        {/* Title */}
        <Typography
          variant="h6"
          fontWeight="bold"
          gutterBottom
          sx={{
            margin: 0,
            textAlign: 'left',
            color: '#333',
          }}
        >
          {title}
        </Typography>
      </Box>

      {/* Description */}
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ marginBottom: 2, textAlign: 'left', color: '#666' }}
      >
        {description}
      </Typography>

      {/* Results */}
      <Box>
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          sx={{ textAlign: 'left', marginBottom: 1, color: '#444' }}
        >
          Sonuç:
        </Typography>
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', margin: 0 }}>
          {results.map((result, index) => (
            <li key={index} style={{ textAlign: 'left', margin: '5px 0', color: '#555' }}>
              {result}
            </li>
          ))}
        </ul>
      </Box>
    </Box>
  );
};

const IconCardGrid = () => {
  const cards = [
    {
      icon: <FaFire size={30} color="#333" />,
      title: 'Tavlama',
      description:
        'Tavlama işlemi, bir metalin gerilimlerde değişiklik olmaksızın yeniden kristalleşmenin başladığı sıcaklığa kadar veya yakın bir sıcaklığa kadar ısıtılmasını içerir.',
      results: ['Metalin soğuk işlenebilirliği artar'],
    },
    {
      icon: <FaFire size={30} color="#333" />,
      title: 'Karbürleme',
      description:
        'Alt kattaki metalin yumuşak kalmasına izin verirken metal parçaların sertleştirilmesini sağlayan bir işlem.',
      results: ['Metal yüzey sertliği artar', 'Daha dayanıklı yüzeyler'],
    },
    {
      icon: <FaFire size={30} color="#333" />,
      title: 'Temperleme',
      description:
        'Metallerin sertliğini azaltarak tokluğunu elde etmek için kullanılan bir işlem.',
      results: ['Azaltılmış sertlik', 'Artan esneklik ve süneklik'],
    },
    {
      icon: <FaCog size={30} color="#333" />,
      title: 'Özel Ardıl İşlem',
      description:
        'Anlık Fiyat Motorunda özel ardıl işlemi seçerseniz, manuel inceleme gerekecektir. Manuel fiyatlandırma genellikle 1-2 iş günü sürer.',
      results: ['Manuel inceleme ile fiyat teklifi verilecektir.', 'Parçalar özel bir talebe bağlı incelenir.'],
    },
  ];

  return (
    <Grid container spacing={4} sx={{ marginTop: 4, padding: '0 2rem' }}>
      {cards.map((card, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <IconCard
            icon={card.icon}
            title={card.title}
            description={card.description}
            results={card.results}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default IconCardGrid;
