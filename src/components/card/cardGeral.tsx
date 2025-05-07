import React from "react";
import { Input } from "@/components/ui/input";

import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CardGeralProps {
  data: any;
  onPriceChange: (id: number, value: number) => void;
  onQuantityChange: (id: number, value: number) => void;
  onDelete: (id: number) => void;
}

const CardGeral: React.FC<CardGeralProps> = ({
  data,
  onPriceChange,
  onQuantityChange,
  onDelete,
}) => {
  return (
    <Table className="lg:text-left text-center">
      <TableHeader className="text-center ">
        <TableRow>
          <TableHead>Quantidade</TableHead>
          <TableHead>Item</TableHead>
          <TableHead>Preço (R$)</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item: any) => (
          <TableRow
            key={item.id}
            className={item.price > 0 ? "bg-green-200  " : ""}
          >
            <TableCell className="w-15 lg:w-full">
              <Select
                defaultValue={item.quantity.toString()}
                onValueChange={(value) =>
                  onQuantityChange(item.id, parseInt(value))
                }
              >
                <SelectTrigger>
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
            </TableCell>
            <TableCell className="font-medium">{item.item}</TableCell>
            <TableCell className="w-25 lg:w-full">
              <Input
                type="number"
                value={item.price}
                onFocus={(e) => {
                  if (parseFloat(e.target.value) === 0) e.target.value = "";
                }}
                onChange={(e) =>
                  onPriceChange(item.id, parseFloat(e.target.value))
                }
              />
            </TableCell>

            <TableCell>
              <button
                onClick={() => onDelete(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                <X />
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CardGeral;
