import { Sparkles } from "lucide-react"

export function PrajeshCredit() {
  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-900/80 p-4 rounded-lg border border-netclicks-red/20 hover-card-effect">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="h-5 w-5 text-netclicks-red" />
        <h3 className="font-semibold">Creator's Note</h3>
      </div>
      <p className="text-sm text-gray-300 mb-3">
        This streaming experience was meticulously crafted to provide you with the best entertainment possible.
      </p>
      <div className="text-center">
        <p className="text-xs text-gray-400">Made with passion by</p>
        <p className="text-gradient font-bold text-lg">Prajesh</p>
      </div>
    </div>
  )
}
