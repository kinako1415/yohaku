import { atom } from "jotai";
import type { User } from "@/types/user";

export const loginUserAtom = atom<User | null>(null);
