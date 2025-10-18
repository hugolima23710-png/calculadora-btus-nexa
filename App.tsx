import React, { useState } from 'react';
import { FormData, SunExposure, RoomType, Product } from './types';
import { CalculatorForm } from './components/CalculatorForm';
import { ResultDisplay } from './components/ResultDisplay';
import { Recommendations } from './components/Recommendations';
import { InstagramIcon, AcIcon } from './components/icons';


const ALL_PRODUCTS: Product[] = [
  {
    name: 'Ar Condicionado Split Inverter 9.000 BTUs',
    btu: 9000,
    description: 'Ideal para quartos e pequenos escritórios de até 15 m².',
    imageUrl: 'https://i.shopycdn.com/cdn-cgi/image/w=500,h=500,q=100,f=auto/https://images.shopy.com.br/unsafe/2000x2000/https://assets.shopy.com.br/spree/products/37777/original/Ar-Condicionado-Split-Hi-Wall-Inverter-Springer-Midea-Xtreme-Save-Connect-R-32-9.000-BTU-h-Frio-220V.jpg',
    affiliateLink: '#shopee-link',
  },
  {
    name: 'Ar Condicionado Split Inverter 12.000 BTUs',
    btu: 12000,
    description: 'Perfeito para salas e quartos maiores, de até 20 m².',
    imageUrl: 'https://i.shopycdn.com/cdn-cgi/image/w=500,h=500,q=100,f=auto/https://images.shopy.com.br/unsafe/2000x2000/https://assets.shopy.com.br/spree/products/36655/original/Ar-Condicionado-Split-Hi-Wall-Inverter-II-LG-Dual-Voice-12.000-BTU-h-Frio-220V.jpg',
    affiliateLink: '#shopee-link',
  },
  {
    name: 'Ar Condicionado Split Inverter 18.000 BTUs',
    btu: 18000,
    description: 'Recomendado para salas amplas e áreas comerciais de até 30 m².',
    imageUrl: 'https://i.shopycdn.com/cdn-cgi/image/w=500,h=500,q=100,f=auto/https://images.shopy.com.br/unsafe/2000x2000/https://assets.shopy.com.br/spree/products/39091/original/Ar_Condicionado_Split_Hi_Wall_Inverter_Gree_G-Top_Conexão_Wi-Fi_18.000_BTU_h_Frio_220V.jpg',
    affiliateLink: '#shopee-link',
  },
  {
    name: 'Ar Condicionado Split Inverter 24.000 BTUs',
    btu: 24000,
    description: 'Alta potência para grandes ambientes residenciais ou comerciais de até 40 m².',
    imageUrl: 'https://i.shopycdn.com/cdn-cgi/image/w=500,h=500,q=100,f=auto/https://images.shopy.com.br/unsafe/2000x2000/https://assets.shopy.com.br/spree/products/39106/original/Ar-Condicionado-Split-Teto-Inverter-Gree-G-Prime-Compact-24.000-BTU-h-Frio-220V.jpg',
    affiliateLink: '#shopee-link',
  },
];

const logoBase64 = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMzYjgyZjY7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b9wLWNvbG9yOiMyNTYzZWI7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgcng9IjIwIiBmaWxsPSJ1cmwoI2dyYWQpIi8+CiAgPHRleHQgeD0iNTAiIHk9IjY4IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iNTAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXdlaWdodD0iYm9sZCI+TjwvdGV4dD4KICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2NSwgMzApIHNjYWxlKDAuMikiPgogICAgPHBhdGggZmlsbD0id2hpdGUiIGQ9Ik00MC4zNSwzMy41MmExLjMyLDEuMzIsMCwwLDEtLjktLjM3TDI1LjMyLDE4Ljg5LDExLjIsMzMuMTVhMS4zMSwxLjMxLDAsMCwxLTEuODUtMS44NUwyNC40LDE2LDkuMzUsMS4yMmExLjMxLDEuMzEsMCwxLDEsMS44NS0xLjg1TDI1LjMyLDEzLjExLDM5LjQ1LS42M2ExLjMxLDEuMzEsMCwwLDEsMS44NSwxLjg1TDI2LjI1LDE2LDQxLjI1LDMxLjI5YTEuMzIsMS4zMiwwLDAsMS0uOSwyLjIzWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAwKSIvPgogICAgPHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0xNiw0MS4yNWExLjMyLDEuMzIsMCwwLDEtMS4zMS0xLjMxVjkuMzVhMS4zMSwxLjMxLDAsMSwxLDIuNjIsMFYzOS45NEExLjMyLDEuMzIsMCwwLDEsMTYsNDEuMjVaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg5LjMyIDApIi8+CiAgICA8cGF0aCBmaWxsPSJ3aGl0ZSIgZD0iTTMzLjUyLDQwLjM1YS4zMiwwLDAsMS0uOTItLjM4TDE4Ljg5LDI1LjMyLjM3LDM5LjQ1YTEuMzEsMS4zMSwwLDEsMS0xLjg1LTEuODVMMTYsMjQuNC0wLjYzLDkuMzVhMS4zMSwxLjMxLDAsMSwxLDEuODUtMS44NUwxMy4xMSwyNS4zMiwzMS4yOSw5LjM1YTEuMzIsMS4zMiwwLDAsMSwyLjIzLjksMS4yOSwxLjI5LDAsMCwxLS4zOC45MkwxOC44OSwyNS4zMiwzMy4xNSwzOS40NWExLjMxLDEuMzEsMCwwLDEtMS44NSwxLjg1WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCA5LjMyKSByb3RhdGUoLTQ1IDE2IDE2KSIvPgogIDwvZz4KPC9zdmc+";

