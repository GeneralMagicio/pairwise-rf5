"use client"

import { ProtocolPage } from "./card";
import { acrossProtocol } from "./card/mockData";


export default function Home() {
  return <ProtocolPage protocol={acrossProtocol} />;
}