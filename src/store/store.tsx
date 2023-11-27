import { create } from 'zustand'

const useStore = create((set: Function) => ({
  counter: 0,
  increment: () => set((state: { counter: number }) => ({ counter: state.counter + 1 })),
  decrement: () => set((state: { counter: number }) => ({ counter: state.counter - 1 })),
}))

export default useStore