import type { SubUnit, DimensionCategory, UnitConvertorContext, UserInputValues, /*UnitConvertorError*/ } from "@/type";
import { createContext, useCallback, useRef, useEffect, useState, type ReactNode } from "react";
import { unitData, convert } from "@/lib/convertionBase"
import { toast } from "sonner"

export const unitConvertorContext = createContext<null | UnitConvertorContext>(null)
interface UnitConverterProviderProps {
    children: ReactNode;
} 

export default function UnitConvertorContextProvider({ children }: UnitConverterProviderProps) {
    const [dimensionCategory, setDimensionCategory] = useState<DimensionCategory>('length')
    const [allSubUnits, setAllSubUnits] = useState<readonly string[] | []>([])
    const [allDimension, setAllDimension] = useState<[] | string[]>([])
    const [subUnit, setSubUnit] = useState<SubUnit | null>(null)
    const [defaultValues, setDefaultValues] = useState<UserInputValues>({})
    const inputRef = useRef<null | 'toInput' | 'fromInput'>('fromInput')
    //const [ unitConvertorError, setUnitConvertorError,] = useState<UnitConvertorError>({message: ''})


    useEffect(() => {
        if (!dimensionCategory) return
        if (dimensionCategory === 'temperature'
            || dimensionCategory === 'fuel'
        ) {
            const d = unitData.find(t => t.dimension === dimensionCategory)
            setAllSubUnits(d?.fromUnits ?? [])
            setSubUnit({ toUnit: d?.toUnit ?? '', fromUnit: d?.baseUnit ?? '' })
            return;
        }
        const currentDimension = unitData.find(t => t.dimension === dimensionCategory)
        if (currentDimension?.units) {
            setAllSubUnits(Object.keys(currentDimension?.units))
        }
        if (currentDimension?.baseUnit && currentDimension.toUnit) {
            setSubUnit({
                toUnit: currentDimension.toUnit,
                fromUnit: currentDimension.baseUnit
            })
        }
    }, [dimensionCategory])

    useEffect(() => {
        const temp = unitData.map(unit => unit.dimension)
        if (!temp) return
        setAllDimension(temp)
    }, [])


    const setDefaultUnit = (value: Partial<SubUnit> | null) => {
        setSubUnit(prev => (prev && { ...prev, ...value }))
    }
    const setValues = (value: UserInputValues) => {
        if (!value.fromValue && !value.toValue) {
            setDefaultValues({})
        }
        setDefaultValues(prev => ({ ...prev, ...value }))
    };

    const convertion = useCallback(() => {
        try {
            const value = inputRef.current === "fromInput" ? defaultValues.fromValue : defaultValues.toValue;
            let fromUnit: string;
            let toUnit: string;

            if (!inputRef.current) return
            switch (inputRef.current) {
                case 'fromInput':
                    fromUnit = subUnit?.fromUnit ?? ''
                    toUnit = subUnit?.toUnit ?? ''
                    break;
                case 'toInput':
                    fromUnit = subUnit?.toUnit ?? ''
                    toUnit = subUnit?.fromUnit ?? ''
                    break;
            }

            const result = convert(value || 0, dimensionCategory, fromUnit, toUnit)

            if (!result && !defaultValues) throw new Error(`No result found ${result}`);
            switch (inputRef.current) {
                case 'fromInput':
                    setValues({ toValue: result })
                    break;
                case 'toInput':
                    setValues({ fromValue: result })
                    break;
            }

        } catch (e) {
            const error = e instanceof Error ? e.message : 'UnkNowError'
            toast.error(error, { position: "top-center" })
        }
    }, [defaultValues.fromValue, defaultValues.toValue, subUnit, dimensionCategory])

    useEffect(() => {
        convertion()
    }, [convertion, dimensionCategory])

    const unitConvertorContextValue: UnitConvertorContext = {
        setDimensionCategory,
        subUnit,
        dimensionCategory,
        allDimension,
        allSubUnits,
        setDefaultUnit,
        setValues,
        inputRef,
        defaultValues,
        convertion,
        /*
        unitConvertorError,
            setUnitConvertorError,
    
    */
    }

    return <unitConvertorContext.Provider value={unitConvertorContextValue}>
        {children}
    </unitConvertorContext.Provider>

}