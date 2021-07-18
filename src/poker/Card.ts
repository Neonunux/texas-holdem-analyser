export enum CardRank {
  n2 = '2',
  n3 = '3',
  n4 = '4',
  n5 = '5',
  n6 = '6',
  n7 = '7',
  n8 = '8',
  n9 = '9',
  T = 'T',
  J = 'J',
  Q = 'Q',
  K = 'K',
  A = 'A',
}

export enum CardColor {
  Clubs = 'c',
  Diamonds = 'd',
  Hearts = 'h',
  Spades = 's',
}

const cardNumericalRanks = new Map([
  [CardRank.n2, 2],
  [CardRank.n3, 3],
  [CardRank.n4, 4],
  [CardRank.n5, 5],
  [CardRank.n6, 6],
  [CardRank.n7, 7],
  [CardRank.n8, 8],
  [CardRank.n9, 9],
  [CardRank.T, 10],
  [CardRank.J, 11],
  [CardRank.Q, 12],
  [CardRank.K, 13],
  [CardRank.A, 14],
]);

export class Card {
  public readonly rank: CardRank;

  public readonly color: CardColor;

  constructor(rank: CardRank, color: CardColor) {
    this.rank = rank;
    this.color = color;
  }

  get numericalRank() {
    return cardNumericalRanks.get(this.rank)!;
  }

  toString() {
    return `${this.rank}${this.color}`;
  }

  static toStringMultiple(cards: Card[]) {
    return cards
      .map((card) => card.toString())
      .join();
  }

  static fromString(cardCode: string) {
    if (cardCode.length !== 2) {
      throw Error(`Invalid length \`${cardCode.length}\` of card code '${cardCode}'.`);
    }

    const [rank, color] = cardCode.split('');

    if (!(Object.values(CardRank) as string[]).includes(rank)) {
      throw Error(`Invalid rank '${rank}' from card code '${cardCode}'.`);
    }

    if (!(Object.values(CardColor) as string[]).includes(color)) {
      throw Error(`Invalid color '${color}' from card code '${cardCode}'.`);
    }

    return new Card(rank as CardRank, color as CardColor);
  }

  static fromStringMultiple(multipleCardsCode: String) {
    const cardCodes = multipleCardsCode.match(/.{1,2}/g) ?? [];

    return cardCodes.map(this.fromString);
  }
}
