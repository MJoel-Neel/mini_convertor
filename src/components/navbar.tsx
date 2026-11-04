import { SunMoon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import ico from '@/assets/icon.svg'

type Theme = 'light' | 'dark';
const THEME_STORAGE_KEY = 'mini-unit-convertor-theme';


export default function Navbar() {
     const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light';
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    return saved === 'dark' ? 'dark' : 'light';  
  });


  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]); 

    const changeTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    }
    useEffect(() => {
        const T = localStorage.getItem('mini-unit-convertor-theme') as Theme | null;
        if (!T) return
        setTheme(T)
    }, [localStorage.getItem('mini-unit-convertor-theme')])



    return <div
        className='shadow-sm mb-5 sm:px-30
    py-3 px-7 gap-3 flex justify-between items-center'>
        <div
            className='text-lg text-primary'>
            <Link to='/' className='flex gap-2 items-center'>
            <img src={ico}
            className='w-5 h-5'
            alt="" />
            <span className='font-rubik'>  MiniUnitConvertor </span>
             </Link>
        </div>

        <div onClick={changeTheme}
            className='w-fit h-fit cursor-pointer'>
            <SunMoon size={30} strokeWidth={0.8} />
        </div>
    </div>
}