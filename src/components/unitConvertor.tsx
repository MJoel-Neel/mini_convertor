import { ShieldQuestionMark } from "lucide-react"
import UnitConvertorDimensionSelect from "@/components/unitConvertorDimensionSelect"
import UnitConvertorUserInput from "./unitConvertorUserInput"


export default function UnitConvertor() {
    return <div className="rounded bg-card text-card-foreground px-5 max-w-150 m-auto py-10">
        {/* HEAD */}
        <div className="flex justify-center mb-10 items-center gap-2">
            <h1 className="font-medium text-sm text-center md:text-lg">
                What do you want to measure today
            </h1>
            <div>
                <ShieldQuestionMark color="#0EA5E9" strokeWidth={0.7} size={25} />
            </div>
        </div>

        {/* BODY */}
            
            <div className="flex justify-center mt-5">
                <UnitConvertorDimensionSelect />
            </div>
            <div className="flex justify-center mt-5">
                <UnitConvertorUserInput />
            </div>


    </div>
}