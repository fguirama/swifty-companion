import {View, Text, Pressable} from "react-native";
import {iProject, iTeam, tStatus} from "@/types/type.42";
import {useState} from "react";
import {Entypo, Ionicons} from "@expo/vector-icons";

export default function ProjectCard({item}: {item: iProject}) {
    const [expended, setExpended] = useState(false);

    return (<Pressable className="bg-gray-300 rounded-2xl mb-4" onPress={() => setExpended(!expended)}>
        <View className="flex flex-row items-center justify-between">
            <View className="flex-1 ml-6 mr-2 my-4">
                <View className="flex flex-row items-center justify-between">
                    <Text className="flex-1 text-gray-900 text-lg font-semibold" numberOfLines={1} ellipsizeMode="tail">{item.project.name}</Text>
                    <Status v={item}/>
                </View>
                {
                    expended && (<View className="flex-1 gap-2 ml-3 mt-2">
                        {item.teams.map((t, idx) => <Teams key={idx} t={t} i={idx}/>)}
                    </View>)
                }
            </View>
            <View className="h-full">
                <Ionicons className="pr-4 pl-1 py-5" name={expended ? "chevron-down" : "chevron-forward"} size={20} color="gray"/>
            </View>
        </View>
    </Pressable>)
}

function Teams({t, i}: {t: iTeam, i: number}) {
    return (<View className="flex-1 flex-row items-center justify-between">
        <View className="flex-1 flex-row items-center gap-1">
            <Text className="text-sm text-gray-400">#{i + 1}</Text>
            <Text className="flex-1" numberOfLines={1} ellipsizeMode="tail">{t.name}</Text>
            {t.closed_at && <Text className="flex-1 text-sm text-gray-400" numberOfLines={1}>{timeAgo(t.closed_at)}</Text>}
        </View>
        <Status fontSize="font-semibold" v={t} useIcon={false}/>
    </View>)
}


function Status({v, fontSize="font-bold text-xl", useIcon=true}: {v: {final_mark: number, status: tStatus, "validated?": boolean}, fontSize?: string, useIcon?: boolean}) {
    let statusColor = "text-orange-500";
    let statusText: string = v.status.replace("_", " ");
    let icon = null;
    if (v.status === "finished") {
        statusText = String(v.final_mark);
        if (v["validated?"]) {
            statusColor = "text-green-500";
            icon = <Entypo color="#22c55e" name="check" size={18}/>
        }
        else {
            statusColor = "text-red-500";
            icon = <Entypo color="#ef4444" name="cross" size={18}/>
        }
    } else {
        if (fontSize.includes("xl"))
            fontSize = fontSize.replace("xl", "base");
        else
            fontSize += " text-xs";
    }

    return (<View className="flex flex-row items-center">
        {useIcon && icon}
        <Text className={fontSize + " " + statusColor}>{statusText}</Text>
    </View>);
}

function timeAgo(dateString: string) {
    const seconds = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000);
    const intervals = [
        { label: "year", seconds: 31536000 },
        { label: "month", seconds: 2592000 },
        { label: "week", seconds: 604800 },
        { label: "day", seconds: 86400 },
        { label: "hour", seconds: 3600 },
        { label: "minute", seconds: 60 },
    ];

    if (seconds >= 60) {
        for (const interval of intervals) {
            const count = Math.floor(seconds / interval.seconds);

            if (count >= 1)
                return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
        }
    }
    return "just now";
}
