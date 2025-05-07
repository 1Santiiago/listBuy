import React from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CardGeralProps {
  data: any;
  onPriceChange: (value: number) => void;
  onQuantityChange: (value: number) => void;
  onDelete: (id: number) => void;
}

const CardGeral: React.FC<CardGeralProps> = ({
  data,
  onPriceChange,
  onQuantityChange,
  onDelete,
}) => {
  return (
    <Card className="w-full p-5 rounded-2xl ">
      <h2 className="text-xl font-bold text-center text-gray-800 mb-4">
        {data.item}
      </h2>

      <CardContent className="space-y-4 flex gap-6 text-center">
        <div className="space-y-1">
          <Label htmlFor="price" className="text-sm font-medium text-gray-700">
            Preço (R$)
          </Label>
          <Input
            id="price"
            type="number"
            min={0}
            value={data.price}
            onFocus={(e) => {
              if (parseFloat(e.target.value) === 0) {
                e.target.value = "";
              }
            }}
            onChange={(e) => onPriceChange(parseFloat(e.target.value))}
            className="w-full text-center border-gray-300 focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <div className="space-y-1">
          <Label
            htmlFor="quantity"
            className="text-sm font-medium text-gray-700"
          >
            Quantidade
          </Label>
          <Select onValueChange={(value) => onQuantityChange(parseInt(value))}>
            <SelectTrigger className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500 transition">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              {[...Array(10)].map((_, i) => (
                <SelectItem key={i + 1} value={(i + 1).toString()}>
                  {i + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-center pt-2">
          <button
            onClick={() => onDelete(data.id)}
            className="text-red-500 hover:text-red-700 transition"
            aria-label="Remover item"
          >
            <X size={28} />
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardGeral;
