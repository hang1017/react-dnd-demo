import React, { useState } from 'react';
import type { FC } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { CustDrag, CustDrop } from '@/components';
import styles from './index.less';

interface DndPageProps {}

const dndList = [
  { label: '标签1', value: '值1' },
  { label: '标签2', value: '值2' },
  { label: '标签3', value: '值3' },
];

const DndPage: FC<DndPageProps> = () => {
  const [list, setList] = useState<any[]>(dndList);

  const dropChange = (res: any[]) => {
    const valList = (res || []).map((item) => item?.value);
    const filterList = dndList.filter((item) => !valList.includes(item.value));
    setList(filterList);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.center}>
        <span>请拖拽：</span>
        <div
          style={{
            border: '1px solid #000',
            minHeight: '200px',
          }}
        >
          {list.map((item) => {
            return <CustDrag key={item?.value} data={item} />;
          })}
        </div>
        <div style={{ marginTop: '10px' }}>请放置：</div>
        <CustDrop onChange={dropChange} />
      </div>
    </DndProvider>
  );
};

export default DndPage;
