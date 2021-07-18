import {
  last, groupBy, map, maxBy, range, sortBy, uniqBy,
} from 'lodash';

import { Card, CardRank } from './Card';

const straightLength = 5;
const flushLength = 5;

export function getHighestRankSet(sets: Card[][]) {
  const cardCount = Math.max(0, ...map(sets, 'length'));
  const cardIndexes = range(cardCount);

  const [highestRankSet] = cardIndexes.reduce((highestRankSets, currentIndex) => {
    if (highestRankSets.length === 1) {
      return highestRankSets;
    }
    const highestRankAtCurrentIndex = Math.max(
      ...highestRankSets.map((set) => set[currentIndex]?.numericalRank ?? -Infinity),
    );
    return highestRankSets.filter((set) => (
      set[currentIndex]?.numericalRank === highestRankAtCurrentIndex
    ));
  }, sets);

  return highestRankSet ?? null;
}

export function findHighestFlush(cards: Card[]) {
  const cardsSortedByRank = sortBy(cards, 'numericalRank');
  const cardsByColor = groupBy(cardsSortedByRank, 'color');

  const flushes = Object.values(cardsByColor)
    .flatMap((colorCards) => (
      colorCards.length >= flushLength
        ? [colorCards.slice(-flushLength)]
        : []
    ));

  const highestFlush = getHighestRankSet(flushes);

  return highestFlush;
}

export function findHighestStraightFlush(cards: Card[]) {
  const cardsByColor = groupBy(cards, 'color');

  const straightFlushes = Object.values(cardsByColor)
    .flatMap((colorCards) => {
      const straightFlush = findHighestStraight(colorCards);
      return straightFlush ? [straightFlush] : [];
    });

  const highestStraightFlush = straightFlushes.length >= 1
    ? maxBy(straightFlushes, (straightFlush) => last(straightFlush)!.numericalRank)!
    : null;

  return highestStraightFlush;
}

export function findHighestStraight(cards: Card[]) {
  const cardsSortedByRank = sortBy(cards, 'numericalRank');
  const cardsWithUniqueRanks = uniqBy(cardsSortedByRank, 'rank');

  const highestSequence = cardsWithUniqueRanks
    .slice()
    .reverse()
    .reduce((currentSequence, currentCard) => {
      if (currentSequence.length === straightLength) {
        return currentSequence;
      }
      const previousCard = last(currentSequence);
      if (!previousCard || currentCard.numericalRank === previousCard.numericalRank - 1) {
        return [...currentSequence, currentCard];
      }
      return [currentCard];
    }, [] as Card[])
    .reverse();

  const highestSequenceWithStartingA = (
    highestSequence.length === (straightLength - 1)
    && highestSequence[0].rank === CardRank.n2
    && last(cardsWithUniqueRanks)?.rank === CardRank.A
  ) ? [last(cardsWithUniqueRanks)!, ...highestSequence]
    : highestSequence;

  const highestStraight = highestSequenceWithStartingA.length === straightLength
    ? highestSequenceWithStartingA
    : null;

  return highestStraight;
}
