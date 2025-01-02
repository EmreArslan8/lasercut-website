'use client';

import { Box, Typography } from '@mui/material';

interface Section {
  type: 'text' | 'heading' | 'list';
  content: string | string[];
}

interface FreeTextProps {
  title?: string; // Başlık opsiyonel
  sections: Section[]; // Birden fazla bölüm (metin, başlık, madde) için array
}

const FreeText: React.FC<FreeTextProps> = ({ title, sections }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: '2rem 1rem',
        gap: '2rem',
      }}
    >
      {/* Sol Bölüm: Başlık ve Çizgi */}
      {title && (
        <Box
          sx={{
            flex: 1,
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 'bold',
              marginBottom: '1rem',
              fontSize: { xs: '1.8rem', md: '2.5rem' },
              color: '#333', // Daha modern koyu gri başlık rengi
            }}
          >
            {title}
          </Typography>
          <Box
            sx={{
              width: '80px',
              height: '6px',
              backgroundColor: '#1976d2', // Mavi renk çizgi
              borderRadius: '3px', // Daha modern görünüm için
              margin: { xs: '0 auto', md: '0' }, // Mobilde ortalanır, masaüstünde sola hizalanır
            }}
          />
        </Box>
      )}

      {/* Sağ Bölüm: İçerik */}
      <Box
        sx={{
          flex: 2,
          textAlign: 'justify',
          color: '#555',
        }}
      >
        {sections.map((section, index) => {
          if (section.type === 'text') {
            return (
              <Typography
                key={index}
                variant="body1"
                sx={{
                  lineHeight: 1.8,
                  fontSize: { xs: '1rem', md: '1.2rem' },
                  marginBottom: '1.5rem',
                  color: '#444', // Metin için daha koyu gri
                }}
              >
                {section.content}
              </Typography>
            );
          }

          if (section.type === 'heading') {
            return (
              <Typography
                key={index}
                variant="h5"
                sx={{
                  fontWeight: 'bold',
                  marginBottom: '1rem',
                  fontSize: { xs: '1.2rem', md: '1.5rem' },
           
                }}
              >
                {section.content}
              </Typography>
            );
          }

          if (section.type === 'list' && Array.isArray(section.content)) {
            return (
              <ul
                key={index}
                style={{
                  paddingLeft: '1.5rem',
                  margin: '0 0 1.5rem 0',
                  color: '#444', // Liste rengi
                  lineHeight: 1.8,
                }}
              >
                {section.content.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    style={{
                      marginBottom: '0.8rem',
                      fontSize: '1rem',
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            );
          }

          return null; // Eğer başka bir `type` olursa
        })}
      </Box>
    </Box>
  );
};

export default FreeText;
