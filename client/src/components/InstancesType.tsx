import * as React from "react";

interface Props {
  instancesType: string;
  setInstancesType: (instancesType: string) => void;
}

const InstancesType = ({ instancesType, setInstancesType }: Props) => (
  <div>
    <input
      type="radio"
      id="all"
      name="instancesType"
      value="all"
      checked={instancesType === "all"}
      onChange={() => setInstancesType("all")}
    />
    <label htmlFor="all">All</label>

    <input
      type="radio"
      id="libreddit"
      name="instancesType"
      value="libreddit"
      checked={instancesType === "libreddit"}
      onChange={() => setInstancesType("libreddit")}
    />
    <label htmlFor="libreddit">LibReddit</label>
    <input
      type="radio"
      id="teddit"
      name="instancesType"
      value="teddit"
      checked={instancesType === "teddit"}
      onChange={() => setInstancesType("teddit")}
    />
    <label htmlFor="teddit">Teddit</label>
  </div>
);

export default InstancesType;