import { useState, useEffect, useRef } from "react";
import "./App.css";
import PersistentDrawerLeft from "./components/PersistanceDrawer";
import BasicCard from "./components/Card";
import {
  createUnselectedItemList,
  getDateFromObj,
  getMaxDate,
  getMinDate,
  handleScrollByIndex,
  modes,
  percentage,
} from "./utils/utils";
import BasicModal from "./components/Modal";
import Beeline from "./components/Beeline";
import data from "./data/data.json";

/*Cenas que preciso:
    - Icon da Apliqo
    - Timeline organizada
    - Imagens (?)
  */
/*Scroller: https://www.youtube.com/watch?v=3yfswsnD2sw&ab_channel=KevinPowell */
/*Create fake db: https://www.youtube.com/watch?v=_j3yiadVGQA&ab_channel=CodeWithYousaf */

function App() {
  //MANAGEMENT
  const [mode, setMode] = useState(modes.VIEW);
  //FILTER
  const [filter, setFilter] = useState({
    major: false,
    office: false,
    product: false,
  });

  const ref = useRef();
  const [selectedCard, setSelectedCard] = useState({});

  const [items, setItems] = useState(data);
  const [positionalArray, setPosition] = useState([
    [
      { bottom: 650, top: 10, taken: false },
      { bottom: 350, top: 40, taken: false },
      { bottom: 80, top: 70, taken: false },
      { bottom: 350, top: 40, taken: false },
      { bottom: 650, top: 10, taken: false },
    ],
    [
      { bottom: 350, top: 40, taken: false },
      { bottom: 80, top: 70, taken: false },
      { bottom: 350, top: 40, taken: false },
      { bottom: 650, top: 10, taken: false },
      { bottom: 350, top: 40, taken: false },
    ],
    [
      { bottom: 80, top: 70, taken: false },
      { bottom: 650, top: 10, taken: false },
      { bottom: 650, top: 10, taken: false },
      { bottom: 650, top: 10, taken: false },
      { bottom: 650, top: 10, taken: false },
    ],
  ]);

  /*Modal Logic*/
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    handleUnselectAll();
  };

  /*Handlers*/
  const handleNextModal = () => {
    let newItems = createUnselectedItemList(items);
    if (selectedCard.index < items.length - 1) {
      let nextIndex = selectedCard.index + 1;
      newItems[nextIndex].selected = true;
      setSelectedCard({ ...newItems[nextIndex], index: nextIndex });
      setItems(newItems);
      handleScrollByIndex(ref, nextIndex);
    }
  };

  const handlePreviousModal = () => {
    let newItems = createUnselectedItemList(items);
    if (selectedCard.index) {
      let nextIndex = selectedCard.index - 1;
      newItems[nextIndex].selected = true;
      setSelectedCard({ ...newItems[nextIndex], index: nextIndex });
      setItems(newItems);
      handleScrollByIndex(ref, nextIndex);
    }
  };

  const handleUnselectAll = () => {
    let newItems = createUnselectedItemList(items);
    setItems(newItems);
  };
  const handleSelectItem = (index) => {
    let newItems = createUnselectedItemList(items);
    newItems[index].selected = true;
    setSelectedCard({ ...newItems[index], index: index });
    setItems(newItems);
    handleScrollByIndex(ref, index);
    handleOpen();
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 39 && !open) {
      handleSelectItem(0);
    }
  };

  const getItemDatePercentage = (item) => {
    const maxDate = getMaxDate(items);
    const minDate = getMinDate(items);

    const dateDif = Math.abs(maxDate - minDate) * 1.2;
    const date = getDateFromObj(item);
    const dateDif2 = Math.abs(date - minDate);
    return percentage(dateDif2, dateDif);
  };

  return (
    <div onKeyDown={(e) => handleKeyDown(e)}>
      <PersistentDrawerLeft
        setFilter={setFilter}
      ></PersistentDrawerLeft>

      {/* <div className="scrollable-timeline snaps-inline" tabIndex={-1} ref={ref}></div> */}
      <div className="extended-view">
        {items.map((item, index) => {
          return (
            <BasicCard
              key={"card_" + index}
              mode={mode}
              filter={filter}
              item={item}
              index={index}
              handleOpen={handleOpen}
              handleSelectItem={handleSelectItem}
              handleUnselectAll={handleUnselectAll}
              getItemDatePercentage={getItemDatePercentage}
              positionalArray={positionalArray}
              setPosition={setPosition}
            />
          );
        })}
      </div>

      <BasicModal
        key={selectedCard}
        cardDate={selectedCard.cardDate}
        cardSubtitle={selectedCard.cardSubtitle}
        cardDetailedText={selectedCard.cardDetailedText}
        url={selectedCard.url?.source}
        index={selectedCard.index}
        media={selectedCard.media}
        open={open}
        mode={mode}
        handleClose={handleClose}
        handleNextModal={handleNextModal}
        handlePreviousModal={handlePreviousModal}
      />

      <Beeline
        key={selectedCard.index}
        items={items}
        selectedCard={selectedCard}
        handleOpen={handleOpen}
        handleSelectItem={handleSelectItem}
      />
    </div>
  );
}

export default App;
