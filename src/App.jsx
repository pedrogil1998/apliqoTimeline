import { useState, useEffect, useRef } from "react";
import "./App.css";
import PersistentDrawerLeft from "./components/PersistanceDrawer";
import BasicCard from "./components/Card";
import {
  createUnselectedItemList,
  getDateFromObj,
  getMaxDate,
  getMinDate,
  getYearCount,
  handleScrollByIndex,
  modes,
  percentage,
  yearlyArray,
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
import { OtherHouses } from "@mui/icons-material";

function App() {
  const wrapperRef = useRef(null);

  //DATA
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

  //CARDS
  const [selectedCard, setSelectedCard] = useState({});

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

  /*Zoom logic*/
  const [zoom, setZoom] = useState(false);
  const handleZoom = () => {
    setZoom((prevState) => !prevState);
  };

  useEffect(() => {
    zoom
      ? (wrapperRef.current.style.zoom = "30%")
      : (wrapperRef.current.style.zoom = "40%");
  }, [zoom]);

  /*Handlers*/
  const handleNextModal = () => {
    let newItems = createUnselectedItemList(items);
    const foundIndex = newItems.findIndex((element) => element.index === selectedCard.index);
    if (foundIndex < items.length - 1) {
      let nextIndex = foundIndex + 1;
      newItems[nextIndex].selected = true;
      setSelectedCard({ ...newItems[nextIndex] });
      setItems(newItems);
      handleScrollByIndex(nextIndex);
    }
  };

  const handlePreviousModal = () => {
    let newItems = createUnselectedItemList(items);
    const foundIndex = newItems.findIndex((element) => element.index === selectedCard.index);
    if (foundIndex) {
      let nextIndex = foundIndex - 1;
      newItems[nextIndex].selected = true;
      setSelectedCard({ ...newItems[nextIndex] });
      setItems(newItems);
      handleScrollByIndex(nextIndex);
    }
  };

  const handleUnselectAll = () => {
    let newItems = createUnselectedItemList(items);
    setSelectedCard({});
    setItems(newItems);
  };
  const handleSelectItem = (index, e) => {
    let newItems = createUnselectedItemList(items);
    const foundIndex = newItems.findIndex((element) => element.index === index);
    newItems[foundIndex].selected = true;
    setSelectedCard({ ...newItems[foundIndex], index: index });
    setItems(newItems);
    handleScrollByIndex(index, e);
    handleOpen();
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 39 && !open) {
      handleSelectItem(0, e);
    }
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
    handleCloseNew();
  };

  //Helper functions
  const getItemDatePercentage = (item) => {
    const maxDate = getMaxDate(items);
    const minDate = getMinDate(items);

    const dateDif = Math.abs(maxDate - minDate) * 1.2;
    const date = getDateFromObj(item);
    const dateDif2 = Math.abs(date - minDate);
    return percentage(dateDif2, dateDif);
  };

  const checkIfFirstMonth = (year, month) => {
    let savedMonth = "01";
    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      if (item.cardDateObj?.year === year) {
        savedMonth = item.cardDateObj.month;
        break;
      }
    }

    return savedMonth === month;
  };

  return (
    <div onKeyDown={(e) => handleKeyDown(e)}>
      <PersistentDrawerLeft
        filter={filter}
        setFilter={setFilter}
        setMode={setMode}
        mode={mode}
        handleOpenNew={handleOpenNew}
        handleZoom={handleZoom}
      ></PersistentDrawerLeft>

      <div className="extended-view" ref={wrapperRef}>
        {items?.map((item, index) => {
          return (
            <BasicCard
              key={"card_" + index}
              filter={filter}
              item={item}
              index={item.index}
              handleOpen={handleOpen}
              handleSelectItem={handleSelectItem}
              getItemDatePercentage={getItemDatePercentage}
              positionalArray={yearlyArray}
              zoom={zoom}
              checkIfFirstMonth={checkIfFirstMonth}
            />
          );
        })}
      </div>

      {Object.keys(selectedCard).length && (
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
      )}

      <NewCardForm
        open={openNew}
        item={selectedCard}
        handleClose={handleCloseNew}
        postNewCard={handleNewCardApi}
        updateCard={handleEditCardApi}
      />

      <Beeline
        style={{ width: getYearCount(items) * 160 + "vw" }}
        key={selectedCard.index}
        items={items}
        selectedCard={selectedCard}
        mode={mode}
        checkIfFirstMonth={checkIfFirstMonth}
      />
    </div>
  );
}

export default App;
