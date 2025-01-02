import React, { useState } from 'react';
import { Box, Grid2, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import { Navigation } from 'swiper/modules';
import IconCardGrid2 from '../IconCard/page'; // Eğer bu bileşen gerekli değilse kaldırabilirsiniz

// Swiper navigasyon butonları için stiller
const swiperStyles = `
  .swiper-button-next, .swiper-button-prev {
    color: #00796b; /* Ok renkleri */
    width: 20px; /* Ok genişliği */
    height: 20px; /* Ok yüksekliği */
  }

  .swiper-button-next:after, .swiper-button-prev:after {
    font-size: 16px; /* Ok boyutu */
  }

  .swiper-button-next:hover, .swiper-button-prev:hover {
    color: #004d40; /* Hover rengi */
  }
`;

const cards = [
  {
    id: 1,
    images: ['/static/images/electropolishing.webp'],
    title: 'Elektropolisaj',
    description:
      'Korozyonu azaltmak ve metale daha parlak bir görünüm kazandırabilmek için çelik parçaları temizleyen elektrokimyasal bir ardıl işlemdir.',
    results: ['Azaltılmış korozyon', 'Daha parlak görünüm'],
  },
  {
    id: 2,
    images: [
      '/static/images/type2clear.webp',
      '/static/images/type2gold.webp',
      '/static/images/type2red.webp',
      '/static/images/type2blue.webp',
      '/static/images/type2orange.webp',
      '/static/images/type2green.webp',
    ],
    title: 'Eloksal Kaplama (Tip II)',
    description: `Tip II eloksal, daha yüksek korozyon direncine sahip ve boyama işlemleri için temel olarak kullanılır. 
    \nNotlar: 
    - Parçanın yüzey rengini etkilemek için boyaların kullanılmasını da içerir. 
    - Eloksal renkler belirli Pantone veya RAL renkleriyle uyumlu değildir.
    - Tip II kaplamalar aşınmaya karşı hassastır ve uzun süreli doğrudan güneş ışığı altında ağarabilir veya solabilir.`,
    colorOptions: [
      { color: '#f7ca18', name: 'Sarı' },
      { color: '#95a5a6', name: 'Gri' },
      { color: '#f39c12', name: 'Turuncu' },
      { color: '#3498db', name: 'Mavi' },
      { color: '#27ae60', name: 'Yeşil' },
      { color: '#c0392b', name: 'Kırmızı' },
    ],
  },
  {
    id: 3,
    images: [
      '/static/images/type2clear.webp',
      '/static/images/type2gold.webp',
      '/static/images/type2red.webp',
      '/static/images/type2blue.webp',
      '/static/images/type2orange.webp',
      '/static/images/type2green.webp',
    ],
    title: 'Eloksal Kaplama (Tip II)',
    description: `Tip II eloksal, daha yüksek korozyon direncine sahip ve boyama işlemleri için temel olarak kullanılır. 
    \nNotlar: 
    - Parçanın yüzey rengini etkilemek için boyaların kullanılmasını da içerir. 
    - Eloksal renkler belirli Pantone veya RAL renkleriyle uyumlu değildir.
    - Tip II kaplamalar aşınmaya karşı hassastır ve uzun süreli doğrudan güneş ışığı altında ağarabilir veya solabilir.`,
    colorOptions: ['#f7ca18', '#95a5a6', '#f39c12', '#3498db', '#27ae60', '#c0392b'],
  },
  {
    id: 4,
    images: ['/static/images/electropolishing.webp'],
    title: 'Elektropolisaj',
    description:
      'Korozyonu azaltmak ve metale daha parlak bir görünüm kazandırabilmek için çelik parçaları temizleyen elektrokimyasal bir ardıl işlemdir.',
    results: ['Azaltılmış korozyon', 'Daha parlak görünüm'],
  },
];

const FulfillmentTabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      {/* Swiper navigasyon butonları için stiller */}
      <style>{swiperStyles}</style>

      {/* Başlık */}
      <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 3 }}>
        Yüzey Opsiyonları
      </Typography>

      {/* Kaydırılabilir Butonlar */}
      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto',
          gap: 2,
          paddingBottom: 2,
          whiteSpace: 'nowrap',
          scrollbarWidth: 'none', // Modern tarayıcılar için scrollbar gizleme
          msOverflowStyle: 'none', // Eski tarayıcılar için scrollbar gizleme
          '&::-webkit-scrollbar': {
            display: 'none', // Webkit tabanlı tarayıcılar için scrollbar gizleme
          },
        }}
      >
        {cards.map((card, index) => (
          <Box
            key={index}
            onClick={() => handleTabChange(index)}
            sx={{
              flex: '0 0 auto',
              padding: '10px 20px',
              borderRadius: '20px',
              backgroundColor: activeTab === index ? '#e0f7fa' : '#f5f5f5',
              color: activeTab === index ? '#00796b' : '#000',
              fontWeight: 'bold',
              cursor: 'pointer',
              minWidth: '150px',
              textAlign: 'center',
              transition: 'background-color 0.3s ease, color 0.3s ease',
            }}
          >
            {card.title}
          </Box>
        ))}
      </Box>

      {/* İçerik Alanı */}
      <Grid2
  container
  spacing={2}
  sx={{
    marginTop: 2,
    alignItems: 'stretch',
    flexDirection: { xs: 'column', sm: 'row' }, // Mobilde dikey, tabletlerde yatay
  }}
>
  <Grid2
    size={{ xs: 12, sm: 6 }}
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: 2,
      borderRadius: 2,
      backgroundColor: '#f5f5f5',
    }}
  >
    <Typography
      variant="h5"
      fontWeight="bold"
      gutterBottom
      sx={{
        textAlign: 'left',
      }}
    >
      {cards[activeTab].title}
    </Typography>
    <Typography
      variant="body1"
      color="text.secondary"
      sx={{
        textAlign: 'justify',
        marginTop: 2,
      }}
    >
      {cards[activeTab].description}
    </Typography>
  </Grid2>
  <Grid2
    size={{ xs: 12, sm: 6 }}
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 2,
      backgroundColor: '#f5f5f5',
      padding: 2,
    }}
  >
    {cards[activeTab].images ? (
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={16}
        slidesPerView={1}
        style={{ width: '100%' }}
      >
        {cards[activeTab].images.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
              src={image}
              alt={`${cards[activeTab].title} ${index + 1}`}
              layout="responsive"
              width={400}
              height={250}
              style={{
                borderRadius: 8,
                objectFit: 'cover',
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    ) : (
      <Typography variant="body1" color="text.secondary">
        No images available
      </Typography>
    )}
  </Grid2>
</Grid2>


      {/* Kartlar */}
      <IconCardGrid2 />
    </Box>
  );
};

export default FulfillmentTabs;
