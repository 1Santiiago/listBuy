"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CardGeral from "./card/cardGeral";
import { useForm, SubmitHandler } from "react-hook-form";

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
  const storedItems = JSON.parse(localStorage.getItem("lista") || "[]");
  const [lista, setLista] = useState<Item[]>(storedItems);
  useEffect(() => {});
  const saveToLocalStorage = (newLista: Item[]) => {
    localStorage.setItem("lista", JSON.stringify(newLista));
  };

  const handlePrice = (id: number, value: number) => {
    const novaLista = [...lista];
    const index = novaLista.findIndex((item) => item.id === id);
    if (index !== -1) {
      novaLista[index].price = value;
      setLista(novaLista);
      saveToLocalStorage(novaLista);
    }
  };

  const handleQuantity = (id: number, value: number) => {
    const novaLista = [...lista];
    const index = novaLista.findIndex((item) => item.id === id);
    if (index !== -1) {
      novaLista[index].quantity = value;
      setLista(novaLista);
      saveToLocalStorage(novaLista);
    }
  };

  const handleDelete = (id: number) => {
    const novaLista = lista.filter((item) => item.id !== id);
    setLista(novaLista);
    saveToLocalStorage(novaLista);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const total = lista.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const nome = data.itemBuy.trim();
    if (!nome) {
      return alert("Inserir um item valido");
    }
    const novoItem: Item = {
      id: Date.now(),
      item: nome,
      price: 0,
      quantity: 1,
    };

    const novaLista = [...lista, novoItem];
    setLista(novaLista);
    saveToLocalStorage(novaLista);

    reset();
  };

  return (
    <div className="min-h-screen p-6">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold  ">Lista de Compras</h1>
        <div className="flex gap-2">
          <form onSubmit={handleSubmit(onSubmit)} className="flex w-full">
            <Input placeholder="Adicionar item..." {...register("itemBuy")} />
            <Button variant="outline">Adicionar</Button>
          </form>
        </div>
        <div className="space-y-2">
          {lista.map((i) => (
            <CardGeral
              key={i.id}
              data={i}
              onPriceChange={(value) => handlePrice(i.id, value)}
              onQuantityChange={(value) => handleQuantity(i.id, value)}
              onDelete={(value) => handleDelete(i.id)}
            />
          ))}
        </div>
        <div>Total R$: {total.toFixed(2)}</div>
      </div>
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
