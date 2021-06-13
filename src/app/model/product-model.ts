import {UserDto} from './user-models';


export interface ProductRequestDto {
  id: number | null;
  product_name: string;
  description: string;
  thumbnail: string;
  categoryId: number;
  price: number;
  productType: string;
  userAuthor: string;
  stock: number;
}

export interface ProductResponseDto {
  id: number;
  product_name: string;
  description: string;
  thumbnail: string;
  categoryId: string;
  categoryName: string;
  price: number;
  productType: string;
  userAuthor: UserDto;
  stock: number;
}

export interface ProductType {
  id: number;
  name: string;
}

export interface PaginatedProductResponse{
  content: ProductResponseDto[];
  totalElements: number;
}

export interface ProductFilters {
  name?: string | undefined;
  productType?: string | undefined;
  lowPrice?: number | undefined;
  highPrice?: number | undefined;
  categoryId?: string | undefined;
}


export interface ProductOrderLine {
  productId: number;
  quantity: number;
}
