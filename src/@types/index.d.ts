// eslint-disable-next-line import/no-extraneous-dependencies
// import '@testing-library/jest-dom/extend-expect';

declare module '*.png';
declare module '*.svg';

type ProductType = { name: string; categoryId: string; file: string; id: string };
type CategoryType = { name: string; id: string, color: string };
type CurrentUser = { favorites: Array<{ product_id: string; time_added: string }> };

type SelectorsType = { products: Array<ProductType>; categories: Array<CategoryType>; currentUser: Array<CurrentUser> };
