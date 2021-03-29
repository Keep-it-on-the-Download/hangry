import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
// import * as constants from '../constants';

class Card extends React.Component {
  renderCard = () => {
    const { worker, index } = this.props;
    const styles = {
      zIndex: 100 - index,
      transform: `
        translateY(${index * 10}px)
        translateX(-50%)
        scale(${1 - index * 0.02})
      `,
    };

    return (
      <div className='card' style={styles}>
        <p>{worker.name}</p>
      </div>
    );
  };

  renderDraggableCard = () => {
    const { worker } = this.props;

    return (
      <Draggable draggableId={worker.id} type='CARD'>
        {(provided, snapshot) => {
          const styles = {
            ...provided.draggableStyle,
            zIndex: 100,
            left: 'calc(50% - 125px)',
          };
          return (
            <div
              ref={provided.innerRef}
              className='card'
              style={styles}
              {...provided.dragHandleProps}
            >
              <p>{worker.name}</p>
            </div>
          );
        }}
      </Draggable>
    );
  };

  render() {
    return this.props.index === 0
      ? this.renderDraggableCard()
      : this.renderCard();
  }
}

export default Card;
