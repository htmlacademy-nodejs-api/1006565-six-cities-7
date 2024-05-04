import { readFileSync } from 'node:fs';
import { FileReader } from './file-reader.interface.js';
import { Offer, OfferType } from '../../types/index.js';
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

  private parseFeatures(features: string): string[] {
    return features.split(', ');
  }

  private parsePhotoes(photoes: string): string[] {
    return photoes.split(', ');
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
      photoes,
      isPremium,
      isFavorite,
      rating,
      type,
      roomNumber,
      guestsNumber,
      price,
      features,
      author,
      commentsNumber,
      coordinates,
    ] = parts;

    return {
      title,
      description,
      postDate: new Date(createdDate),
      city,
      image,
      photoes: this.parsePhotoes(photoes),
      isPremium: this.parseBoolean(isPremium),
      isFavorite: this.parseBoolean(isFavorite),
      rating: Number(rating),
      type: OfferType[type as 'apartment' | 'house' | 'room' | 'hotel'],
      roomNumber: Number(roomNumber),
      guestsNumber: Number(guestsNumber),
      price: this.parsePrice(price),
      features: this.parseFeatures(features),
      author: this.parseUser(author),
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

  private parseUser(author: string): string {
    return author;
  }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    this.validateRawData();
    return this.parseRawDataToOffers();
  }
}
