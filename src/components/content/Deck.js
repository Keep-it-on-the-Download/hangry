import React, { useState } from 'react';
import { useSprings, animated, interpolate } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import { makeStyles } from '@material-ui/core/styles';

import Card from './Card';

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = (i) => ({
  x: 0,
  y: 0,
  scale: 1,
  rot: 0,
  delay: 0,
});
const from = (i) => ({ x: 0, rot: 0, scale: 1, y: 0 });
// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r, s) =>
  `perspective(0px) rotateX(0deg) rotateY(${
    r / 10
  }deg) rotateZ(${r}deg) scale(${s})`;

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    touchAction: 'none',
  },
}));

function Deck(props) {
  const classes = useStyles();
  const { cards } = props;

  const [gone] = useState(() => new Set()); // The set flags all the cards that are flicked out
  const [springs, set] = useSprings(cards.length, (i) => ({
    ...to(i),
    from: from(i),
  })); // Create a bunch of springs using the helpers above
  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  const bind = useDrag(
    ({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
      const trigger = velocity > 0.2; // If you flick hard enough it should trigger the card to fly out
      const dir = xDir < 0 ? -1 : 1; // Direction should either point left or right
      if (!down && trigger) {
        // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
        gone.add(index);
        if (dir < 0) {
          props.unselectRestaurant();
        } else {
          props.selectRestaurant();
        }
      }
      set((i) => {
        if (index !== i) return; // We're only interested in changing spring-data for the current spring
        const isGone = gone.has(index);
        const x = isGone ? (100 + window.innerWidth) * dir : down ? mx : 0; // When a card is gone it flys out left or right, otherwise goes back to zero
        const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0); // How much the card tilts, flicking it harder makes it rotate faster
        const scale = down ? 1.01 : 1; // Active cards lift up a bit
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 1200 : isGone ? 200 : 500 },
        };
      });
      if (!down && gone.size === cards.length)
        setTimeout(() => gone.clear() || set((i) => to(i)), 600);
    }
  );

  return springs.map(({ x, y, rot, scale }, i) => (
    <animated.div
      key={i}
      className={classes.root}
      style={{
        transform: interpolate(
          [x, y],
          (x, y) => `translate3d(${x}px,${y}px,0)`
        ),
      }}
    >
      <animated.div
        {...bind(i)}
        style={{
          transform: interpolate([rot, scale], trans),
        }}
      >
        <Card
          id={cards[i].id}
          name={cards[i].name}
          price={cards[i].price}
          image_url={cards[i].image_url}
        />
      </animated.div>
    </animated.div>
  ));
}

export default Deck;
