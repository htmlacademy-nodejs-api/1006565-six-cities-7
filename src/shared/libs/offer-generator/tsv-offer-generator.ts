import dayjs from 'dayjs';

import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData, OfferType } from '../../types/index.js';
import {
  generateRandomValue,
  getRandomItem,
  getRandomItems,
} from '../../helpers/index.js';

const MIN_PRICE = 500;
const MAX_PRICE = 2000;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItems<string>(this.mockData.title).join(';');
    const description = getRandomItem<string>(this.mockData.description);
    const city = getRandomItem<string>(this.mockData.city);
    const image = getRandomItem<string>(this.mockData.image);
    const photos = getRandomItem<string>(this.mockData.photos);
    const isPremium = getRandomItem(this.mockData.isPremium);
    const isFavorite = getRandomItem(this.mockData.isFavorite);
    const rating = getRandomItem(this.mockData.rating);
    const type = getRandomItem(this.mockData.type);
    const roomNumber = getRandomItem(this.mockData.roomNumber);
    const guestsNumber = getRandomItem(this.mockData.guestsNumber);
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const author = getRandomItem(this.mockData.author);
    const features = getRandomItem(this.mockData.features);
    const commentsNumber = getRandomItem(this.mockData.commentsNumber);
    const coordinates = getRandomItem(this.mockData.coordinates);

    const postDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();

    return [
      title,
      description,
      city,
      image,
      photos,
      isPremium,
      isFavorite,
      rating,
      type,
      roomNumber,
      guestsNumber,
      price,
      author,
      features,
      coordinates,
      postDate,
      commentsNumber,
    ].join('\t');
  }
}
