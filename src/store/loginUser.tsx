import type { User } from "@/types/user";
import { atomWithStorage } from "jotai/utils";

export const loginUserAtom = atomWithStorage<User | null>("userAuth", null);
