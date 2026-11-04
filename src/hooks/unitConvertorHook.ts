import { unitConvertorContext } from "@/context/unitConvertorContext"
import { useContext } from "react"

export default function useUnitConvertor() {
    const unitConvertor = useContext(unitConvertorContext)

    return {
        setDimensionCategory: unitConvertor?.setDimensionCategory,
        subUnit: unitConvertor?.subUnit,
        dimensionCategory: unitConvertor?.dimensionCategory,
        allDimension: unitConvertor?.allDimension,
        allSubUnits: unitConvertor?.allSubUnits,
        setDefaultUnit: unitConvertor?.setDefaultUnit,
        setValues: unitConvertor?.setValues,
        defaultValues: unitConvertor?.defaultValues,
        convertion: unitConvertor?.convertion,
        inputRef: unitConvertor?.inputRef,
        /*
        setUnitConvertorError: unitConvertor?.setUnitConvertorError,
        unitConvertorError: unitConvertor?.unitConvertorError,
        */
    }
}