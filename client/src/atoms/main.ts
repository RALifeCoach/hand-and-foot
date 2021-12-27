import { atom } from 'recoil';
import { User } from 'User';
import getWindowSize from '../App/getWindowSize';

export const userAtom = atom<User | null>({
    key: 'user',
    default: null
});

export const menuAtom = atom<string>({
    key: 'menu',
    default: ''
});

export const configAtom = atom<any>({
    key: 'config',
    default: null
});

export const windowSizeAtom = atom<string>({
    key: 'windowSize',
    default: getWindowSize(window.innerWidth)
});

export const playAtom = atom<any>({
    key: 'play',
    default: getWindowSize(window.innerWidth)
});
