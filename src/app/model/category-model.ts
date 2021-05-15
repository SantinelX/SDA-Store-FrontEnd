export interface CategoryResponseDto {
  id: number;
  name: string;
  subCategory: CategoryResponseDto[];
}

export interface CategoryRequestDto {
  name: string;
  parentId: number | null;
}

