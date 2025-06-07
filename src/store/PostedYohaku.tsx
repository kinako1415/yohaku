import type { Yohaku } from "@/types/yohaku";
import { atomWithStorage } from "jotai/utils";

export const PostYohakuAtom = atomWithStorage<Yohaku[]>("yohakuAuth", []);
