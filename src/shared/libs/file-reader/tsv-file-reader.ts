import { readFileSync } from 'node:fs';
import { FileReader } from './file-reader.interface.js';
import { Offer, OfferType, Feature, User } from '../../types/index.js';
import chalk from 'chalk';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(private readonly filename: string) {}

  private validateRawData(): void {
    if (!this.rawData) {
      throw new Error('File was not read');
    }
  }

  private parseRawDataToOffers(): Offer[] {
    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => this.parseLineToOffer(line));
  }

  private parseFeatures(features: string): Feature[] {
    return features.split(', ').map((item) => ({name: item}));
  }

  private parsePhotos(photos: string): string[] {
    return photos.split(', ');
  }

  private parseBoolean(value: string): boolean {
    return value === 'true';
  }

  private parseLineToOffer(line: string): Offer {
    const parts = line.split('\t');
    if (parts.length < 17) {
      console.error(chalk.red('Unexpected number of elements:', parts.length));
      throw new Error('Each line must contain 17 fields separated by tabs');
    }
    const [
      title,
      description,
      createdDate,
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
      features,
      name,
      email,
      usertype,
      avatarPath,
      commentsNumber,
      coordinates,
    ] = parts;

    return {
      title,
      description,
      postDate: new Date(createdDate),
      city,
      image,
      photos: this.parsePhotos(photos),
      isPremium: this.parseBoolean(isPremium),
      isFavorite: this.parseBoolean(isFavorite),
      rating: Number(rating),
      type: OfferType[type as 'apartment' | 'house' | 'room' | 'hotel'],
      roomNumber: Number(roomNumber),
      guestsNumber: Number(guestsNumber),
      price: this.parsePrice(price),
      features: this.parseFeatures(features),
      author: this.parseUser(name, usertype, avatarPath, email),
      commentsNumber: Number(commentsNumber),
      coordinates: this.parseCoordinated(coordinates),
    };
  }

  private parseCoordinated(coordinates: string): string[] {
    return coordinates.split(', ');
  }

  private parsePrice(priceString: string): number {
    return Number.parseInt(priceString, 10);
  }

  private parseUser(name: string, email: string, avatarPath: string, usertype: string): User {
    return { email, name, avatarPath, usertype};
  }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    this.validateRawData();
    return this.parseRawDataToOffers();
  }
}
