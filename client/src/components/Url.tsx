import * as React from "react";
import { useEffect, useState } from "react";
import List from "./List";
import {
  buildUrls,
  feelingLucky,
  getPathname,
  isValidUrl,
  removeLeadingSlash,
} from "../util";

const inputStyle = {
  width: "67%",
};

const titleStyle = {
  padding: 0,
  margin: 0,
  marginBottom: 12,
};

const buttonWrapperStyle = {
  display: "flex",
  justifyContent: "flex-start",
  width: "67%",
  marginTop: 12,
};

const buttonStyle = {
  marginLeft: 12,
  width: 128,
  alignText: "center",
  fontSize: 14,
  letterSpacing: -0.35,
  height: 32,
  borderRadius: 16,
  padding: 0,
};

interface UrlProps {
  instances: string[];
}

const Url = ({ instances }: UrlProps) => {
  const [openUrl, setOpenUrl] = useState("");
  const [name, setName] = useState("");
  const [instanceLinks, setInstanceLinks] = useState([]);
  const [showList, setShowList] = useState(false);

  const disabledShowGo = !name;
  const disabledClear = !openUrl;

  useEffect(() => {
    if (openUrl && isValidUrl(openUrl)) {
      const pathname = removeLeadingSlash(getPathname(openUrl));
      setName(pathname);
    } else {
      setName("");
    }
  }, [openUrl]);

  useEffect(() => {
    if (instances && name) {
      setInstanceLinks(buildUrls(instances, name));
    }
  }, [instances, name]);

  return (
    <div>
      <h3 style={titleStyle}>by Reddit URL</h3>

      <input
        type="text"
        name="urlName"
        id="urlName"
        style={inputStyle}
        placeholder="Full URL"
        value={openUrl}
        onChange={(e) => setOpenUrl(e.target.value)}
      />
      <div style={buttonWrapperStyle}>
        <button
          id="urlShowList"
          disabled={disabledShowGo}
          onClick={() => setShowList(!showList)}
          style={buttonStyle}
        >
          LIST
        </button>
        <button
          id="urlGoRandom"
          disabled={disabledShowGo}
          onClick={() => feelingLucky(instanceLinks)}
          style={buttonStyle}
        >
          GO RANDOM!
        </button>
        <button
          id="urlClear"
          disabled={disabledClear}
          onClick={() => setOpenUrl("")}
          style={buttonStyle}
        >
          CLEAR
        </button>
      </div>

      {showList && !disabledShowGo && <List instanceLinks={instanceLinks} />}
    </div>
  );
};

export default Url;
