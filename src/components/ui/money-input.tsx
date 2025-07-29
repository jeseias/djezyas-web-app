import { useId, useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface Currency {
  code: string
  symbol: string
  name: string
}

interface MoneyInputProps {
  value?: number
  onChange?: (value: number | undefined) => void
  currency?: string
  onCurrencyChange?: (currency: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  currencies?: Currency[]
}

const DEFAULT_CURRENCIES: Currency[] = [
  { code: "AOA", symbol: "Kz", name: "Angolan Kwanza" },
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
]

export function MoneyInput({
  value,
  onChange,
  currency = "AOA",
  onCurrencyChange,
  placeholder = "0,00",
  disabled = false,
  className,
  currencies = DEFAULT_CURRENCIES,
}: MoneyInputProps) {
  const id = useId()
  const [displayValue, setDisplayValue] = useState("")

  const selectedCurrency = currency || "AOA"

  const formatValue = (val: number | undefined): string => {
    if (val === undefined || val === null) return ""
    try {
      return val.toLocaleString('pt-AO', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })
    } catch (error) {
      return val.toFixed(2)
    }
  }

  const parseValue = (input: string): number | undefined => {
    if (!input.trim()) return undefined
    
    // Remove all non-numeric characters except comma and dot
    const cleaned = input.replace(/[^\d,.-]/g, '')
    
    // Handle both comma and dot as decimal separators
    const normalized = cleaned.replace(',', '.')
    
    const parsed = parseFloat(normalized)
    return isNaN(parsed) ? undefined : parsed
  }

  useEffect(() => {
    setDisplayValue(formatValue(value))
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setDisplayValue(inputValue)
    
    const parsedValue = parseValue(inputValue)
    onChange?.(parsedValue)
  }

  const handleCurrencyChange = (newCurrency: string) => {
    onCurrencyChange?.(newCurrency)
  }

  return (
    <div className={cn("relative", className)}>
      <Input
        id={id}
        className="pl-8 pr-20"
        placeholder={placeholder}
        type="text"
        value={displayValue}
        onChange={handleChange}
        disabled={disabled}
      />
      
      <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
        <span className="text-sm text-muted-foreground">
          {currencies.find(c => c.code === selectedCurrency)?.symbol || "Kz"}
        </span>
      </div>
      
      <div className="absolute inset-y-0 right-1 flex items-center">
        <Select value={selectedCurrency} onValueChange={handleCurrencyChange} disabled={disabled}>
          <SelectTrigger className="h-6 w-20 border-0 bg-transparent shadow-none hover:bg-transparent focus:ring-0 focus:ring-offset-0">
            <SelectValue className="text-xs" />
          </SelectTrigger>
          <SelectContent>
            {currencies.map((currency) => (
              <SelectItem key={currency.code} value={currency.code}>
                {currency.code}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}