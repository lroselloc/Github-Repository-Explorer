import { useCallback, useRef } from "react";

const useIntersectionObserver = (doIsObserved: () => any) => {
  const observer = useRef<IntersectionObserver>();
  const elementObservedCallbackRef = useCallback(
    (node: any) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          doIsObserved();
        }
      });
      if (node) observer.current.observe(node);
    },
    [doIsObserved]
  );
  return elementObservedCallbackRef;
};

export default useIntersectionObserver;
