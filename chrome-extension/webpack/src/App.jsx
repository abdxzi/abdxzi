import React, { useEffect, useState } from "react";
import "./App.css";

function MainApp() {

    const [name, setName] = useState();

    useEffect(() => {
        setName("abdxzi !");
    }, []);

    return(
        <h1 className="text-3xl font-bold underline">Hello {name}!</h1>
    )
}

export { MainApp }