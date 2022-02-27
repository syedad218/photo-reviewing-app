export interface Image {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
}
export interface State {
  user: {
    id: string | null;
  };
  randomImages: {
    loading: boolean;
    error: string | null;
    data: Array<Image>;
  };
  currentImageIndex: number;
  likedImages: {
    loading: boolean;
    error: string | null;
    data: Array<Image>;
    hasMore: boolean;
  };
}
