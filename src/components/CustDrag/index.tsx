import React from 'react';
import type { FC } from 'react';
import { useDrag } from 'react-dnd';

interface CustDragProps {
  data: any;
}

const CustDrag: FC<CustDragProps> = ({ data }) => {
  const [{ opacity }, dragRef] = useDrag({
    type: 'Field',
    item: { ...data },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  return (
    <div ref={dragRef} style={{ opacity, cursor: 'move' }}>
      {data?.label}
    </div>
  );
};

export default CustDrag;
