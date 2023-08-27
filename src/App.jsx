import { useState, useRef } from "react";
import "./App.css";
import { Chrono } from "react-chrono";
import BasicItem from "./components/Item";
import PersistentDrawerLeft from "./components/PersistanceDrawer";
import BasicCard from "./components/Card";
import { Button } from "@mui/material";
import { createUnselectedItemList, handleScrollByIndex } from "./utils/utils";
import BasicModal from "./components/Modal";
import Beeline from "./components/Beeline";
import data from "./data/data.json";
function App() {
  const ref = useRef();
  const [cardList, setCardList] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  /*Cenas que preciso:
    - Icon da Apliqo
    - Timeline organizada
    - Imagens (?)
  */
  /*Scroller: https://www.youtube.com/watch?v=3yfswsnD2sw&ab_channel=KevinPowell */
  /*Create fake db: https://www.youtube.com/watch?v=_j3yiadVGQA&ab_channel=CodeWithYousaf */
  const [items, setItems] = useState(data);

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

  const handleRemoveByIndex = (index) => {
    console.log(index);
    setCardList((list) => list.filter((obj) => obj.props.index !== index));
  };
  const handleAddCardList = () => {
    setCardList((list) => [
      ...list,
      <BasicCard
        handleRemove={handleRemoveByIndex}
        key={"card" + list.length}
        cardDate={"card " + list.length}
        index={list.length}
      ></BasicCard>,
    ]);
    console.log(cardList);
  };
  const handleRemoveCardList = () => {
    setCardList((list) => list.slice(0, -1));
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

  return (
    <div onKeyDown={(e) => handleKeyDown(e)}>
      <PersistentDrawerLeft></PersistentDrawerLeft>

      <div className="scrollable-timeline snaps-inline" tabIndex={-1} ref={ref}>
        {items.map((item, index) => {
          return (
            <BasicCard
              cardDate={item.cardDate}
              cardSubtitle={item.cardSubtitle}
              cardDetailedText={item.cardDetailedText}
              key={"card_" + index}
              url={item.url}
              media={item.media}
              index={index}
              selected={item.selected}
              handleOpen={handleOpen}
              handleSelectItem={handleSelectItem}
              handleUnselectAll={handleUnselectAll}
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
        handleClose={handleClose}
        handleNextModal={handleNextModal}
        handlePreviousModal={handlePreviousModal}
      />

      {/* <div>
        <Button onClick={handleAddCardList}>add new card </Button>
        <Button onClick={handleRemoveCardList}>remove card </Button>
        
      </div> */}

      <Beeline
        key={selectedCard.index}
        items={items}
        selectedCard={selectedCard}
        handleOpen={handleOpen}
        handleSelectItem={handleSelectItem}
      />

      {/* <div className="App">
        <div style={{ width: "100%" }}>
          <Chrono
            key={items}
            items={items}
            theme={{
              primary: "#202E39",
              secondary: "#F4F9FC",
              cardBgColor: "#1E76BC",
              cardMediaBgColor: "#1E76BC",
              cardDateColor: "#FFFFFF",
              titleColor: "#146646",
              titleColorActive: "#146646",
            }}
            mode="HORIZONTAL"
            contentDetailsHeight={100}
            hideControls={true}
            fontSizes={{
              title: "1rem",
            }}
            slideShow
            onItemSelected={(e) => {}}
            cardLess={true}
          >
            { <BasicItem cardDate="texto" cardSubtitle="texto1" cardDetailedText="texto2" url="texto2"></BasicItem> }
          </Chrono>
        </div>
      </div> */}
    </div>
  );
}

export default App;
