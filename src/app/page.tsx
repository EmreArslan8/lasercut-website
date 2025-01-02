'use client';

import { Stack, Container } from "@mui/material";
import AdvantageSection from "./components/HomePage/AdvantageSection/page";
import FreeText from "./components/HomePage/FreeText/page";
import HeroSection from "./components/HomePage/HeroSection/page";
import LaserCuttingHero from "./components/HomePage/LaserCuttingHero/page";
import ProductionCapabilities from "./components/HomePage/ProductionCapabilities/page";
import ProductionSteps from "./components/HomePage/ProductionSteps/page";
import MaterialsTable from "./components/HomePage/MaterialsCard/page";
import SwiperCardGrid from "./components/HomePage/SurfaceOptions/page";
import IconCardGrid from "./components/HomePage/IconCard/page";


const HomePage = () => {
  return (
    <Container
      maxWidth="xl"
      sx={{
        padding: '2rem 0'
      }}
    >
      <Stack spacing={4}>
        <HeroSection />
        <FreeText
          title={"Lazer Kesim Hizmetleri"}
          sections={[
            {
              type: 'text',
              content:
                'Sac metal şekillendirme talepleriniz için CNC lazer kesim hizmetleri sunuyoruz: alüminyum, çelik ve paslanmaz çelik gibi malzemelerle yüksek hassasiyette kesme, delme ve kazıma işlemlerini hızla gerçekleştirin. CO2 ve Fiber lazer kesim makineleriyle üretilen parçalara talep üzerine kaplama, ısıl işlem ve diğer ardıl işlemler uygulanabilir.Ayrıca Xometry, talep üzerine sertifikalar (uygunluk sertifikası, malzeme sertifikası, vb.) ve denetim raporları (CMM, FAIR, ölçüm raporu) sağlayabilir.',
            },
          ]}
        />
        <ProductionSteps />
        <AdvantageSection />
        <MaterialsTable/>
        <SwiperCardGrid />
        <ProductionCapabilities />
        <FreeText
          title="Genel Bakış: Lazer Kesim Nedir?"
          sections={[
            {
              type: 'heading',
              content: 'Lazer Kesimin Temelleri',
            },
            {
              type: 'text',
              content:
                'CNC lazer kesim teknolojisi, yüksek güçlü ışın üreten bir kaynaktan çıkan lazer ışınının, eksenler arasında yönlendirilerek sac metal malzemeyi kesip şekillendirdiği bilgisayar kontrollü bir üretim sürecidir. Endüstriyel lazer kesim makineleri, desenli metal levhaların yanı sıra profil ve boru malzemeleri kesmek için en çok kullanılan bir teknolojidir. Bu imalat süreci, maliyet verimliliği ve hassas toleransları ile bilinir.',
            },
            {
              type: 'heading',
              content: 'Lazer Kesim Makineleri',
            },
            {
              type: 'list',
              content: [
                'CO2 lazer kesim makineleri genellikle standart üretim amaçları için kullanılır.',
                'Fiber lazer kesim makineleri daha güçlüdür ve daha kalın sac metalleri kesmek için uygundur.',
              ],
            },
            {
              type: 'heading',
              content: 'Tolerans',
            },
            {
              type: 'text',
              content:
                'CNC lazer kesim tezgahlarının çoğu için standart tolerans seviyesi, boyuta ve gereksinimlere bağlı olarak 0,1 ila 0,2 mm arasında değişir.',
            },
            {
              type: 'heading',
              content: 'Boyut Sınırlamaları'
            },
            {
              type: 'text',
              content:
                'Herhangi bir boyut için, maksimum çelik sac kalınlığı 20 mm ve alüminyum sac kalınlığı 6 mm’ye kadar.',
            },
          ]}
        />


        <LaserCuttingHero />
      </Stack>
    </Container>
  );
};

export default HomePage;
