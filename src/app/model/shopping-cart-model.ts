export interface ShoppingCartResponseDto {
  productsInCart: ProductShoppingCartResponseDto[];
}

export interface ProductShoppingCartResponseDto{
  id: number;
  name: string;
}
