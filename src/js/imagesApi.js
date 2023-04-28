import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';

export default class ImagesApi {
  constructor() {
    this.currentQuery = '';
    this.page = 1;
    this.hits = 0;
  }
  async getImage() {
    const options = new URLSearchParams({
      per_page: 40,
      page: this.page,
      key: '35750214-c04e148fdca89a66c6114339d',
      q: this.currentQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    });

    const address = `${BASE_URL}?${options}`;

    try {
      const response = await axios.get(address);
      this.incrPage();

      return response.data;
    } catch (error) {
      console.log(`${error}`);
    }
  }
  get query() {
    return this.currentQuery;
  }
  set query(newQuery) {
    this.currentQuery = newQuery;
  }
  incrHits(hits) {
    this.hits += hits.length;
  }
  resetHits() {
    this.hits = 0;
  }
  incrPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
}
