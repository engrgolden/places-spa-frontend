export type Place = {
  id: string;
  creatorId: string;
  title: string;
  address: string;
  description: string;
  imageUrl: string;
  coordinates: { lat: number; lng: number };
};
