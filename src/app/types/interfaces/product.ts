export interface ProductInterface {
    id: number;
    category: string;
    title: string;
    description: string;
    image: string;
    price: number;
    rating: { rate: number, count: number; },
}