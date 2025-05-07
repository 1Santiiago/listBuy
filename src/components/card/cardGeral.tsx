import React from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

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
    <Card className="w-full">
      <CardContent className="p-4 space-y-3">
        <h2 className="text-lg font-semibold">{data.item}</h2>

        <div className="flex gap-4 justify-between">
          <div className="flex flex-col">
            <Label htmlFor="price">Preço</Label>
            <Input
              id="price"
              type="number"
              min={0}
              value={data.price}
              onChange={(e) => onPriceChange(parseFloat(e.target.value))}
              placeholder="0.00"
              className="w-32"
            />
          </div>

          <div className="flex flex-col">
            <Label htmlFor="quantity">Quantidade</Label>
            <Input
              id="quantity"
              type="number"
              min={0}
              value={data.quantity}
              onChange={(e) => onQuantityChange(parseInt(e.target.value))}
              placeholder="0"
              className="w-32"
            />
          </div>
          <div className="flex justify-between items-center">
            <X color="red" onClick={() => onDelete(data.id)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardGeral;
