import Footbar from "@/components/footbar"
import Navbar from "@/components/navbar"
import UnitConvertor from "@/components/unitConvertor"
import UnitConvertorContextProvider from "@/context/unitConvertorContext"
import { Toaster } from "@/components/ui/sonner"

export default function UnitConvertorInterface() {
    return <UnitConvertorContextProvider>
        <div className="font-roboto min-h-screen relative"> 
            <div>
                <Toaster />
            </div>
            <header className="mb-10">
                <Navbar />
            </header>
            <main>
                <UnitConvertor />
            </main>

            <footer>
                <Footbar />
            </footer>
        </div>

    </UnitConvertorContextProvider>

}