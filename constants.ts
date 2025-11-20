import { Company, Sector, Volatility, Brand } from './types';

// Helper to generate random history initially
const generateInitialHistory = (basePrice: number, vol: number): any[] => {
  const history = [];
  let price = basePrice;
  const now = Date.now();
  for (let i = 50; i >= 0; i--) {
    const time = new Date(now - i * 1000).toLocaleTimeString();
    const change = price * (Math.random() - 0.5) * vol;
    const open = price;
    const close = price + change;
    const high = Math.max(open, close) + Math.random() * Math.abs(change);
    const low = Math.min(open, close) - Math.random() * Math.abs(change);
    
    history.push({
      time,
      value: close,
      open,
      close,
      high,
      low,
      volume: Math.floor(Math.random() * 1000)
    });
    price = close;
  }
  return history;
};

export const INITIAL_COMPANIES: Company[] = ([
  // KX-10 Heavyweights
  {
    id: '1',
    name: 'Simba Oy',
    ticker: 'SIMBA',
    sector: Sector.MEDIA,
    description: 'Conglomerate holding majority owned by Uuno. Dominates media and brands.',
    volatility: Volatility.LOW,
    basePrice: 72.50,
    currentPrice: 72.50,
    sharesOutstanding: 5000000,
    ownership: 'Mixed',
    history: [],
    logoColor: '#f59e0b',
    change24h: 0,
    dividendYield: 4.2,
    peRatio: 18.5
  },
  {
    id: '2',
    name: 'KNV',
    ticker: 'KNV',
    sector: Sector.INFRA,
    description: 'Kirkkonummi Infrastructure & Registers. State-owned backbone.',
    volatility: Volatility.LOW,
    basePrice: 120.00,
    currentPrice: 120.00,
    sharesOutstanding: 3000000,
    ownership: 'State',
    history: [],
    logoColor: '#3b82f6',
    change24h: 0,
    dividendYield: 2.1,
    peRatio: 25.0
  },
  {
    id: '3',
    name: 'KNT (Turvallisuus)',
    ticker: 'KNT',
    sector: Sector.SECURITY,
    description: 'National Security and Defense. Highly stable government contracts.',
    volatility: Volatility.LOW,
    basePrice: 95.20,
    currentPrice: 95.20,
    sharesOutstanding: 2000000,
    ownership: 'State',
    history: [],
    logoColor: '#1e293b',
    change24h: 0,
    dividendYield: 1.5,
    peRatio: 22.1
  },
  {
    id: '4',
    name: 'Kirkkimetalli Oy',
    ticker: 'METAL',
    sector: Sector.INDUSTRY,
    description: 'Private heavy metal industry. Manufactures parts for infra and defense.',
    volatility: Volatility.MEDIUM,
    basePrice: 45.80,
    currentPrice: 45.80,
    sharesOutstanding: 4000000,
    ownership: 'Private',
    history: [],
    logoColor: '#64748b',
    change24h: 0,
    dividendYield: 3.5,
    peRatio: 12.4
  },
  {
    id: '5',
    name: 'KirkNet',
    ticker: 'KNET',
    sector: Sector.TECH,
    description: 'The internet and network infrastructure provider. Private monopoly.',
    volatility: Volatility.MEDIUM,
    basePrice: 210.50,
    currentPrice: 210.50,
    sharesOutstanding: 1500000,
    ownership: 'Private',
    history: [],
    logoColor: '#06b6d4',
    change24h: 0,
    dividendYield: 0.5,
    peRatio: 45.2
  },
  {
    id: '6',
    name: 'Matkahuolto',
    ticker: 'MATKA',
    sector: Sector.LOGISTICS,
    description: 'Public transport and logistics. Partially state-owned.',
    volatility: Volatility.LOW,
    basePrice: 28.40,
    currentPrice: 28.40,
    sharesOutstanding: 3500000,
    ownership: 'Mixed',
    history: [],
    logoColor: '#f43f5e',
    change24h: 0,
    dividendYield: 5.0,
    peRatio: 10.8
  },
  {
    id: '7',
    name: 'Maatalousosuus',
    ticker: 'AGRO',
    sector: Sector.AGRICULTURE,
    description: 'Primary food production cooperative. Vital for national survival.',
    volatility: Volatility.LOW,
    basePrice: 15.10,
    currentPrice: 15.10,
    sharesOutstanding: 8000000,
    ownership: 'Mixed',
    history: [],
    logoColor: '#22c55e',
    change24h: 0,
    dividendYield: 6.2,
    peRatio: 9.5
  },
  {
    id: '8',
    name: 'Kiinteistövälittäjät Oy',
    ticker: 'REALT',
    sector: Sector.REAL_ESTATE,
    description: 'Major housing market player. 50% owned by Joona.',
    volatility: Volatility.MEDIUM,
    basePrice: 88.90,
    currentPrice: 88.90,
    sharesOutstanding: 1200000,
    ownership: 'Private',
    history: [],
    logoColor: '#8b5cf6',
    change24h: 0,
    dividendYield: 3.8,
    peRatio: 15.0
  },
  {
    id: '9',
    name: 'Merlex Rail Service',
    ticker: 'MERLX',
    sector: Sector.LOGISTICS,
    description: 'Underground metro and rail system. High maintenance costs but essential.',
    volatility: Volatility.HIGH,
    basePrice: 14.20,
    currentPrice: 14.20,
    sharesOutstanding: 6000000,
    ownership: 'Private',
    history: [],
    logoColor: '#d946ef',
    change24h: 0,
    dividendYield: 0.5,
    peRatio: 18.0
  },
  {
    id: '10',
    name: 'CobaltCore',
    ticker: 'COBALT',
    sector: Sector.MINING,
    description: 'Strategic mining operations in Kaivoskaupunki.',
    volatility: Volatility.HIGH,
    basePrice: 55.30,
    currentPrice: 55.30,
    sharesOutstanding: 2500000,
    ownership: 'Private',
    history: [],
    logoColor: '#475569',
    change24h: 0,
    dividendYield: 1.2,
    peRatio: 14.0
  },
  // Additional Companies
  {
    id: '11',
    name: 'ASEL Market',
    ticker: 'ASEL',
    sector: Sector.LOGISTICS,
    description: 'Retail chain giant.',
    volatility: Volatility.MEDIUM,
    basePrice: 32.10,
    currentPrice: 32.10,
    sharesOutstanding: 4000000,
    ownership: 'Private',
    history: [],
    logoColor: '#ef4444',
    change24h: 0,
    dividendYield: 3.0,
    peRatio: 13.0
  },
  {
    id: '12',
    name: 'NorthData Analytics',
    ticker: 'NDATA',
    sector: Sector.TECH,
    description: 'Advanced AI and data processing.',
    volatility: Volatility.HIGH,
    basePrice: 145.00,
    currentPrice: 145.00,
    sharesOutstanding: 800000,
    ownership: 'Private',
    history: [],
    logoColor: '#10b981',
    change24h: 0,
    dividendYield: 0,
    peRatio: 55.0
  },
  {
    id: '13',
    name: 'GK Energia',
    ticker: 'GKE',
    sector: Sector.ENERGY,
    description: 'Electricity and District Heating provider.',
    volatility: Volatility.LOW,
    basePrice: 65.40,
    currentPrice: 65.40,
    sharesOutstanding: 2200000,
    ownership: 'State',
    history: [],
    logoColor: '#facc15',
    change24h: 0,
    dividendYield: 5.5,
    peRatio: 11.0
  },
  {
    id: '15',
    name: 'BlueBarrel Chemicals',
    ticker: 'CHEM',
    sector: Sector.INDUSTRY,
    description: 'Industrial chemicals and processing.',
    volatility: Volatility.MEDIUM,
    basePrice: 89.00,
    currentPrice: 89.00,
    sharesOutstanding: 1100000,
    ownership: 'Private',
    history: [],
    logoColor: '#3b82f6',
    change24h: 0,
    dividendYield: 2.5,
    peRatio: 19.0
  },
  {
    id: '16',
    name: 'K-Void Robotics',
    ticker: 'VOID',
    sector: Sector.TECH,
    description: 'Industrial automation and robotics.',
    volatility: Volatility.HIGH,
    basePrice: 230.00,
    currentPrice: 230.00,
    sharesOutstanding: 500000,
    ownership: 'Private',
    history: [],
    logoColor: '#6366f1',
    change24h: 0,
    dividendYield: 0,
    peRatio: 60.0
  },
  {
    id: '17',
    name: 'PureWater Oy',
    ticker: 'H2O',
    sector: Sector.INFRA,
    description: 'Water reserves and purification.',
    volatility: Volatility.LOW,
    basePrice: 40.00,
    currentPrice: 40.00,
    sharesOutstanding: 5000000,
    ownership: 'State',
    history: [],
    logoColor: '#0ea5e9',
    change24h: 0,
    dividendYield: 4.0,
    peRatio: 14.0
  }
] as Company[]).map(c => ({
  ...c,
  history: generateInitialHistory(c.basePrice, c.volatility)
}));

