import {UserDto} from './user-models';
import {CategoryRequestDto, CategoryResponseDto} from './category-model';

export interface ProductRequestDto {
  id: number | null;
  productName: string;
  description: string;
  thumbnail: string;
  categoryId: number;
  price: number;
  productType: string;
  userAuthor: string;
}

export interface ProductResponseDto {
  id: number;
  productName: string;
  description: string;
  thumbnail: string;
  categoryId: string;
  categoryName: string;
  price: number;
  productType: string;
  userAuthor: UserDto;
}

export interface ProductType {
  id: number;
  name: string;
}

export enum ProductTyp{
  PRODUCT, ACCESORIES
}

export interface PaginatedProductResponse{
  content: ProductResponseDto[];
  totalElements: number;
}

export interface ProductFilters {
  name?: string | undefined;
  productType?: string | undefined;
  lowPrice?: string | undefined;
  highPrice?: string | undefined;
  categoryId?: string | undefined;
}
