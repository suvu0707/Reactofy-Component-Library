import React from 'react';
import { useDrag, useDrop } from "react-dnd"

import { headerRenderer } from "../../../../src"

export function DraggableHeaderRenderer({
  onColumnsReorder,
  column,
  ...props
}) {
  const [{ isDragging }, drag] = useDrag({
    type: "COLUMN_DRAG",
    item: { key: column.key },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  })

  const [{ isOver }, drop] = useDrop({
    accept: "COLUMN_DRAG",
    drop({ key }) {
      onColumnsReorder(key, column.key)
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  })

  return (
    <div
      ref={ref => {
        drag(ref)
        drop(ref)
      }}
      style={{
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: isOver ? "#ececec" : undefined,
        cursor: "move"
      }}
    >
      {headerRenderer({ column, ...props })}
    </div>
  )
}
