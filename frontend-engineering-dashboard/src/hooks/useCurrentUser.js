import {useQuery} from "@tanstack/react-query";
import {getCurrentUser} from "../services/userService";

export default function useCurrentUser() {
    return useQuery({
        queryKey: ['currentUser'],
        queryFn: getCurrentUser,
        staleTIme: 60_000,
    })
}