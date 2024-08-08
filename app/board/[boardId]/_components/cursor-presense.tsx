"use client"

import { memo } from "react"

import { 
    useOthersConnectionIds, 
    useOthersMapped
  } from "@/liveblocks.config";
import { Cursor } from "./cursor";
//   import { colorToCss } from "@/lib/utils";

const Cursors = () => {
    const ids = useOthersConnectionIds();
  
    return (
      <>
        {ids.map((connectionId) => (
          <Cursor
            key={connectionId}
            connectionId={connectionId}
          />
        ))}
      </>
    );
  };

export const CursorsPresence = memo(() => {
  return (
    <>
      {/* <Drafts /> */}
      <Cursors />
    </>
  )
})

CursorsPresence.displayName = 'CursorsPresense'