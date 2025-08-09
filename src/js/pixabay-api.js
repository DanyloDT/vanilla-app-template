import axios from 'axios';

const API_KEY = '37105589-3d487ec0acc050f78cec264eb';
const BASE_URL = 'https://pixabay.com/api/';
export const PER_PAGE = 15;
export const getImagesByQuery = async (query, page = 1) => {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: PER_PAGE,
  });

  return await axios.get(`${BASE_URL}?${searchParams}`);
};
