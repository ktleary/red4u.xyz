import * as React from "react";
import { useEffect, useState } from "react";
import { buildUrls, feelingLucky } from "../util";
import List from "./List";

interface Props {
  instances: string[];
}

const inputStyle = {
  width: "67%",
};

const containerStyle = {
  marginTop: 12,
};

const buttonWrapperStyle = {
  display: "flex",
  justifyContent: "space-between",
  width: "67%",
};

const buttonStyle = {
  marginLeft: 12,
  width: '30%',
  maxHeight: 64,
};

const Sub = ({ instances }: Props) => {
  const [sub, setSub] = useState("");
  const [instanceLinks, setInstanceLinks] = useState([]);
  const [showList, setShowList] = useState(false);
  const disabled = !sub || !instances.length;
  useEffect(() => {
    if (instances && sub) {
      setInstanceLinks(buildUrls(instances, sub));
    }
  }, [instances, sub]);

  return (
    <div style={containerStyle}>
      <h3>by Reddit Sub</h3>
      <div>
        <input
          type="text"
          name="sub"
          id="sub"
          value={sub}
          style={inputStyle}
          placeholder="Sub Name"
          onChange={(e) => setSub(e.target.value)}
        />
        <div style={buttonWrapperStyle}>
          <button
            onClick={() => setShowList(!showList)}
            id="nameShowSubList"
            disabled={disabled}
            style={buttonStyle}
          >
            LIST
          </button>
          <button
            id="nameGoRandom"
            disabled={disabled}
            onClick={() => feelingLucky(instanceLinks)}
            style={buttonStyle}
          >
            GO RANDOM!
          </button>
          <button
            id="nameClear"
            disabled={disabled}
            onClick={() => setSub("")}
            style={buttonStyle}
          >
            CLEAR
          </button>
        </div>
      </div>
      {showList && !disabled && <List instanceLinks={instanceLinks} />}
    </div>
  );
};

export default Sub;