// FIX: Added Header component definition.
const Header: React.FC<{ logoUrl: string }> = ({ logoUrl }) => (
  <header className="bg-white shadow">
    <div className="container mx-auto p-4 flex items-center">
      <img src={logoUrl} alt="Logo" className="h-10 w-10" />
      <span className="text-xl font-bold text-slate-700 ml-3">Calculadora de BTUs</span>
    </div>
  </header>
);

// FIX: Added Footer component definition.
const Footer: React.FC = () => (
    <footer className="bg-slate-900 text-white py-8">
      <div className="container mx-auto text-center px-4">
        <div className="flex justify-center items-center space-x-6 mb-4">
           <a href="https://www.instagram.com/nexa.refrigeracao/" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-white transition-colors flex items-center">
                <InstagramIcon className="w-5 h-5 mr-2" /> Instagram
            </a>
           <a href="#shopee-link" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-white transition-colors">Loja na Shopee</a>
        </div>
        <p className="text-slate-400 text-xs">
          Esta é uma estimativa. Para uma instalação precisa, consulte um técnico credenciado.
        </p>
         <p className="text-xs text-slate-500 mt-4">
          © {new Date().getFullYear()} Nexa Refrigeração. Todos os direitos reservados.
        </p>
      </div>
    </footer>
);


const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    width: 0,
    length: 0,
    height: 2.7,
    people: 1,
    electronics: 1,
    windows: 1,
    sunExposure: SunExposure.NONE,
    roomType: RoomType.BEDROOM,
  });

  const [calculatedBtu, setCalculatedBtu] = useState<number | null>(null);
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);

  const getRecommendations = (btu: number): Product[] => {
    const suitableProducts: Product[] = [];
    const bestFitIndex = ALL_PRODUCTS.findIndex(p => p.btu >= btu);

    if (bestFitIndex === -1) return ALL_PRODUCTS.slice(-3);
    
    suitableProducts.push(ALL_PRODUCTS[bestFitIndex]);

    if (bestFitIndex + 1 < ALL_PRODUCTS.length) {
      suitableProducts.push(ALL_PRODUCTS[bestFitIndex + 1]);
    }

    if (suitableProducts.length < 3 && bestFitIndex > 0) {
      const previousProduct = ALL_PRODUCTS[bestFitIndex - 1];
      if (btu - previousProduct.btu < 2000) {
        suitableProducts.unshift(previousProduct);
      }
    }
    
    if (suitableProducts.length < 3 && bestFitIndex + 2 < ALL_PRODUCTS.length) {
      suitableProducts.push(ALL_PRODUCTS[bestFitIndex + 2]);
    }
    
    return suitableProducts.slice(0, 3);
  };

  const calculateBtu = (e: React.FormEvent) => {
    e.preventDefault();

    let btu = 0;
    const area = formData.width * formData.length;
    btu += area * 600;

    if (formData.people > 1) {
      btu += (formData.people - 1) * 600;
    }
    btu += formData.electronics * 600;

    if (formData.sunExposure === SunExposure.MORNING) {
      btu += 800;
    } else if (formData.sunExposure === SunExposure.AFTERNOON) {
      btu += 1200;
    }
    
    btu = Math.max(btu, 7500);
    const finalBtu = Math.ceil(btu / 100) * 100;
    
    setCalculatedBtu(finalBtu);
    setRecommendations(getRecommendations(finalBtu));
    setShowResults(true);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header logoUrl={logoBase64} />
      
      <main>
        <section className="relative py-16 sm:py-20 bg-cover bg-center text-white" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop')` }}>
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="container mx-auto max-w-2xl p-4 sm:p-0 relative z-10">
            <header className="text-center mb-8">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-shadow">
                Calcule os BTUs para seu ambiente
              </h1>
              <p className="mt-4 text-lg text-blue-100">
                Tecnologia e conforto para o seu ambiente. Preencha os campos abaixo.
              </p>
            </header>
            <CalculatorForm formData={formData} setFormData={setFormData} onSubmit={calculateBtu} />
          </div>
        </section>

        <div className={`transition-all duration-700 ease-out ${showResults ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
          <section className="container mx-auto max-w-2xl p-4 sm:p-6 -mt-10 relative z-20">
            <ResultDisplay btu={calculatedBtu} />
            <Recommendations products={recommendations} />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;