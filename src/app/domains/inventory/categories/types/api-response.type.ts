import { Pagination } from '../../../../shared/models/pagination.model';
import { Category } from '../models/category.model';

export interface CategoriesResponse {
  success: boolean;
  data: Category[];
  message: string;
  pagination: Pagination;
}
