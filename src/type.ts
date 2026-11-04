import type { RefObject } from "react";

export interface UnitConvertorContext {
    setDimensionCategory: (value: DimensionCategory) => void;
    allSubUnits: readonly string[] | [];
    dimensionCategory: DimensionCategory;
    allDimension: string[] | [];
    subUnit: SubUnit | null;
    setDefaultUnit: (value: Partial<SubUnit> | null) => void
    setValues: (value: UserInputValues) => void
    defaultValues: UserInputValues;
    convertion: () => void;
    inputRef: RefObject<"toInput" | "fromInput" | null>;

    /* unitConvertorError : UnitConvertorError;
     setUnitConvertorError : (error : UnitConvertorError) => void
 */
}

/*
export interface UnitConvertorError {
    message: string;
}
*/

export interface SubUnit {
    toUnit: string;
    fromUnit: string;
}
export interface UserInputValues {
    toValue?: number | null;
    fromValue?: number | null;
}

export type DimensionCategory = 'length' | 'area'
    | 'angle'
    | 'fuel'
    | 'data-transfer'
    | 'frequency'
    | 'mass'
    | 'pressure'
    | 'data-size'
    | 'time'
    | 'temperature'
    | 'speed'
    | 'volume'
    | 'energy';

export interface UserInputDisplayValues {
    toValue?: string;
    fromValue?: string;
}