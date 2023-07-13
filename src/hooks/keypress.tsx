import { useContext, useEffect } from "react";
import { GameContext } from "../context/context";

/**
 * Use a keypress event listener
 * @param keys Array of keys to listen for (e.g. ["Escape", "Enter"])
 * @param action Action to perform when key is pressed
 */
export function useKeypress(keys: string[], action: () => void) {
  const { state } = useContext(GameContext);

  useEffect(() => {
    if (state !== "playing") return;

    function onKeyup(e: KeyboardEvent) {
      if (keys.includes(e.code)) {
        action();
        e.preventDefault();
        e.stopPropagation();
      }
    }
    window.addEventListener("keydown", onKeyup);
    return () => window.removeEventListener("keydown", onKeyup);
  }, [action, keys, state]);
}

/**
 * Use a keypress event listener
 * @param keys Array of keys to listen for (e.g. ["Escape", "Enter"])
 * @param action Action to perform when key is pressed
 */
export function useKeyUp(keys: string[], action: () => void) {
  const { state } = useContext(GameContext);

  useEffect(() => {
    if (state !== "playing") return;

    function onKeyUp(e: KeyboardEvent) {
      if (keys.includes(e.code)) {
        action();
        e.preventDefault();
        e.stopPropagation();
      }
    }
    window.addEventListener("keyup", onKeyUp);
    return () => window.removeEventListener("keyup", onKeyUp);
  }, [action, keys, state]);
}
