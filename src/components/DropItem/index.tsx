import React, { useRef } from 'react';
import type { FC } from 'react';
import { useDrop, useDrag } from 'react-dnd';

interface DropItemProps {
  data: any;
  index: number;
  moveRow: (ind: number, inx: number) => void;
  delItem: (ind: number) => void;
}

const DropItem: FC<DropItemProps> = ({ data, index, moveRow, delItem }) => {
  const subFormItemRef = useRef(null);
  const [, drop] = useDrop({
    accept: 'SubFormItem',
    drop: (item: any) => {
      moveRow(item.index, index);
    },
    collect: (monitor) => {
      const { index: dragIndex } = monitor.getItem() || {};

      if (dragIndex === index) {
        return {};
      }

      return {
        isOver: monitor.isOver(),
      };
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'SubFormItem',
    item: {
      index,
      type: 'SubFormItem',
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drop(drag(subFormItemRef));

  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <div
        ref={subFormItemRef}
        style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }}
      >
        {data?.label}
      </div>
      <span style={{ paddingLeft: '20px' }} onClick={() => delItem(index)}>
        删除
      </span>
    </div>
  );
};

export default DropItem;
