const now = new Date().toISOString();

export const measurements = {
    1: {
        roomId: 1,
        temperature: { value: 18, timeStamp: now },
        humidity: { value: 40, timeStamp: now },
        light: { value: 40,  timeStamp: now }
    },
    2: {
        roomId: 2,
        temperature: { value: 14, timeStamp: now },
        humidity: { value: 54, timeStamp: now },
        light: { value: 70,timeStamp: now }
    },
};

function generateNewData(baseData){
    const genData = [];
    for(let i =20; i >= 0; i--){
        const time = new Date(Date.now() - i * 60 * 60 * 1000) // go back "i" hours, (hours convert to ms) 
        genData.push(
            {
                timeStamp: time.toISOString(),
                temperature: Number( (baseData.temperature + (Math.random() -0.5)*2).toFixed(1)), 
                humidity: Number((baseData.humidity + (Math.random() - 0.5) * 4).toFixed(1)),
                light: Math.round(baseData.light +(Math.random() - 0.5)*30),
            }
        );

    }
    return genData;
}
function valuesForRoomId(roomId){
    const room = measurements[roomId];
    return {
        temperature: room.temperature.value,
        humidity:    room.humidity.value,
        light:       room.light.value,
    };
}
export const measurementsHistory = {
    1: { roomId: 1, history: generateNewData(valuesForRoomId(1)) },
    2: { roomId: 2, history: generateNewData(valuesForRoomId(2)) },
};
