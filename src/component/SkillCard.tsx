import {View,Text} from "react-native";
import {iSkill} from "@/types/type.42";

export default function SkillCard({item}: {item: iSkill}){
    const intLevel = Math.floor(item.level);
    const pourcentLevel = Math.round((item.level % 1) * 100);

    return (<View className="bg-gray-300 rounded-2xl p-4 mb-4">
        <View className="flex-row justify-between">
            <Text className="text-gray-900">{item.name}</Text>
            <Text className="text-gray-900 font-bold">{intLevel}</Text>
        </View>
        <View className="bg-gray-500 h-3 rounded-full mt-3">
            <View
                style={{
                    width:`${pourcentLevel}%`
                }}
                className="bg-gray-900 h-3 rounded-full"/>
        </View>
    </View>)
}
