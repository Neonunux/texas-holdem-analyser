import React, { useState } from 'react';

import { Card } from '../poker/Card';
import {
  findHighestFlush,
  findHighestStraight,
  findHighestStraightFlush,
} from '../poker/pokerHand';

// As2cKsQh3c5c4c
// AdKdJdQd

export function PokerHandDetector() {
  const [holeCardsCode, setHoleCardsCode] = useState('');
  const [communityCardsCode, setCommunityCardsCode] = useState('');
  const [hasStraight, setHasStraight] = useState(false);
  const [hasFlush, setHasFlush] = useState(false);
  const [hasStraightFlush, setHasStraightFlush] = useState(false);

  const processDetection = () => {
    const allCardsCode = `${holeCardsCode}${communityCardsCode}`;
    const allCards = Card.fromStringMultiple(allCardsCode);

    setHasStraight(!!findHighestStraight(allCards));
    setHasFlush(!!findHighestFlush(allCards));
    setHasStraightFlush(!!findHighestStraightFlush(allCards));
  };

  return (
    <>
      <label>
        main&nbsp;
        <input
          type="text"
          value={holeCardsCode}
          onChange={(event) => setHoleCardsCode(event.target.value)}
        />
      </label>
      <label>
        table&nbsp;
        <input
          type="text"
          value={communityCardsCode}
          onChange={(event) => setCommunityCardsCode(event.target.value)}
        />
      </label>
      <button
        type="button"
        onClick={processDetection}
      >
        détecter la meilleure main
      </button>
      <div>
        suite :&nbsp;
        { hasStraight ? 'oui' : 'non' }
      </div>
      <div>
        couleur :&nbsp;
        { hasFlush ? 'oui' : 'non' }
      </div>
      <div>
        quinte flush :&nbsp;
        { hasStraightFlush ? 'oui' : 'non' }
      </div>
    </>
  );
}
