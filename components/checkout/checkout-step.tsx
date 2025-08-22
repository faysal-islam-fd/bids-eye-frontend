import { Check } from "lucide-react"

interface CheckoutStepsProps {
  currentStep: number
}

export default function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  return (
    <div className="flex justify-between mb-8 border-b pb-4">
      <div className="flex items-center">
        <div
          className={`w-6 h-6 rounded-full ${currentStep === 1 ? "border-2 border-gray-400 text-gray-400" : "bg-green-500 text-white"} flex items-center justify-center`}
        >
          {currentStep > 1 ? <Check className="h-4 w-4" /> : 1}
        </div>
        <div className="ml-2">
          <p className="font-semibold text-sm uppercase">SHIPPING AND CHECKOUT</p>
          <p className="text-xs text-gray-500">ENTER YOUR DETAILS</p>
        </div>
      </div>

      <div className="flex items-center">
        <div
          className={`w-6 h-6 rounded-full ${currentStep === 2 ? "bg-green-500 text-white" : "border-2 border-gray-300 text-gray-300"} flex items-center justify-center`}
        >
          {currentStep === 2 ? <Check className="h-4 w-4" /> : 2}
        </div>
        <div className="ml-2">
          <p className={`font-semibold text-sm uppercase ${currentStep === 2 ? "text-gray-700" : "text-gray-400"}`}>
            CONFIRMATION
          </p>
          <p className="text-xs text-gray-500">REVIEW YOUR ORDER</p>
        </div>
      </div>
    </div>
  )
}

