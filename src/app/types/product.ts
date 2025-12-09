export interface Product {
    id: number;
    category: string;
    title: string;
    description: string;
    image: string;
    rating: { rate: number, count: number; },
}