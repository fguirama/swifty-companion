import {Text} from "react-native";
import React from "react";

export default function SmallText({children}: {children: React.ReactNode}) {
    return (<Text className="text-gray-400 text-center italic">{children}</Text>);
}