export const BRANDS: Brand[] = [
  // KNV Ecosystem - Direct Subsidiaries
  { id: 'knv-1', name: 'KirkCom Systems', category: 'Electronics & Tech', description: 'Radiot, tukiasemat, päätelaitteet', parent: 'KNV' },
  { id: 'knv-2', name: 'Silvarn Robotics', category: 'Electronics & Tech', description: 'Automaatiolaitteet, teollisuusrobotit', parent: 'KNV' },
  { id: 'knv-3', name: 'Oxenbyte', category: 'Electronics & Tech', description: 'Palvelimet, KNV:n sisäiset tietokoneet', parent: 'KNV' },
  { id: 'knv-4', name: 'Norell Circuitry', category: 'Electronics & Tech', description: 'Piirikortti- ja elektroniikkamoduulit', parent: 'KNV' },
  
  // KNV - Chemicals & Specialized Products
  { id: 'knv-p1', name: 'Crysol-9', category: 'Industrial Chemicals', description: 'Kylmäreaktiokemikaali metalli- ja testauskäyttöön', parent: 'KNV' },
  { id: 'knv-p2', name: 'Doxelene IR-4', category: 'Industrial Chemicals', description: 'Rasvanpoisto- ja metallipuhdistuskemikaali', parent: 'KNV' },
  { id: 'knv-p3', name: 'Fermax Stabilon', category: 'Industrial Chemicals', description: 'Raskaiden koneiden voiteluaine', parent: 'KNV' },
  { id: 'knv-p4', name: 'Krutahl Compound B', category: 'Industrial Chemicals', description: 'Rakennusmateriaalien kovetin', parent: 'KNV' },
  { id: 'knv-p5', name: 'Nexylate-R', category: 'Industrial Chemicals', description: 'KNV:n oma korroosionkestävä pinnoite', parent: 'KNV' },
  { id: 'knv-p6', name: 'Vergon Sealant 220', category: 'Industrial Chemicals', description: 'Teollisuustiiviste, pakkauskemikaali', parent: 'KNV' },
  { id: 'knv-p7', name: 'Rimoxene', category: 'Industrial Chemicals', description: 'Kenttäkäyttöön tarkoitettu polttoainepuhdistaja', parent: 'KNV' },

  // KNT Ecosystem
  { id: 'knt-1', name: 'Kastrel Optics', category: 'Defense Tech', description: 'Kamerasensorit, lämpökuvantimet', parent: 'KNT' },
  { id: 'knt-2', name: 'Vargen Systems', category: 'Defense Tech', description: 'Turvallisuusjärjestelmät ja valvontateknologia', parent: 'KNT' },
  { id: 'knt-3', name: 'Ferron Shieldworks', category: 'Defense Tech', description: 'Ballistiset suojat ja panssarointi', parent: 'KNT' },
  { id: 'knt-4', name: 'Starvon Tactical ENG.', category: 'Defense Tech', description: 'Taktiset varusteet ja pioneerikalusto', parent: 'KNT' },

  // Shared / Contractors
  { id: 'shared-1', name: 'Rauthlik Solutions', category: 'Engineering', description: 'Solutions provider for both KNV and KNT', parent: 'KNT' },

  // Food & Drink
  { id: 'fd-1', name: 'Norrik Grain Co.', category: 'Food & Drink', description: 'Kirkkonummen kauratuotteet, leivät, myslit' },
  { id: 'fd-2', name: 'KirkPort Fishline', category: 'Food & Drink', description: 'Järvikala-, lohi- ja säilykelinjasto' },
  { id: 'fd-3', name: 'Vellaro Foods', category: 'Food & Drink', description: 'Valmisruuat ja säilykkeet' },
  { id: 'fd-4', name: 'Orvento Dairy', category: 'Food & Drink', description: 'Maitotaloustuotteet, jogurtit, juustot' },
  { id: 'fd-5', name: 'Kaskenmarja', category: 'Food & Drink', description: 'Marjajuomat ja hillot' },
  { id: 'fd-6', name: 'PajuBrew', category: 'Food & Drink', description: 'Paikallinen virvoitus- ja energiajuomabrändi' },
  { id: 'fd-7', name: 'Kivilähde Natural', category: 'Food & Drink', description: 'Kivennäis- ja lähdevedet' },
  { id: 'fd-8', name: 'Kettel’s Pantry', category: 'Food & Drink', description: 'Välipalat ja peruskeksejä' },
  { id: 'fd-9', name: 'PajuHarvest', category: 'Food & Drink', description: 'Kasvis- ja hedelmäpakasteet' },
  { id: 'fd-10', name: 'Lunava Oils', category: 'Food & Drink', description: 'Ruokaöljyt ja paistinrasvat' },
  { id: 'fd-11', name: 'Tammer Drinks', category: 'Food & Drink', description: 'Virvoitusjuomat ja makuvedet' },
  { id: 'fd-12', name: 'KultaMylly', category: 'Food & Drink', description: 'Jauhot ja leipomotarvikkeet' },

  // Apparel
  { id: 'cl-1', name: 'Harmont Industries', category: 'Apparel', description: 'Työvaatteet, turvavarusteet' },
  { id: 'cl-2', name: 'Varlik Outfitter', category: 'Apparel', description: 'Ulkovaatteet ja talvivarusteet' },
  { id: 'cl-3', name: 'Ryvö Knitworks', category: 'Apparel', description: 'Villapaidat, pipot, huivit' },
  { id: 'cl-4', name: 'Kelman Workshop', category: 'Apparel', description: 'Raskaan käytön housut, takit' },
  { id: 'cl-5', name: 'Torken Utility', category: 'Apparel', description: 'Reput, laukut, kenttävarusteet' },
  { id: 'cl-6', name: 'Leafbound', category: 'Apparel', description: 'Siviilivaatteiden premium-linja' },

  // Home & Tools
  { id: 'hm-1', name: 'Solvanta Cleanline', category: 'Home', description: 'Pesuaineet, kodin kemikaalit' },
  { id: 'hm-2', name: 'Kvaston Tools', category: 'Home', description: 'Työkalu- ja pientarvikeyhtiö' },
  { id: 'hm-3', name: 'Merkall Lighting', category: 'Home', description: 'Valaisimet ja sähkötuotteet' },
  { id: 'hm-4', name: 'Tremura Furnish', category: 'Home', description: 'Peruskalusteet' }
];