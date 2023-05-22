import logo from './logo.svg';
import './App.css';
import {closestCenter, DndContext, DragOverlay, MouseSensor, TouchSensor, useSensor, useSensors} from "@dnd-kit/core";
import {useState} from "react";
import {arrayMove, horizontalListSortingStrategy, SortableContext} from "@dnd-kit/sortable";
import Sortable from "./sortable";


function App() {
  const [activeId, setActiveId] = useState(null);
  const [items, setItems] = useState([1,2,3,4])
  function handleDragOver(event) {
    const {active, over} = event;

    if (active.id !== over.id) {
      const {active, over} = event;

      if (active.id !== over.id) {
        setItems((items) => {
          const oldIndex = items.indexOf(active.id);
          const newIndex = items.indexOf(over.id);
          const result = arrayMove(items, oldIndex, newIndex);
          return result
        });
      }
    }
  }
  function handleDragStart(event) {
    setActiveId(event.active.id);
  }

  function handleDragEnd() {
    setActiveId(null);
  }
  const sensors = useSensors(
      useSensor(MouseSensor, {
        // Require the mouse to move by 10 pixels before activating
        activationConstraint: {
          distance: 10,
        },
      }),
      useSensor(TouchSensor, {
        // Press delay of 250ms, with tolerance of 5px of movement
        activationConstraint: {
          delay: 250,
          tolerance: 5,
        },
      })
  );

  return (
    <div className="App">
      <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
      >
        <SortableContext items={items} strategy={horizontalListSortingStrategy}>
          {items.map(x => (
              <Sortable id={x}/>
          ))}
        </SortableContext>
        <DragOverlay>
          {activeId ? <Sortable id={activeId}/> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

export default App;
