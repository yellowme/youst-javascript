import React, { lazy } from "react";
import { PrerenderedComponent } from "react-prerendered-component";

const prefetchMap = new WeakMap();
const prefetchLazy = (LazyComponent) => {
  if (!prefetchMap.has(LazyComponent)) {
    prefetchMap.set(LazyComponent, LazyComponent._ctor());
  }
  return prefetchMap.get(LazyComponent);
};

export default function prerenderedLazy(dynamicImport) {
  const LazyComponent = lazy(dynamicImport);
  return React.memo((props) => (
    <PrerenderedComponent live={prefetchLazy(LazyComponent)}>
      <LazyComponent {...props} />
    </PrerenderedComponent>
  ));
}
