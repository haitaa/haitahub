import { create } from "zustand";

interface LoginModalStore {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

const useLoginModal = create<LoginModalStore>((set) => ({
    isOpen: false,
    open: () => set((state) => ({...state, isOpen: true })),
    close: () => set((state) => ({...state, isOpen: false })),
}));

export default useLoginModal;