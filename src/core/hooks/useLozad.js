import { useEffect } from "react";
import lozad from "lozad";

export default function useLozad() {
  useEffect(() => {
    const observer = lozad();
    observer.observe();
  });
}
