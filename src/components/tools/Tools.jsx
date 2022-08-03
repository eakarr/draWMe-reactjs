import Selection from "./selection/Selection";
import Line from "./line/Line";
import Rectangle from "./rectangle/Rectangle";
import Pencil from "./pencil/Pencil";
import TextArea from "./text/Text";
import Eraser from "./eraser/Eraser";
import TrashBin from "./trashBin/TrashBin";

import "./Tools.scss";

const Tools = () => {
  return (
    <div className="container--tools position-fixed flex flex-jcenter flex-acenter flex-dcolumn">
      <Selection />
      <Line />
      <Rectangle />
      <Pencil />
      <TextArea />
      <Eraser />
      <TrashBin />
    </div>
  );
};

export default Tools;
