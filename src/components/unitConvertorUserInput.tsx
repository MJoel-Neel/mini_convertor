import { ArrowDownUp, RefreshCw, Copy } from 'lucide-react';
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import useUnitConvertor from '@/hooks/unitConvertorHook';
import { formatResult, parseFormattedNumber, removeDotsAfterFirst } from '@/lib/convertionBase';
import type { UserInputDisplayValues } from '@/type';
import { toast } from "sonner"


const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER

export default function UnitConvertorUserInput() {
    const { /*setUnitConvertorError, */ convertion, defaultValues, inputRef, setDefaultUnit, setValues, subUnit, allSubUnits, setDimensionCategory } = useUnitConvertor()
    const [isSwitched, setIsSwitched] = useState<boolean>(false)
    const [localValues, setLocalValues] = useState<UserInputDisplayValues>()


    const switchInput = () => {
        setIsSwitched(prev => !prev)
    }

    const Refresh = () => {
        setDimensionCategory && setDimensionCategory('length')
        setLocalValues({})
    }

    const Convert = () => {
        convertion && convertion()
    }

    const HandleSubUnitsChange = (value: string, type: 'to' | 'from') => {
        if (type === 'from' && setDefaultUnit) {
            setDefaultUnit({ fromUnit: value })
        }
        if (type === 'to' && setDefaultUnit) {
            setDefaultUnit({ toUnit: value })
        }
    }

    const handleInputValueChange = (value: string, type: 'from' | 'to') => {
        const rawValue: string = removeDotsAfterFirst(value).replace(/[^\d\.e+]+/g, '')
        const intValue: number = parseFormattedNumber(rawValue)
        const userFriendlyValue: string = intValue <= MAX_SAFE_INTEGER ? formatResult(intValue) : 'Error';

        if (/*setUnitConvertorError && */ intValue >= MAX_SAFE_INTEGER) {
            const error = `can’t handle a number exceeding ${MAX_SAFE_INTEGER}`;
            toast.error(error, { position: "top-center" })
            return;
            //setUnitConvertorError({message : `can’t handle a number exceeding ${MAX_SAFE_INTEGER}` })
        }

        if (rawValue.endsWith('.')) {
            switch (type) {
                case 'from':
                    setLocalValues(prev => ({ ...prev, fromValue: userFriendlyValue + '.' }))
                    break;
                case 'to':
                    setLocalValues(prev => ({ ...prev, toValue: userFriendlyValue + '.' }))
                    break;
            }
            return;
        }

        if (!rawValue) return setLocalValues({})
        if (!setValues) return;
        switch (type) {
            case 'from':
                setLocalValues(prev => ({ ...prev, fromValue: userFriendlyValue }))
                setInputRef('fromInput')
                setValues({ fromValue: intValue ?? undefined })

                break;
            case 'to':
                setLocalValues(prev => ({ ...prev, toValue: userFriendlyValue }))
                setInputRef('toInput')
                setValues({ toValue: intValue ?? undefined })
                break;
        }
    }

    useEffect(() => {
        if (inputRef?.current === 'toInput' && defaultValues?.fromValue) {
            const value = formatResult(defaultValues?.fromValue)
            setLocalValues(prev => ({ ...prev, fromValue: value }))
            return;
        }

        if (inputRef?.current === 'fromInput' && defaultValues?.toValue) {
            const value = formatResult(defaultValues?.toValue)
            setLocalValues(prev => ({ ...prev, toValue: value }))
            return;
        }
    }, [defaultValues])

    const setInputRef = (origin: 'toInput' | 'fromInput') => {
        if (!inputRef?.current) return
        inputRef.current = origin
    }
    const handleCopy = async (type: 'to' | 'from') => {
        if (!defaultValues?.fromValue &&
            !defaultValues?.toValue) return;
        try {
            switch (type) {
                case 'from':
                    await navigator.clipboard.writeText(String(defaultValues.fromValue));
                    toast.error('Copy succesfully 🎉', { position: 'top-center' });
                    break;
                case 'to':
                    await navigator.clipboard.writeText(String(defaultValues.toValue));
                    toast.error('Copy succesfully 🎉', { position: 'top-center' });
                    break;
            }

        } catch (err) {
            const error = err instanceof Error ? err.message : 'An error occured'
            toast.error(`Failed to copy: ${error} 🚫`, { position: 'top-center' });
        }
    }



    return (<div>
        <div className={`flex flex-col ${isSwitched && 'flex-col-reverse'}
    gap-3 sm:gap-5 items-center w-full`}>
            {/*LEFT*/}
            <div className='flex justify-between items-center  gap-2 sm:gaxlp-5'>
                <Input autoFocus max={MAX_SAFE_INTEGER} value={localValues?.fromValue ?? ''} onChange={(v) => handleInputValueChange(v.target.value, 'from')}
                    className='text-center sm:w-100 max-w-100  py-8 text-xl font-bold md:text-2xl'
                    placeholder='1' type='text' />
                <Copy size={20} className="cursor-pointer" strokeWidth={0.8} onClick={() => handleCopy('from')} />
                <Select onValueChange={(v) => HandleSubUnitsChange(v, 'from')} value={subUnit?.fromUnit ?? ''} >
                    <SelectTrigger className="font-semibold">
                        <SelectValue placeholder="Select a sub unit" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup className='font-semibold'>
                            <SelectLabel>Sub Unit</SelectLabel>
                            {allSubUnits?.map((sub, i) => {
                                return (<SelectItem key={i} value={sub}> {sub} </SelectItem>)
                            })
                            }
                        </SelectGroup>
                    </SelectContent>
                </Select>

            </div>

            {/*MIDDLE */}
            <ArrowDownUp onClick={switchInput} />


            {/*RIGHT */}
            <div className='flex justify-between items-center  gap-2 sm:gap-5'>
                <Input max={MAX_SAFE_INTEGER} value={localValues?.toValue ?? ''} onChange={(v) => handleInputValueChange(v.target.value, 'to')}
                    className='sm:w-100 max-w-100 text-center w-full py-8 text-xl font-bold md:text-2xl'
                    placeholder='1000' type='text' />
                <Copy size={20} className="cursor-pointer" strokeWidth={0.8} onClick={() => handleCopy('to')} />
                <Select onValueChange={(v) => HandleSubUnitsChange(v, 'to')} value={subUnit?.toUnit ?? ''}>
                    <SelectTrigger className="font-semibold">
                        <SelectValue placeholder="Select a sub unit" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup className='font-semibold'>
                            <SelectLabel>Sub Unit</SelectLabel>
                            {allSubUnits?.map((sub, i) => {
                                return (<SelectItem key={i} value={sub}> {sub} </SelectItem>)
                            })
                            }                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>


        <div className='mt-10 flex justify-center gap-3 items-center'>
            <Button onClick={Convert}
            disabled={!localValues?.fromValue && !localValues?.toValue} 
            className='bg-primary font-bold text-md px-10'>Convert</Button>
            <RefreshCw onClick={Refresh}
                className='cursor-pointer' strokeWidth={0.8} />
        </div>

    </div>
    )
}