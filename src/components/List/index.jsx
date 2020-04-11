import React from 'react';
import axios from 'axios';
import classNames from 'classnames';

import removeSvg from '../../assets/icons/remove.svg';

import Badge from '../Badge';

import './List.scss';

const List = ({ items, isRemovable, onClick, onRemove }) => {
  
  const removeList = (item) => {
    if (window.confirm('Вы действительно хотите удалить задачу?')) {
      axios.delete('http://localhost:3001/lists/' + item.id)
        .then(() => {
          onRemove(item.id);
        })
    }
  };

    return (
        <ul onClick={onClick} className="list">
            {items.map((item, index) => (
                <li 
                  key={index} 
                  className={classNames(item.className, {
                    active: item.active
                  })}
                >
                  <i> {item.icon ? item.icon : <Badge color={item.color.name} />}</i>           
                  <span>{item.name}</span>
                  {isRemovable && (
                    <img 
                      className="list__remove-icon" 
                      src={removeSvg} 
                      alt="remove"
                      onClick={() => removeList(item)}
                    />
                  )}
                </li>
            ))}
        </ul>
    );
};

export default List;