export type CampusLocation = {
  name: string;
  position: [number, number];
  image?: string;
  type: 'gate' | 'library' | 'mall' | 'academic' | 'auditorium' | 'sports';
};

export const campusLocations: CampusLocation[] = [
  {
    name: "Main Gate",
    position: [31.2536, 75.7033],
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    type: 'gate',
  },
  {
    name: "Central Library",
    position: [31.2548, 75.7044],
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    type: 'library',
  },
  {
    name: "UniMall",
    position: [31.2552, 75.7052],
    image: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80",
    type: 'mall',
  },
  {
    name: "Block 34",
    position: [31.256, 75.7061],
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    type: 'academic',
  },
  {
    name: "Auditorium",
    position: [31.2529, 75.7049],
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80",
    type: 'auditorium',
  },
  {
    name: "Sports Complex",
    position: [31.2517, 75.7038],
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    type: 'sports',
  },
];
