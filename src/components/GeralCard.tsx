"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CardGeral from "./card/cardGeral";
import { useForm, SubmitHandler } from "react-hook-form";
import { SendHorizontal } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Inputs = {
  itemBuy: string;
};
type Item = {
  id: number;
  item: string;
  price: number;
  quantity: number;
};

function HomeGeral() {
  const [lista1, setLista1] = useState<Item[]>([]);
  const [lista2, setLista2] = useState<Item[]>([]);
  const [abaAtual, setAbaAtual] = useState<"lista1" | "lista2">("lista1");

  useEffect(() => {
    const storedLista1 = localStorage.getItem("lista1");
    const storedLista2 = localStorage.getItem("lista2");

    if (storedLista1) setLista1(JSON.parse(storedLista1));
    if (storedLista2) setLista2(JSON.parse(storedLista2));
  }, []);

  const saveToLocalStorage = (key: "lista1" | "lista2", lista: Item[]) => {
    localStorage.setItem(key, JSON.stringify(lista));
  };

  const handlePrice = (id: number, value: number) => {
    const lista = abaAtual === "lista1" ? [...lista1] : [...lista2];
    const index = lista.findIndex((item) => item.id === id);
    if (index !== -1) {
      lista[index].price = value;
      abaAtual === "lista1" ? setLista1(lista) : setLista2(lista);
      saveToLocalStorage(abaAtual, lista);
    }
  };

  const handleQuantity = (id: number, value: number) => {
    const lista = abaAtual === "lista1" ? [...lista1] : [...lista2];
    const index = lista.findIndex((item) => item.id === id);
    if (index !== -1) {
      lista[index].quantity = value;
      abaAtual === "lista1" ? setLista1(lista) : setLista2(lista);
      saveToLocalStorage(abaAtual, lista);
    }
  };

  const handleDelete = (id: number) => {
    const lista = abaAtual === "lista1" ? [...lista1] : [...lista2];
    const novaLista = lista.filter((item) => item.id !== id);
    abaAtual === "lista1" ? setLista1(novaLista) : setLista2(novaLista);
    saveToLocalStorage(abaAtual, novaLista);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const nome = data.itemBuy.trim();
    if (!nome) {
      return alert("Insira um item válido");
    }

    const novoItem: Item = {
      id: Date.now(),
      item: nome,
      price: 0,
      quantity: 1,
    };

    const novaLista =
      abaAtual === "lista1" ? [...lista1, novoItem] : [...lista2, novoItem];
    abaAtual === "lista1" ? setLista1(novaLista) : setLista2(novaLista);
    saveToLocalStorage(abaAtual, novaLista);

    reset();
  };

  const total = (abaAtual === "lista1" ? lista1 : lista2).reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Listas de Compras</h1>

      <Tabs
        value={abaAtual}
        onValueChange={(val) => setAbaAtual(val as "lista1" | "lista2")}
      >
        <TabsList>
          <TabsTrigger value="lista1">Lista 1</TabsTrigger>
          <TabsTrigger value="lista2">Lista 2</TabsTrigger>
        </TabsList>

        <TabsContent value="lista1">
          <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 mt-4">
            <Input placeholder="Adicionar item..." {...register("itemBuy")} />
            <Button type="submit" variant="outline">
              <SendHorizontal size={20} />
            </Button>
          </form>

          {lista1.length > 0 && (
            <CardGeral
              data={lista1}
              onPriceChange={handlePrice}
              onQuantityChange={handleQuantity}
              onDelete={handleDelete}
            />
          )}

          <div className="mt-4 font-semibold">
            Total R$:{" "}
            {lista1
              .reduce((acc, item) => acc + item.price * item.quantity, 0)
              .toFixed(2)}
          </div>
        </TabsContent>

        <TabsContent value="lista2">
          <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 mt-4">
            <Input placeholder="Adicionar item..." {...register("itemBuy")} />
            <Button type="submit" variant="outline">
              <SendHorizontal size={20} />
            </Button>
          </form>

          {lista2.length > 0 && (
            <CardGeral
              data={lista2}
              onPriceChange={handlePrice}
              onQuantityChange={handleQuantity}
              onDelete={handleDelete}
            />
          )}

          <div className="mt-4 font-semibold">
            Total R$:{" "}
            {lista2
              .reduce((acc, item) => acc + item.price * item.quantity, 0)
              .toFixed(2)}
          </div>
        </TabsContent>
      </Tabs>

      <p className="text-center text-sm text-muted-foreground mt-10">
        Feito com ❤️ por{" "}
        <a
          href="https://portiolio-santiago-ferreiras-projects.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-600 hover:underline hover:text-red-800 transition-colors"
        >
          Santiago Ferreira
        </a>
      </p>
    </div>
  );
}

export default HomeGeral;
