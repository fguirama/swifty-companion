import {View,Text} from "react-native";

export default function ProjectCard({name, status}: any){
    return (<View className="bg-slate-900 rounded-2xl p-4 mb-3 flex-row justify-between">
        <Text className="text-white text-lg">{name}</Text>
        <Text className={`font-bold ${status==="success" ?"text-green-400" :"text-red-400"}`}>{status}</Text>
    </View>)
}
