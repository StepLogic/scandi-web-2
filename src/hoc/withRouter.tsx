import React from "react";
import { AppContext } from "../contexts/Provider";
// import "url-change-event";
export interface WithRouterProps {
  primaryColor: string;
}

export function withRouter<T extends WithRouterProps = WithRouterProps>(
  WrappedComponent: React.ComponentType<T>
) {
  class Component extends React.Component<Omit<T, keyof WithRouterProps>> {
    render() {
      let context: any = this.context;
      return <WrappedComponent id={context.id} {...(this.props as T)} />;
    }
  }
  Component.contextType = AppContext;
  return Component;
}
