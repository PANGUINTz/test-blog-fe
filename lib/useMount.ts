import { useEffect } from "react";

type EffectCallback = () => void | (() => void | undefined);

function useMount(func: EffectCallback) {
  useEffect(() => func(), []);
}

export default useMount;
