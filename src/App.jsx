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
import { Button } from "@mui/material";
import NewCardForm from "./components/NewCardForm";
import {
  deleteCard,
  getCardList,
  postNewCard,
  updateCard,
} from "./requests/requests";

/*Cenas que preciso:
    - Icon da Apliqo
    - Timeline organizada
    - Imagens (?)
  */
/*Scroller: https://www.youtube.com/watch?v=3yfswsnD2sw&ab_channel=KevinPowell */
/*Create fake db: https://www.youtube.com/watch?v=_j3yiadVGQA&ab_channel=CodeWithYousaf */

function App() {
  //data
  const [items, setItems] = useState([]);

  useEffect(() => {
    getCardList(setItems);
  }, []);

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
  const handleClose = (unselect = true) => {
    setOpen(false);
    unselect && handleUnselectAll();
  };

  /*New Card Modal Logic*/
  const [openNew, setOpenNew] = useState(false);
  const handleOpenNew = () => {
    setOpenNew(true);
  };
  const handleCloseNew = () => {
    setOpenNew(false);
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
    setSelectedCard({});
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

  //API - MANAGAMENT HANDLERS
  const handleDeleteCardApi = (id) => {
    deleteCard(id, setItems);
    handleClose();
  };

  const handleNewCardApi = (newItem) => {
    postNewCard(newItem, setItems);
    handleCloseNew();
  };

  const handleEditCardApi = (id, newItem) => {
    updateCard(id, newItem, setItems);
  };

  return (
    <div onKeyDown={(e) => handleKeyDown(e)}>
      <PersistentDrawerLeft
        setFilter={setFilter}
        setMode={setMode}
        mode={mode}
      ></PersistentDrawerLeft>

      {/* <div className="scrollable-timeline snaps-inline" tabIndex={-1} ref={ref}></div> */}
      <div className="extended-view">
        {items?.map((item, index) => {
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
      {mode === modes.MANAGE && <Button onClick={handleOpenNew}>New</Button>}

      <BasicModal
        key={selectedCard}
        item={selectedCard}
        open={open}
        mode={mode}
        handleClose={handleClose}
        handleNextModal={handleNextModal}
        handlePreviousModal={handlePreviousModal}
        deleteCard={handleDeleteCardApi}
        handleOpenNew={handleOpenNew}
      />

      <NewCardForm
        open={openNew}
        item={selectedCard}
        handleClose={handleCloseNew}
        postNewCard={handleNewCardApi}
        updateCard={handleEditCardApi}
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
