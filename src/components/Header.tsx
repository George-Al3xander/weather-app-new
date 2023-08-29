import {useRef } from "react";


const Header = ({getWeather}: {getWeather: Function}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    return(<header>
        <form onSubmit={(e) => {
            e.preventDefault();
            getWeather(inputRef.current!.value)
            inputRef.current!.value = ""
        }}>
            <input required ref={inputRef} placeholder="e.g. London" type="text" />
            <button>Search</button>
        </form>
    </header>)
}

export default Header