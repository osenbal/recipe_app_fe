import {
  IGetFavoriteResponse,
  IAddFavoriteResponse,
} from '@domain/entity/favorite/structures/GetFavorite';

export default interface IFavoriteRepository {
  getListFavorite: () => Promise<IGetFavoriteResponse>;
  addFavorite: (recipeId: number) => Promise<IAddFavoriteResponse>;
  deleteFavorite: (recipeId: number) => Promise<IAddFavoriteResponse>;
}
