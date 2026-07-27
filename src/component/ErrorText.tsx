import {Text} from "react-native";
import React from "react";

export default function ErrorText({children}: {children?: React.ReactNode}) {
    if (!children)
        return null;
    return (<Text className="text-red-500 italic text-center">{children}</Text>);
}
