import { randomUUID } from "crypto"

export function idStrategy(): string {
    return randomUUID();
}