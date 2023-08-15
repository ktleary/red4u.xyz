import * as React from "react";

interface Props {
  instancesType: string;
  setInstancesType: (instancesType: string) => void;
}

const InstancesType = ({ instancesType, setInstancesType }: Props) => (
  <div>
    Select source:{" "}
    <input
      type="radio"
      id="all"
      name="instancesType"
      value="all"
      checked={instancesType === "all"}
      onChange={() => setInstancesType("all")}
      style={{ marginLeft: 8 }}
    />
    <label htmlFor="all">all</label>
    <input
      type="radio"
      id="libreddit"
      name="instancesType"
      value="libreddit"
      checked={instancesType === "libreddit"}
      onChange={() => setInstancesType("libreddit")}
    />
    <label htmlFor="libreddit">libreddit</label>
    <input
      type="radio"
      id="teddit"
      name="instancesType"
      value="teddit"
      checked={instancesType === "teddit"}
      onChange={() => setInstancesType("teddit")}
    />
    <label htmlFor="teddit">teddit</label>
  </div>
);

export default InstancesType;
