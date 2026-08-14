## `useState()`钩子  
```tsx
    const [count,setCount] = useState<number>(0)
    /**
    * Returns a stateful value, and a function to update it.
    *
    * @version 16.8.0
    * @see {@link https://react.dev/reference/react/useState}
    */
    function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
```  

