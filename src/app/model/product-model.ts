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
  productName: string;
  description: string;
  thumbnail: string;
  category: CategoryResponseDto;
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
