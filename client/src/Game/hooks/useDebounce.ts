import {useEffect, useRef} from 'react'

const useDebounce = (callback: Function | undefined, delay: number) => {
  const latestCallback = useRef<Function>();
  const latestTimeout = useRef<any>();

  useEffect(() => {
    latestCallback.current = callback;
  }, [callback]);

  return (event: any) => {
    event.stopPropagation()
    if (latestTimeout.current) {
      return
    }

    latestCallback.current && latestCallback.current()

    latestTimeout.current = setTimeout(() => {
      latestTimeout.current = 0
    }, delay);
  }
}

export default useDebounce
