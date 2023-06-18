import IFavoriteRepository from '@domain/repository/favorite/FavoriteRepository';

export default class FavoriteUsecase {
  favoriteRepository: IFavoriteRepository;

  constructor(favoriteRepository: IFavoriteRepository) {
    this.favoriteRepository = favoriteRepository;
  }

  async getListFavorite() {
    return await this.favoriteRepository.getListFavorite();
  }

  async addFavorite(recipeId: number) {
    return await this.favoriteRepository.addFavorite(recipeId);
  }

  async deleteFavorite(recipeId: number) {
    return await this.favoriteRepository.deleteFavorite(recipeId);
  }
}
