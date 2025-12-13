export interface Cart {
    products: [{ productId: number; quantity: number; }] | [];
}