import * as React from "react";
import { FC, useState, useEffect, useMemo } from "react";
import { MESSAGES } from "./constants";
import { getInstanceData } from "./services/data.service";
import styled from "styled-components";
import Header from "./components/Header";
import Description from "./components/Description";
import Message from "./components/Message";
import InstancesType from "./components/InstancesType";
import { Instances } from "./types";
import Sub from "./components/Sub";

const AppContainer = styled.div`
  max-width: 960px;
  margin: 0 auto;
`;

const { keys } = Object;

const App: FC = () => {
  const [message, setMessage] = useState("bob");
  const [instancesType, setInstancesType] = useState("all");
  const [instances, setInstances] = useState<Instances>({
    libreddit: [],
    teddit: [],
  });

  useEffect(() => {
    async function retrieveInstances() {
      setMessage(MESSAGES.FETCHINGDATA);
      const instances: Instances = await getInstanceData();
      if (keys(instances).length) {
        setInstances(instances);
        setTimeout(() => setMessage(""), 2000);
      } else {
        setMessage(MESSAGES.NOINSTANCESFOUND);
      }
    }
    retrieveInstances();
  }, []);

  const filteredInstances: string[] = useMemo(() => {
    const { libreddit, teddit } = instances;
    if (instancesType === "all") return [...libreddit, ...teddit];
    if (instancesType === "libreddit") return libreddit;
    if (instancesType === "teddit") return teddit;
    return [];
  }, [instances, instancesType]);

  return (
    <AppContainer>
      <Header />
      <Description />
      <Message message={message} />
      <InstancesType
        instancesType={instancesType}
        setInstancesType={setInstancesType}
      />
      <Sub instances={filteredInstances} />
    </AppContainer>
  );
};

export default App;
