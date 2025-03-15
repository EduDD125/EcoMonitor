import { randomUUID, UUID } from "crypto"

export function idStrategy(): UUID {
    return randomUUID();
}