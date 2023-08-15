import * as React from "react";
import { FC, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Description from "./components/Description";
import Footer from "./components/Footer";
import Header from "./components/Header";
import InstancesType from "./components/InstancesType";
import Message from "./components/Message";
import Sub from "./components/Sub";
import Url from "./components/Url";
import { MESSAGES } from "./constants";
import { getInstanceData } from "./services/data.service";
import { Instances } from "./types";

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
    const { libreddit, teddit } = instances || {};
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
      <Url instances={filteredInstances} />
      <Footer />
    </AppContainer>
  );
};

export default App;
