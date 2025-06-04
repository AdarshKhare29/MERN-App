import React from "react";

const HOC = (WrappedComponent: React.ComponentType) => {
  return (props: any) => (
    <div>
      Hi, I'm HOC
      <WrappedComponent {...props} />
    </div>
  );
};
export default HOC;
