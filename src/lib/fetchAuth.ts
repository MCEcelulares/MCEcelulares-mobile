import { DeviceEventEmitter } from "react-native";

export async function fetchAuth(url: string, options: RequestInit = {}) {
    let res: Response;

    try{
        res= await fetch(url, options);
    } catch (err) {
        if (err instanceof TypeError) {
            throw new Error('servidor indisponível no momento. Tente novamente mais tarde.');
        }
        throw err;
    }

    if (res.status === 401) {
        DeviceEventEmitter.emit('auth:logout');
    }

    return res;
}